// Module dependencies.
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

// All environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Functionality
var Schema = mongoose.Schema;

// Create the user schema.
var userSchema = new Schema ({
	name: String,
	companies: [{
		revenue: Number,
		ebitda: Number,
		capex: Number,
		cnwc: Number
	}]
});

// Create a new user with the user schema.
var User = mongoose.model('User', userSchema);

var banker = new User ({
	name: 'Bob',
	companies: [{
		revenue: 100,
		ebitda: 50,
		capex: 5,
		cnwc: 2
	}]
});

banker.save();
console.log(User.find());

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
