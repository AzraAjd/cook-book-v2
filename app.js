var express = require('express');
var app = express();
var path = require('path');
var routes = require('./api/routes');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connection;


mongoose.connect("localhost:27017/CookBook", {useNewUrlParser: true});
db.on('error', console.error.bind(console, 'MongoDB connection error'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', routes); 

app.listen(8080, function() {
    console.log('listening on port 8080');
});
