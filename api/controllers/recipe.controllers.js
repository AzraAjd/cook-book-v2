const mongojs = require('mongojs')
const db = mongojs('localhost:27017/CookBook', ['recipes', 'special-categories'])

module.exports.recipesGetAll = function(req, res) {
    console.log("GET the recipes")

    db.recipes.find(function(err, docs) {
        res 
         .status(200)
         .json(docs);
    });  
};

module.exports.recipesGetOne = function(req, res) {
    console.log("GET one recipe")

    db.recipes.findOne( {
    _id: mongojs.ObjectId(req.params.recipeId)}, function (err, doc) {
        res.json(doc);
    });
    
};
