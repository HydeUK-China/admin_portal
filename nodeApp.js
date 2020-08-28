const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const session = require('express-session')
const multer = require('multer')
const errorHandler = require('errorhandler')
const bodyParser = require('body-parser');
const pino = require('express-pino-logger');
const port = process.env.PORT || 3001;

const mysql = require('mysql')

const apiHandler = require('./server/apiHandler');
const dbConfig = require('./server/dbConfig');



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

// use: match url starts with specified path
// "/" match "/api", "/api/get", ...
app.use('/', apiHandler)

if (process.env.NODE_ENV === 'production') {
    console.log('======Production======')
    console.log(`serving static file from: ${__dirname}/build`)
    
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'build')));
    // therefor in prod mode, nodejs handle unrecognized (default) GET HTTP requests
    // as React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });

    app.set('connection', mysql.createConnection(dbConfig['prod']))
  }

if (process.env.NODE_ENV == 'development') {
    console.log('======Development======')
    console.log('read from .env: RDS_HOSTNAME = ', process.env.RDS_HOSTNAME);
    app.use(errorHandler())

    // serve no static files
    // therefore in dev mode, nodejs can only respond to recognized api

    app.set('connection', mysql.createConnection(dbConfig['dev']))
}

app.listen(port, () => console.log(`Listening on port ${port}`));