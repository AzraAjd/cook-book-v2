const mongojs = require('mongojs')
const db = mongojs('localhost:27017/CookBook', ['recipes', 'special-categories'])

module.exports.recipesGetAll = function(req, res) {
    console.log("GET all recipes")

    db.recipes.find(function(err, docs) {
        if (err)
                res.send(err);
        res 
         .status(200)
         .json(docs);
    });  
};

module.exports.recipesGetOne = function(req, res) {
    console.log("GET one recipe")

    db.recipes.findOne( {
        _id: mongojs.ObjectId(req.params.recipeId)}, function (err, doc) {
            if (err)
                res.send(err);
            res.json(doc);
    });
};

module.exports.recipesInsert = function(req, res) {
    console.log("INSERT a recipe")

    db.recipes.insertOne( req.body, function(err, docs) {
        if (err) 
            res.send(err);
        res.json(docs);
    });
}

module.exports.recipesDeleteOne = function(req, res) {
    console.log("DELETE a recipe")

    db.recipes.remove( {
        _id : req.params.recipeId}, function(err, docs) {
            if (err)
                res.send(err);
            res.json({message: "recipe deleted"});
        })
}

module.exports.recipesUpdateOne = function(req, res) {
    console.log("UPDATE a recipe")

    db.recipes.findOneAndUpdate( {
        _id : req.params.recipeId}, req.body, {returnOriginal : false}, function(err, docs) {
            if (err)
                res.send(err);
            res.json(docs);
        });
}