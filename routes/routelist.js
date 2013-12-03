var utilities = require('../utilities/utility');
var mongoose = require('mongoose');
var Company = require('../database/companies');

//Define routes.
module.exports = function (app) {
	
	// Render the home page.
	app.get('/', function (req, res) {
		res.render('index');
	});
	
	// Get new company input from user, check for errors, create a new Mongoose model with the data, perform calculations, send results back to client.
	app.post('/newcompany', function (req, res) {
		var newCoData = req.body;
		console.log(newCoData);
		console.log(utilities.cleanData(newCoData));
		if ( utilities.cleanData(newCoData) === "error" ) {
			res.send(utilities.cleanData(newCoData));
		}
		else {
			var newCompany = new Company (utilities.cleanData(newCoData));
			newCompany.save(function (err) {
				console.log(err);
				if (err) {
					res.send(err);
				}
				else {
					var newCoResults = newCompany.getResults();
					res.send(newCoResults);
				}
			});
		}
	});
	
	// Send client a list of all existing companies.
	app.get('/existingcompany', function (req, res) {
		// Get all the items in the database, send back to client
		Company.find({}, function (err, companies) {
			if (err) {res.send('there was an error')}
			var namesList = utilities.map(companies, function (obj) {
				return obj.companyName;
			});
			
			res.send(namesList);
		});
	});

	// Query database for existing name, calculate valuations for that company, send result back to client.
	app.get('/findexisting', function (req, res) {
		var criteria = req.query.queryItem;

		Company.findOne({companyName: criteria}, function (err, queriedCompany) {
			if (err) {res.send('there was an error')}
			// Calculate the valuation and package results in an object for transmission to client.
			var queryCoResults = queriedCompany.getResults();
			
			res.send(queryCoResults);
		});
	});
}; 




