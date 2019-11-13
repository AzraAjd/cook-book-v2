const mongojs = require('mongojs')
const db = mongojs('localhost:27017/CookBook', ['recipes', 'special-categories'])

module.exports.categoriesGetList = function(req, res) {
    console.log("GET categories list")

    db.categories.find({}, {"categoryName" : true, "_id" : false}, function(err, docs) {
        res 
         .status(200)
         .json(docs);
    });  

}