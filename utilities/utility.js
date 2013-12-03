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
	var excludedKeys = {
		companyName: 0
	};

	for (var key in data) {
		// Check to make sure form submission is complete.
		if ( typeof data[key] === "undefined" || data[key] === null || data[key] === "") {
			return errorMsg;
		}
		// Check to make sure values can be parsed to floats.
		else if ( !(key in excludedKeys) && isNaN(parseFloat(data[key])) ) {
			return errorMsg;
		}
		// Parse to floats.
		else if ( !(key in excludedKeys) ) {
			data[key] = parseFloat(data[key])
		}
	}
	return data;
};

exports.map = map;
exports.cleanData = cleanData;
