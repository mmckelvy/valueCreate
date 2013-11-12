var mongoose = require('mongoose');

var map = function (items, f) {
	var output = [];
	for(var i = 0, len = items.length; i < len; i++) {
		output.push(f(items[i]));
	}
	
	return output;
};

var getValues = function (obj, key) {
	return obj[key];
};

exports.map = map;
exports.getValues = getValues;