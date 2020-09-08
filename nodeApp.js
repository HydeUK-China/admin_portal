const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const session = require('express-session')
const multer = require('multer')
const errorHandler = require('errorhandler')
const bodyParser = require('body-parser');
const pino = require('express-pino-logger');

const mysql = require('mysql');
const async = require('async');

const apiHandler = require('./server/apiHandler');
const dbConfig = require('./server/dbConfig');

const port = process.env.PORT || 5001;
const __env__ = process.env.NODE_ENV;

// multipart/form-data , which is primarily used for uploading files
const upload = multer({ dest: './uploads/' })
// enable bodyParser to parse content type of application/json,
// otherwise req.body is {}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// HTTP request logger
app.use(pino());
app.use(methodOverride());
// every user of your API or website will be assigned a unique session,
// allows you to store the user state
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'uwotm8'
}));
// Pug (a template engines) replace variables in our file with actual values, 
// and then send the resulting HTML string to the client.
app.set('view engine', 'pug');

function init() {
  // use: match url starts with specified path
  // "/" match "/api", "/api/get", ...
  app.use('/', apiHandler)
  app.listen(port, () => console.log(`Listening on port ${port}`));
  
  if (__env__ === 'prod') {
    console.log('====== Production ======')
    console.log(`serving static file from: ${__dirname}/build`)
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'build')));
    
    // therefore in prod mode, nodejs handle unrecognized (default) GET HTTP requests
    // as React routing, return all requests to React app
    // therefore in dev mode, nodejs can only respond to recognized api
    app.get('*', function (req, res) {
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });

  } else if(__env__ === 'dev'){
    console.log('====== Development ======')
    console.log('read from .env: RDS_DB_NAME = ', process.env.RDS_DB_NAME);

    app.use(errorHandler())
  }
}

app.set('connection', mysql.createConnection(dbConfig[__env__]))
const client = app.get('connection');

async.series([
  function connect(callback) {
    client.connect(callback);
  },
  function use_db(callback) {
    client.query(`USE ${dbConfig.db}`, callback);
  },
], (err, results) => {
  if (err) {
    console.log('Exception connecting database.');
    throw err;
  } else {
    console.log('Database initialization complete.');
    init();
  }
});