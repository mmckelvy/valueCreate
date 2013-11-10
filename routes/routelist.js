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
		var newCoResults = {
			freeCashFlow: newCompany.freeCashFlowCalc().cumFcf,
			tev: newCompany.valueCalc().tev,
			endEquity: newCompany.valueCalc().endEquity,
			begEquity: newCompany.valueCalc().begEquity,
			ebitdaSourceReturns: newCompany.ebitdaSourceReturns(),
			multipleSourceReturns: newCompany.multipleSourceReturns()		
		};
		newCompany.save();
		// Send results back to the client.
		res.send(newCoResults);
	});
	//Route 3
}; 


