'use strict';

var mongoose = require ('mongoose');
var User = require('../models/userModel');
var db = mongoose.connection;
var config = require('config');
var mongoDB = config.get('mongoURI');


mongoose.connect(mongoDB, {useNewUrlParser: true});
db.on('error', console.error.bind(console, 'MongoDB connection error'));




