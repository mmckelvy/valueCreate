// var indexController = require('../controllers/index');
var mongoose = require('mongoose');
var Company = require('../database/companies');
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
		// Convert object string values to floats if not in 'excludedKeys' object.
		for (var key in newCoData) {
			if (!(key in excludedKeys)) {
				console.log('true');
				newCoData[key] = parseFloat(newCoData[key]);
			}
		}
		console.log(newCoData);
		var newCompany = new Company (newCoData);
		newCompany.save();

		// ultimately going to send back a page with the valuation.
		res.send('Received');
	});
	//Route 3
}; 


