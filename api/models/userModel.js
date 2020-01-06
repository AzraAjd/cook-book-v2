'use strict'
var mongoose = require ('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    username: {
        type: String,
        required: 'Enter a username',
        unique: true,
        //required: 'A username is required'
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: 'Enter your email address',
        unique: true,
        //required: 'An email is required'
    },
    password: {
        type: String,
        required: 'Enter password'
        //required: 'Enter a new password'
    },
    bio: {
        type: String,
    },
    birthDate: {
        type: String
    }
},
{collection : 'users'} 
);

module.exports = mongoose.model('User', UserSchema);