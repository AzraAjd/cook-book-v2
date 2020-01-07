var express = require('express');
var app = express();
var path = require('path');
var routes = require('./api/routes');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connection;

/*const { google } = require('googleapis');
const oauth2Client = new google.auth.Oauth2(
    process.env.CLIENT_ID || webkitConvertPointFromPageToNode.CLIENT_ID,
    process.env.CLIENT_SECRET || webkitConvertPointFromPageToNode.CLIENT_SECRET,
    process.env,REDIRECT_URL || webkitConvertPointFromPageToNode.REDIRECT_URL
);*/


mongoose.connect("localhost:27017/CookBook", {useNewUrlParser: true});
db.on('error', console.error.bind(console, 'MongoDB connection error'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', routes); 

app.set('views', __dirname + '/views');

app.listen(8080, function() {
    console.log('listening on port 8080');
});
