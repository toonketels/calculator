/**
 * Calculator.
 */
"use strict";

var _ = require('underscore');


var operators = {
	"*": function multiply(first, second) { return first * second },
	"/": function divide(first, second) { return first / second },
	"+": function add(first, second) { return first + second },
	"-": function subtract(first, second) { return first - second }
};


/**
 * Main entry point to calculate.
 *
 * Expects a an array with the calculation to perform.
 */
function calculate(toCalculate) {
	if (!isValid(toCalculate)) return false;


	var res;
	var first;
	var second;
	var shrink = [];
	var current;
	
	for (var i = 0, length = toCalculate.length; i < length; i++) {
		var current = toCalculate[i];
		
		if (_.isNumber(current)) { shrink.push(current); }

		if (isFirstOrderOperator(current)) {
			first = shrink.pop();
			second = toCalculate[i+1];
			res = operators[current](first, second);
			shrink.push(res);
			i++;
		}

		if (isSecondOrderOperator(current)) {
			shrink.push(res);
		}
	}

	// // toCalculate = shrink;

	// for (var i = 0, length = toCalculate.length; i < length; i++) {
	// 	var current = toCalculate[i];
		
	// 	if (_.isNumber(current)) { shrink.push(current); }

	// 	if (isFirstOrderOperator(current)) {
	// 		first = shrink.pop();
	// 		second = toCalculate[i+1];
	// 		res = operators[current](first, second);
	// 		shrink.push(res);
	// 		i++;
	// 	}

	// 	if (isSecondOrderOperator(current)) {
	// 		shrink.push(res);
	// 	}
	// }


	return shrink[0];
}


function isValid(toCalculate) {
	if (!_.isArray(toCalculate)) return false;

	// Verify correct sequence
	var grouped = _.groupBy(toCalculate, function(item, index) { return index % 2 === 0 ? 'number' : 'operator' });

	if(!_.isNumber(_.first(toCalculate))) return false;
	if(!_.isNumber(_.last(toCalculate))) return false;

	if (!(_.every(grouped.number, _.isNumber) &&
		_.every(grouped.operator, isValidOperator))) {
		return false;
	}

	return true;
}

function isValidOperator(item) {
	return _.contains(_.keys(operators), item);
}

function isFirstOrderOperator(operator) {
	return _.contains(["*", "/"], operator);
}

function isSecondOrderOperator(operator) {
	return _.contains(["+", "-"], operator);
}

module.exports = {
	calculate: calculate
}