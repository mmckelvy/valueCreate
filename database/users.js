// Create the user schema.
var userSchema = new Schema ({
	name: String,
	companies: [{
		revenue: Number,
		ebitda: Number,
		capex: Number,
		cnwc: Number
	}]
});
// Create the User model with the user schema.
var User = mongoose.model('User', userSchema);
//Need to get input from the user to crate the new 