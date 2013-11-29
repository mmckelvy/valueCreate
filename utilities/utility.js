var mongoose = require('mongoose');

var map = function (items, f) {
	var output = [];
	for(var i = 0, len = items.length; i < len; i++) {
		output.push(f(items[i]));
	}
	
	return output;
};

var cleanData = function (data) {
	var errorMsg = "There was an error, please try again";

	// Check to make sure form submission is complete.
	for (var key in data) {
		if ( typeof data[key] === "undefined" )
			return errorMsg;
	}
	// Remove non-numerical keys from the parseFloat checking.
	var excludedKeys = {
		companyName: 0
	};

	for (var key in data) {
		// Check to make sure values can be processes to floats.
		if ( !(key in excludedKeys) && isNaN(parseFloat(data[key])) ) {
			return errorMsg;
		}
		else if ( !(key in excludedKeys) {
			data[key] = parseFloat(data[key])
			return data;
		}
	}
};

var rangeValidate = function (min, max, value) {
	if (value < min || value > max) {
		return false;
	}
	else {
		return true;
	}
};

var objValidate = function (criteriaObj, evalObj) {
	for (var key in evalObj) {
		if ( !(rangeValidate(crieriaObj[key].min, criteriaObj[key].max, evalObj[key])) ) {
			return false;
		}
	}
	return true;
};



exports.map = map;
exports.basicValidate = basicValidate;
exports.rangeValidate = rangeValidate;
exports.objValidate = objValidate;
