// connect to database
var mongo = require('./config/mongo.js');

// include Express js
var express = require('express');
var app = module.exports = express();

// include body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// include cors
var cors = require ('cors');
app.use(cors());

