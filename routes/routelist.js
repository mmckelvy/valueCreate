// var indexController = require('../controllers/index');
var mongoose = require('mongoose');
var User = require('../database/companies');
//Define routes.
module.exports = function (app) {
	// Render the home page.
	app.get('/', function (req, res) {
		res.render('index');
	});
	// Receive the new company form data.
	app.post('/newcompany', function (req, res) {
		// List of keys with non-numerical values.
		var excludedKeys = {
			companyName: 0
		};		
		var newCoData = req.body;
		// Convert object values to floats if not in 'excludedKeys' object.
		for (var key in newCoData) {
			if (!(key in excludedKeys)) {
				console.log('true');
				newCoData[key] = parseFloat(newCoData[key]);
			}
		}
		
		res.send('Received');
	});
	//Route 3
}; 


