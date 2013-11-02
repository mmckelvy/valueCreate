// var indexController = require('../controllers/index');
var mongoose = require('mongoose');
var User = require('../database/users');
// var Schema = mongoose.Schema;
//Define routes.
module.exports = function (app) {
	//Route 1
	app.get('/', function (req, res) {
		res.render('index');
	});
	//Route 2
	app.post('/receive', function (req, res) {
		var inputData = req.body.tester;
		console.log(inputData);
		var banker = new User({name: inputData});
		banker.save(res.send('Success'));
	});
	//Route 3
}; 
