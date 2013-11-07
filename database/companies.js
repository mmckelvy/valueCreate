// Include mongoose.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Create the user schema.
var companySchema = new Schema ({
	name: String,
	tgtReturn: Number,
	baseRev: Number,
	revCagr: Number,
	ebitdaPct: Number,
	dNaPct: Number,
	capexPct: Number,
	wcDays: Number,
	debt: Number,
	intRate: Number,
	exitMultiple: Number,
	taxRate: Number
});
// Create the User model with the user schema.
var Company = mongoose.model('Company', companySchema);
module.exports = Company;
 