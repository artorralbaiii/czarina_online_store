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


// **Connect to MongoDB**
mongoose.connect(config.db_uri, function(err){
	if(err){
		console.log(err);
		return;
	} else {
		console.log('Connected to Database');
	}
});
// **Connect to MongoDB**

var app = express();

app.use(bodyParser.urlencoded({extended: false, keepExtensions: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

var api = require('./app/routes/api.js')(app, express);
app.use('/api',api);

app.get('*', function(req, res){
	res.sendFile(__dirname + '/public/app/views/index.html');
});

app.set('port', (process.env.PORT || config.port || 5000));

app.listen(app.get('port'), function(){
	console.log('Server is starting on ' + app.get('port'));
});