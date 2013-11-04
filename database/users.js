var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Create the user schema.
var companySchema = new Schema ({
	name: String,
	yr1rev: Number,
	revgrowth: Number,
	ebitdaPct: Number,
	dNaPct: Number,
	capexPct: Number,
	cnwcPct: Number

});
// Create the User model with the user schema.
var User = mongoose.model('User', userSchema);
module.exports = User;
 