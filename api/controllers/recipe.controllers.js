'use strict';

var mongoose = require ('mongoose');
var Recipe = require('../models/recipeModel');
var config = require('config');
var mongoDB = config.get('mongoURI');
const auth = require('../../middleware/auth');

var db = mongoose.connection;

mongoose.connect(mongoDB, {useNewUrlParser: true});
db.on('error', console.error.bind(console, 'MongoDB connection error'));

module.exports.recipesGetAll = function (req, res) {
    console.log("GET all recipes")

    Recipe.find({}, function (err, recipe) {
        if (err)
            res.send(err);
        res.json(recipe);
    });
};

module.exports.recipesGetOne = function (req, res) {
    console.log("GET one recipe")
    Recipe.findById(req.params.recipeId, function (err, recipe) {
        if (err)
            res.send(err);
        res.json(recipe);
    });
};

module.exports.recipesCreate = function (req, res) {
    console.log("CREATE a new recipe")

    var new_recipe = new Recipe(req.body);
    console.log(req.body);
    new_recipe.save( function (err, recipe) {
        if (err)
            res.send(err);
        res.json(recipe);
    });
};

module.exports.recipesUpdateOne = function (req, res) {
    Recipe.findOneAndUpdate({_id: req.params.recipeId}, req.body, {new: true}, function (err, recipe) {
        if (err)
            res.send(err);
            res.json(recipe);
    });
};

module.exports.recipesDeleteOne = function (req, res) {
    Recipe.remove ({_id: req.params.recipeId}, function (err, recipe) {
        if (err)
            res.send(err);
        res.json({message: 'Recipe deleted'});
    });
};

