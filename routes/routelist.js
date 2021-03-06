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
	
	// Receive user registration information and authenticate user input.
	app.post('/register', function (req, res) {
		var newUserInfo = req.body;
		// Create a new mongoose User model with the user input.
		var newUser = new User (newUserInfo);
		// Ensure username and password is in the acceptable format.
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

	// Receive login credentials from client.  Check to ensure user / password exist / are correct and establish a session if so.
	app.post('/login', function (req, res) {
		var existingUserInfo = req.body;
		var existingUser = new User (existingUserInfo);
		// Ensure username and password is in the acceptable format.
		if ( !(existingUser.checkUsername()) ) {
			res.send('Your username is in an unacceptable format. Please click "login" and try again.');
		}
		else if ( !(existingUser.checkPassword()) ) {
			res.send('Your password is in an unacceptable format. Please click "login" and try again.');
		}
		// Query the database for the user.  Process the results.
		else {
			User.findOne({ username: existingUser.username, password: existingUser.password }, function (err, existingUser) {
				if (err || existingUser === null) {res.send('Username and/or password not found.  Click login and try again.')}
				// Establish a session with the existing user.
				else {
					req.session.username = existingUser.username;
					req.session.password = existingUser.password;
					res.send(existingUser);
				}
			});
		}
	});

	// Ensure user is logged in.
	app.get('/checkuser', function (req, res) {
		if (req.session.username === null || req.session.username === '' || typeof req.session.username === 'undefined') {
			res.send(false);
		}
		else {
			res.send(true);
		}
	});

	// Get new company input from user, check for errors, create a new Mongoose model with the data, perform calculations, send results back to client.
	app.post('/newcompany', function (req, res) {
		var newCoData = req.body;
		newCoData.username = req.session.username;
		// Perform validation.
		if ( utilities.cleanData(newCoData) === "error" ) {
			res.send(utilities.cleanData(newCoData));
		}
		else {
			var newCompany = new Company (utilities.cleanData(newCoData));
			newCompany.save(function (err) {
				if (err) {
					res.send(err);
				}
				// Calculate results.
				else {
					var newCoResults = newCompany.getResults();
					res.send(newCoResults);
				}
			});
		}
	});
	
	// Receive company edit request from client.  Send all company information back to client.
	app.get('/editcompany', function (req, res) {
		var userMatch = req.session.username;
		var editCompany = req.query.queryItem;
		Company.findOne({ username: userMatch, companyName: editCompany}, function (err, editCompany) {
			if (err) {res.send('there was an error')}

			res.send(editCompany);
		});
	});

	// Update existing company information and re-run valuation.
	app.post ('/updatecompany', function (req, res) {
		var updateData = req.body;
		console.log(updateData);
		updateData.username = req.session.username;
		// Perform validation.
		if ( utilities.cleanData(updateData) === "error" ) {
			res.send(utilities.cleanData(updateData));
		}
		else {
			cleanUpdateData = utilities.cleanData(updateData);
			// Find requested company in database.
			Company.findOne({ username: cleanUpdateData.username, companyName: cleanUpdateData.companyName}, function (err, updateCompany) {
				if (err) {res.send('there was an error')}
				// Update the company properties.
				updateCompany.targetReturns = cleanUpdateData.targetReturns;
				updateCompany.exitMultiple = cleanUpdateData.exitMultiple;
				updateCompany.baseRev = cleanUpdateData.baseRev;
				updateCompany.cagr = cleanUpdateData.cagr;
				updateCompany.margin = cleanUpdateData.margin;
				updateCompany.depAmort = cleanUpdateData.depAmort;
				updateCompany.capEx = cleanUpdateData.capEx;
				updateCompany.nwcDays = cleanUpdateData.nwcDays;
				updateCompany.debt = cleanUpdateData.debt;
				updateCompany.interestRate = cleanUpdateData.interestRate;
				updateCompany.taxRate = cleanUpdateData.taxRate;
				// Save the update.
				updateCompany.save(function (err) {
					if (err) {
						res.send(err);
					}
					// Calculate valuation results and send back to the client.
					else {
						var updateResults = updateCompany.getResults();
						res.send(updateResults);
					}
				});
			});
		}
	});

	// Receive delete request from client.  Delete company.
	app.get('/deletecompany', function (req, res) {
		var userMatch = req.session.username;
		var deleteCompany = req.query.queryItem;
		Company.findOne({ username: userMatch, companyName: deleteCompany}, function (err, toDeleteCo) {
			if (err) {res.send('there was an error')}
			toDeleteCo.remove();
			var confirmMsg = {
				deleted: deleteCompany,
				message: 'successfully deleted.'
			};
			res.send(confirmMsg);
		});
	});

	// Send client a list of all existing companies.
	app.get('/existingcompany', function (req, res) {
		// Get all the companies that match the given username, send the list of companies back to the client.
		var userMatch = req.session.username;
		Company.find({ username: userMatch }, function (err, companies) {
			if (err) {res.send('there was an error')}
			var namesList = utilities.map(companies, function (obj) {
				return obj.companyName;
			});
			
			res.send(namesList);
		});
	});

	// Query database for existing name, calculate valuations for that company, send result back to client.
	app.get('/findexisting', function (req, res) {
		var companyCriteria = req.query.queryItem;
		var userCriteria = req.session.username;

		Company.findOne({companyName: companyCriteria, username: userCriteria}, function (err, queriedCompany) {
			if (err) {res.send('there was an error')}
			// Calculate the valuation and package results in an object for transmission to client.
			var queryCoResults = queriedCompany.getResults();
			
			res.send(queryCoResults);
		});
	});
}; 




