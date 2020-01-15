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
    const { name, email, password } = req.body;

  // Simple validation
  if(!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  User.findOne({ email })
    .then(user => {
      if(user) return res.status(400).json({ msg: 'User already exists' });

      const newUser = new User({
        name,
        email,
        password
      });

      // Create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {
              jwt.sign(
                { id: user.id },
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                  if(err) throw err;
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      name: user.name,
                      email: user.email
                    }
                  });
                }
              )
            });
        })
      })
    })
}
    

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
    });
}

/*  @route GET /user
    @desc Auth user
    @access Public
*/
module.exports.userAuth = function(req, res) {
    User.findById(req.user.id)
    .select('-password')
    .then( user => res.json(user));
} 


