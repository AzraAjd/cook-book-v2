var express = require('express');
var app = express();
var path = require('path');
var routes = require('./api/routes');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);


app.listen(8080, function() {
    console.log('listening on port 8080');
});
