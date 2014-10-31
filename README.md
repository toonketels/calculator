CALCULATOR
===========================


README
---------------------------

Basic calculator. Give it an array like [2, "+", 3, "*" 4] and returns the result 14.


	// Calculate
	var res = calculator.calculate([2, "+", 3, "*" 4]);

	// Extend it
	calculator.addOperator("%", {
		stage  : 1,
		operate: function(first, second) { return first % second; }
	});

	// Optionally define a guard to prevent illegal operations,
	// return false to disallow an operation
	calculator.addOperator("/", {
		stage  : 1,
		guard  : function guard(first, second) { return !(second === 0) },
		operate: function divide(first, second) { return first / second }
	});

Operations included: *, /, +, -



Install & test
---------------------------

    git clone git@github.com:toonketels/calculator.git
    cd calculator
    npm install

    // run test
    mocha
