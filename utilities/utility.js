var mongoose = require('mongoose');

var map = function (items, f) {
	var output = [];
	for(var i = 0, len = items.length; i < len; i++) {
		output.push(f(items[i]));
	}
	
	return output;
};

var basicValidate = function (data) {
	for (var key in data) {
		if ( typeof data[key] === "undefined" || isNaN(parseFloat(data[key])) ) {
			return false;
		}
	}
	return true;
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
