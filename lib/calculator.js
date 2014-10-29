/**
 * Calculator.
 */
"use strict";

var _ = require('underscore');


var operators = {
	"*": { 
		stage: 1,
		operate: function multiply(first, second) { return first * second }
	},
	"/": {
		stage: 1,
		operate: function divide(first, second) { return first / second }
	},
	"+": {
		stage: 2,
		operate: function add(first, second) { return first + second }
	},
	"-": {
		stage: 2,
		operate: function subtract(first, second) { return first - second }
	}
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
	
	// First stage
	for (var i = 0, length = toCalculate.length; i < length; i++) {
		current = toCalculate[i];
		
		if (_.isNumber(current)) { shrink.push(current); }

		if (isFirstOrderOperator(current)) {
			first = shrink.pop();
			second = toCalculate[i+1];
			res = operators[current].operate(first, second);
			shrink.push(res);
			i++;
		}

		if (isSecondOrderOperator(current)) {
			shrink.push(current);
		}
	}

	// Second stage
	toCalculate = shrink;
	shrink      = [];
	for (var i = 0, length = toCalculate.length; i < length; i++) {
		current = toCalculate[i];
		
		if (_.isNumber(current)) { shrink.push(current); }

		if (isSecondOrderOperator(current)) {
			first = shrink.pop();
			second = toCalculate[i+1];
			res = operators[current].operate(first, second);
			shrink.push(res);
			i++;
		}
	}

	return shrink[0];
}


function addOperator(symbol, definition) {
	operators[symbol] = definition;
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
	var firstOrderOperators = [];
	_.each(operators, function(operator, symbol) { if (operator.stage === 1) firstOrderOperators.push(symbol); });
	return _.contains(firstOrderOperators, operator);
}

function isSecondOrderOperator(operator) {
	var secondOrderOperators = [];
	_.each(operators, function(operator, symbol) { if (operator.stage === 2) secondOrderOperators.push(symbol); });
	return _.contains(secondOrderOperators, operator);
}

module.exports = {
	calculate  : calculate,
	addOperator: addOperator
}