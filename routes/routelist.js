var utilities = require('../utilities/utility');
var mongoose = require('mongoose');
var Company = require('../database/companies');

//Define routes.
module.exports = function (app) {
	// Render the home page.
	app.get('/', function (req, res) {
		res.render('index');
	});
	
	app.post('/newcompany', function (req, res) {
		var newCoData = req.body;
		if ( utilities.cleanData(newCoData) === "There was an error, please try again" ) {
			res.send(utilities.cleanData(newCoData));
		}
		else {
			// Create a new model instance with the data.
			var newCompany = new Company (utilities.cleanData(newCoData));
			// Create a new object with results of object method calls.
			var newCoResults = newCompany.getResults();
			newCompany.save();
			// Send results back to the client.
			res.send(newCoResults);
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




