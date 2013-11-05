var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Create the user schema.
var companySchema = new Schema ({
	name: String,
	yr0rev: Number,
	revcagr: Number,
	ebitdaPct: Number,
	taxRate: Number,
	dNaPct: Number,
	capexPct: Number,
	wcDays: Number

});
// Create the User model with the user schema.
var Company = mongoose.model('Company', companySchema);
module.exports = Company;
 