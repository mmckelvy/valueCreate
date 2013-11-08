// Include mongoose.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Create the user schema.
var companySchema = new Schema ({
	companyName: String,
	targetReturns: Number,
	exitMultiple: Number,
	baseRev: Number,
	cagr: Number,
	margin: Number,
	depAmort: Number,
	capEx: Number,
	nwcDays: Number,
	debt: Number,
	interestRate: Number,
	taxRate: Number
});
// Create the User model with the user schema.
var Company = mongoose.model('Company', companySchema);
module.exports = Company;
 