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
	//Route 3
}; 


