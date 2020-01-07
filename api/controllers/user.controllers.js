'use strict';

var mongoose = require ('mongoose');
var User = require('../models/userModel');
var mongoDB = 'mongodb://localhost:27017/CookBook';
var db = mongoose.connection;
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

mongoose.connect(mongoDB, {useNewUrlParser: true});
db.on('error', console.error.bind(console, 'MongoDB connection error'));

module.exports.register = function(req, res) {
    console.log('registering user');

    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var birthDate = req.body.birthDate;
    var bio = req.body.bio;
    /*var password2 = req.body.password2;*/

    [
        check('name').isLength({min:1}).trim().withMessage('Name required'),
        check('email').isLength({min:1}).trim().withMessage('Email required'),
        check('email').isEmail().trim().withMessage('Email is not valid'),
        check('password').isLength({min:1}).withMessage('Password required'),
        /*check('password').custom((value,{req, loc, path}) => {
          if (value !== req.body.password2) {
              // throw error if passwords do not match
              throw new Error("Passwords do not match");
          } else {
              return value;
          }
      })*/
    ];
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
    } else {
        var newUser = new User(req.body);
        console.log(req.body);
        
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, function(err, hash) {
                    if (err) {
                        console.log(err);
                    }
                    newUser.password = hash;
                    newUser.save(function (err, user) {
                        if (err)
                            res.send(err);
                        res.json(user);
                })
            })
    });
    }
    
};

module.exports.login = function(req, res) {

};

