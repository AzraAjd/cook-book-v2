'use strict';

var mongoose = require ('mongoose');
var User = require('../models/userModel');
var db = mongoose.connection;
var config = require('config');
var mongoDB = config.get('mongoURI');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth')

mongoose.connect(mongoDB, {useNewUrlParser: true});
db.on('error', console.error.bind(console, 'MongoDB connection error'));

/*  @route POST /register
    @desc Register user
    @access Public
*/
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
                newUser.save()
                    .then( user => {

                    jwt.sign(
                        { id: user._id },
                        config.get('jwtSecret'),
                        { expiresIn : 3600},
                        (err, token) => {
                            if (err) throw err;
                            res.json({ token, user });
                        }    
                    )                    
                    })
            })
        });
    }
    
};


/*  @route POST /login
    @desc Authenticate user
    @access Public
*/
module.exports.login = function(req, res) {
    const { email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all the fields' });
    }

    //check if the email exists
    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'User does not exist'});

            //validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'Invalid credidentials' });

                    jwt.sign(
                        { id: User._id },
                        config.get('jwtSecret'),
                        { expiresIn : 3600},
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user
                            });
                        }    
                    )
                })
        })
};

/*  @route GET /user
    @desc Auth user
    @access Public
*/
module.exports.userAuth = function(req, res) {
    User.findById(req.user.id)
    .select('-password')
    .then( user => res.json(user));
    
}

