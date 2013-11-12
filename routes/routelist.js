var utilities = require('../utilities/utility');
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
				newCoData[key] = parseFloat(newCoData[key]);
			}
		}
		// Create a new model instance with the data.
		var newCompany = new Company (newCoData);
		// Create a new object with results of object method calls.
		var valueResult = newCompany.valueCalc();
		var newCoResults = {
			freeCashFlow: Math.round(newCompany.freeCashFlowCalc().cumFcf * 10) / 10,
			tev: Math.round(valueResult.tev * 10) / 10,
			endEquity: Math.round(valueResult.endEquity * 10) / 10,
			begEquity: Math.round(valueResult.begEquity * 10) / 10,
			ebitdaSourceReturns: Math.round(newCompany.ebitdaSourceReturns() * 10) / 10,
			multipleSourceReturns: Math.round(newCompany.multipleSourceReturns() * 10) / 10		
		};
		newCompany.save();
		// Send results back to the client.
		res.send(newCoResults);
	});
	// Send client a list of all existing companies.
	app.get('/existingcompany', function (req, res) {
		// Get all the items in the database, send back to client
		Company.find({}, function (err, companies) {
			if (err) {console.log('there was an error')}
			var namesList = utilities.map(companies, function (obj) {
				return obj.companyName;
			});
			
			res.send(namesList);
		});
	});

	// Query database for existing name, calculate valuations for that company, send result back to client.
	app.get('/findexisting', function (req, res) {
		var criteria = req.query.queryItem;
		console.log(criteria);

		Company.findOne({companyName: criteria}, function (err, queriedCompany) {
			if (err) {console.log('there was an error')}
			// Calculate the valuation and package results in an object for transmission to client.
			var valueResult = queriedCompany.valueCalc();
			var queryCoResults = {
				freeCashFlow: Math.round(queriedCompany.freeCashFlowCalc().cumFcf * 10) / 10,
				tev: Math.round(valueResult.tev * 10) / 10,
				endEquity: Math.round(valueResult.endEquity * 10) / 10,
				begEquity: Math.round(valueResult.begEquity * 10) / 10,
				ebitdaSourceReturns: Math.round(queriedCompany.ebitdaSourceReturns() * 10) / 10,
				multipleSourceReturns: Math.round(queriedCompany.multipleSourceReturns() * 10) / 10		
			};
			
			res.send(queryCoResults);
		});
	});
}; 


