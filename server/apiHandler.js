const express = require('express');
const router = express.Router();

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
const fakeData = require('./fakeData');
const expertData = fakeData.expertData;
const projectData = fakeData.projectData;
const assessData = fakeData.assessData;

router.post('/api/fetchExpert', (req, res) => {
    res.status(200).json({
        success: true,
        data: expertData
    });
});

router.post('/api/fetchProject', (req, res) => {
    res.status(200).json({
        success: true,
        data: projectData
    });
});

router.post('/api/fetchAssessment', (req, res) => {
    res.status(200).json({
        success: true,
        data: assessData
    });
});

module.exports = router;