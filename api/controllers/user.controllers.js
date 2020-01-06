'use strict';

var mongoose = require ('mongoose');
var User = require('../models/userModel');
var mongoDB = 'mongodb://localhost:27017/CookBook';

var db = mongoose.connection;

mongoose.connect(mongoDB, {useNewUrlParser: true});
db.on('error', console.error.bind(console, 'MongoDB connection error'));

module.exports.register = function(req, res) {
    console.log('registering user');

    var username = req.body.username;
    

};

module.exports.login = function(req, res) {

};

