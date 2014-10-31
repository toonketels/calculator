"use strict";

var expect     = require('chai').expect;
var calculator = require('../lib/calculator');
var _          = require('underscore');


describe('calculator', function () {


	describe('#calculate', function() {

		it('should return false when no array given', function() {
			var tests = [
				"this is not valid",
			];

			_.each(tests, function(test) {
				expect(calculator.calculate(test)).to.be.false;
			});
		});

		it('should return false when when no number operator number sequence is given', function() {
			var tests = [
				[23, "+", 32, "/"],
				["+", 56],
				["+", 56, 39],
				["-", "="],
				[2, "+", "-", 44]
			];

			_.each(tests, function(test) {
				expect(calculator.calculate(test)).to.be.false;
			})
		});

		it('should apply the operator on two numbers', function() {
			var tests = [
				{ in: [2, "*", 3], out: 6 }
			];

			_.each(tests, function(test) {
				expect(calculator.calculate(test.in)).to.equal(test.out);
			})
		});

		it('should operate on a sequence', function() {
			var tests = [
				{ in: [2, "*", 3, "*", 2], out: 12 },
				{ in: [2, "*", 3, "*", 2, "/", 2], out: 6 }
			];

			_.each(tests, function(test) {
				expect(calculator.calculate(test.in)).to.equal(test.out);
			})
		});

		it('should operate on a sequence taking order into account', function() {
			var tests = [
				{ in: [2, "+", 3, "*", 2], out: 8 },
				{ in: [2, "+", 3, "*", 2, "+", 10], out: 18 },
				{ in: [2, "*", 3, "-", 2, "/", 2], out: 5 }
			];

			_.each(tests, function(test) {
				expect(calculator.calculate(test.in)).to.equal(test.out);
			});
		});

		it('should return false when trying to divide by zero', function() {
			var tests = [
				{ in: [4, "/", 0], out: false },
				{ in: [5, "-", 0, "*", 5, "/", 2, "+", 5, "/", 0], out: false }
			];

			// Check our new operator does not yet exist
			_.each(tests, function(test) {
				expect(calculator.calculate(test.in)).to.equal(test.out);
			});
		});

	});


	describe('#addOperator', function() {	

		it('should be extendable', function() {
			var tests = [
				{ in: [4, "%", 3], out: 1 },
				{ in: [5, "-", 7, "%", 5, "+", 5], out: 8 }
			];

			// Check our new operator does not yet exist
			_.each(tests, function(test) {
				expect(calculator.calculate(test.in)).to.be.false;
			});

			// Add it
			calculator.addOperator("%", {
				stage: 1,
				operate: function(first, second) { return first % second; }
			});

			_.each(tests, function(test) {
				expect(calculator.calculate(test.in)).to.equal(test.out);
			});
		});

		it('should allow a constraint to be passed', function() {
			var tests = [
				{ in: [4, "%", 3], out: 1 },
				{ in: [5, "-", 7, "%", 5, "+", 5], out: false }
			];

			// Add it
			calculator.addOperator("%", {
				stage: 1,
				// Guard disallows even numbers as first item
				guard: function(first, second) { return first % 2 === 0; },
				operate: function(first, second) { return first % second; }
			});

			_.each(tests, function(test) {
				expect(calculator.calculate(test.in)).to.equal(test.out);
			});
		});
	});
});