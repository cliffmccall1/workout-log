const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Connecting to DB on mlab
mongoose
  .connect(
    'mongodb://cliff:cliff1@ds131551.mlab.com:31551/final-project',
    { useNewUrlParser: true }
  ) // successful
  .then(() => {
    console.log('Connected to database!');
  })
  // catch errors
  .catch(() => {
    console.log('Connection failed!');
  });

// Parsing json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // no matter which domain its able to access resources
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization' // incoming request may have these headers
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS, HEAD' // Methods allowed
  );
  next();
});

// importing routes
const logsRoutes = require('./routes/logs');
const userRoutes = require('./routes/user');
const benchmarksRoutes = require('./routes/benchmarks');
const profilesRoutes = require('./routes/profiles');

// Path
app.use('/api/logs', logsRoutes);
app.use('/api/user', userRoutes);
app.use('/api/benchmarks', benchmarksRoutes);
app.use('/api/profiles', profilesRoutes);
// ng build for backend
app.use('/', express.static(path.join(__dirname, 'angular')));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'angular', 'index.html'));
});

module.exports = app;
