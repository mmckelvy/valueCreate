var mongoose = require('mongoose');

// Calls a function on each item in an array.
var map = function (items, f) {
	var output = [];
	for(var i = 0, len = items.length; i < len; i++) {
		output.push(f(items[i]));
	}
	
	return output;
};

// Checks incoming data to ensure it is complete and capable of being parsed to floats.
var cleanData = function (data) {
	var errorMsg = "error";

	// Check to make sure form submission is complete.
	for (var key in data) {
		if ( typeof data[key] === "undefined" )
			return errorMsg;
	}
	// Exclude non-numerical keys from the parseFloat checking.
	var excludedKeys = {
		companyName: 0
	};

	// Check to make sure values can be parsed to floats.  If they can't, return an error message.  If they can, parse to floats.
	for (var key in data) {
		if ( !(key in excludedKeys) && isNaN(parseFloat(data[key])) ) {
			return errorMsg;
		}
		else if ( !(key in excludedKeys) ) {
			data[key] = parseFloat(data[key])
			return data;
		}
	}
};

exports.map = map;
exports.cleanData = cleanData;
