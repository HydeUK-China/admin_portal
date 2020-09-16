const express = require('express');
const router = express.Router();
const dbOps = require('./dbOps');
const s3Ops = require('./s3Ops');

router.get('/', function (req, res, next) {
    if (req.session.views) {
        req.session.views++
        console.log(req.session.id, req.session.cookie)
        res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: ' + req.session.views + '</p>')
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
        res.end()
      } else {
        req.session.views = 1
        res.end('welcome to the session demo. refresh!')
      }
});

router.get('/api/get', (req, res) => {
    const name = req.query.name;
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ get: `Sent via GET: ${name}` }));
});

router.post('/api/post', (req, res) => {
    res.send(
        `Sent via POST request: ${req.body.post}`,
    );
});

// ======
router.post('/api/login', dbOps.login);

router.post('/api/expertDashboard', dbOps.expertDashboard);
router.post('/api/fetchExpert', dbOps.fetchExpert);
router.post('/api/fetchEmployer', dbOps.fetchEmployer);
router.post('/api/fetchProject', dbOps.fetchProject);
router.post('/api/fetchProjectMatching', dbOps.fetchProjectMatching);

router.post('/api/file/upload', s3Ops.uploadFile)
router.get('/api/file/:filename', s3Ops.downloadFile)

module.exports = router;