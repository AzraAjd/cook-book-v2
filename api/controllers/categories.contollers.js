const mongojs = require('mongojs')
const db = mongojs('localhost:27017/CookBook', ['recipes', 'categories'])

module.exports.categoriesGetList = function(req, res) {
    console.log("GET categories list")

    db.categories.find({}, {"categoryName" : true, "_id" : false}, function(err, docs) {
        res 
         .status(200)
         .json(docs);
    });  
}

module.exports.categoriesInsert = function(req, res) {
    console.log("INSERT a category")

    db.categories.insertOne( req.body, function(err, docs) {
        if (err) 
            res.send(err);
        res.json(docs);
    });
}

module.exports.categoriesDeleteOne = function(req, res) {
    console.log("DELETE a category")

    db.categories.remove( {
        _id : req.params.categoryId}, function(err, docs) {
            if (err)
                res.send(err);
            res.json({message: "recipe deleted"});
        })
}

module.exports.categoriesUpdateOne = function(req, res) {
    console.log("UPDATE a category")

    db.categories.findOneAndUpdate( {
        _id : req.params.categoryId}, req.body, {returnOriginal : false}, function(err, docs) {
            if (err)
                res.send(err);
            res.json(docs);
        });
}

module.exports.singleCategory = function(req, res) {
    console.log("GET list of all recipes in one category")

    db.recipes.find({}, {"category._id" : req.params.categoryId, "name" : true, "_id" : false}, function(err, docs) {
        res 
         .status(200)
         .json(docs);
    });  
}

