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
			})
		});

	});
});