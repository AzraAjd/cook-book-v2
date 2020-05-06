'use strict';

var mongoose = require ('mongoose');
var User = require('../models/userModel');
var db = mongoose.connection;
var config = require('config');
var mongoDB = config.get('mongoURI');


mongoose.connect(mongoDB, {useNewUrlParser: true});
db.on('error', console.error.bind(console, 'MongoDB connection error'));


/*  @route GET /users
    @desc list all users
    @access Private
*/
module.exports.usersGetAll = function (req, res) {
    console.log("GET all users")

    User.find({}, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

/*  @route GET /users/:userId
    @desc get one user
    @access Public
*/
module.exports.usersGetOne = function (req, res) {
    console.log("GET one user")
    User.findById(req.params.userId)
    .select('-password')
    .then( user => res.json(user));
};

/*  @route DELETE /users/:userId
    @desc delete a user
    @access Private
*/
module.exports.usersDeleteOne =  function (req, res) {
    User.remove ({_id: req.params.userId}, function (err, recipe) {
        if (err)
            res.send(err);
        res.json({message: 'User deleted'});
    });
}


