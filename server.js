// **Vendor Modules**
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var mongoStore = require('connect-mongo/es5')(session);
// **Vendor Modules**

// **Custom Modules**
var config = require('./config.js')
// **Custom Modules**
var app = express();

app.use(bodyParser.urlencoded({extended: false, keepExtensions: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

var api = require('./app/routes/api.js')(app, express);
app.use('/api',api);

app.get('*', function(req, res){
	res.sendFile(__dirname + '/public/app/views/index.html');
});

app.listen(config.port, '0.0.0.0', function(){
	console.log('Server is starting on ' + config.port);
})