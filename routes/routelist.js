var utilities = require('../utilities/utility');
var mongoose = require('mongoose');
// Require the database files.
var valCreateInfo = require('../database/valcreateinfo');
var Company = valCreateInfo.company;
var User = valCreateInfo.user;

//Define routes.
module.exports = function (app) {
	
	// Render the home page.
	app.get('/', function (req, res) {
		res.render('index');
	});
	
	// Receive user login information and authenticate user input.
	app.post('/register', function (req, res) {
		var newUserInfo = req.body;
		// Create a new mongoose User model with the user input.
		var newUser = new User (newUserInfo);
		// Ensure username is in the acceptable format.
		if ( !(newUser.checkUsername()) ) {
			res.send('Your username is in an unacceptable format. Please click "register" and try again.');
		}
		else if ( !(newUser.checkPassword()) ) {
			res.send('Your password is in an unacceptable format. Please click "register" and try again.');
		}
		else {
			// Establish a session with the current user.
			req.session.username = newUser.username;
			req.session.password = newUser.password;
			newUser.save();
			res.send(newUser);
		}
	});

	// Get new company input from user, check for errors, create a new Mongoose model with the data, perform calculations, send results back to client.
	app.post('/newcompany', function (req, res) {
		var newCoData = req.body;
		newCoData.username = req.session.username;
		if ( utilities.cleanData(newCoData) === "error" ) {
			res.send(utilities.cleanData(newCoData));
		}
		else {
			var newCompany = new Company (utilities.cleanData(newCoData));
			newCompany.save(function (err) {
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




