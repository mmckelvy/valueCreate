var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Create the user schema.
var userSchema = new Schema ({
	name: String,
});
// Create the User model with the user schema.
var User = mongoose.model('User', userSchema);
module.exports = User;
 