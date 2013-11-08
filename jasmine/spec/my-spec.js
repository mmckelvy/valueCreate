describe("freeCashFlowCalc", function() {
	it("should calculate free cash flow", function() {
		var baseRev = 100;
		var cagr = 0.05;
		var margin = 0.25;
		var depAmort = 0.02;
		var capEx = 0.025;
		var nwcDays = 30;
		var debt = 25;
		var interestRate = 0.06;
		var taxRate = 0.4;
	expect(freeCashFlowCalc(baseRev, cagr, margin, depAmort, capEx, nwcDays, debt, interestRate, taxRate)).toEqual(73.550);
	});

	it("should calculate free cash flow with a variety of inputs", function() {
		var baseRev = 75;
		var cagr = 0.1;
		var margin = 0.15;
		var depAmort = 0.03;
		var capEx = 0.035;
		var nwcDays = 40;
		var debt = 30;
		var interestRate = 0.07;
		var taxRate = 0.35;
	expect(freeCashFlowCalc(baseRev, cagr, margin, depAmort, capEx, nwcDays, debt, interestRate, taxRate)).toEqual(27.006);
	});

	it("should calculate free cash flow even when it is negative", function() {
		var baseRev = 75;
		var cagr = 0.1;
		var margin = 0.15;
		var depAmort = 0.03;
		var capEx = 0.1;
		var nwcDays = 40;
		var debt = 30;
		var interestRate = 0.07;
		var taxRate = 0.35;
	expect(freeCashFlowCalc(baseRev, cagr, margin, depAmort, capEx, nwcDays, debt, interestRate, taxRate)).toEqual(-8.549);
	});
});

describe("beginningEquityCalc", function() {
	it("should calculate beginning equity value", function() {
		var baseRev = 100;
		var cagr = 0.05;
		var margin = 0.25;
		var debt = 25;
		var fcf = 73.550;
		var targetReturns = 0.2;
		var exitMultiple = 5;
	expect(beginningEquityCalc(baseRev, cagr, margin, debt, fcf, targetReturns, exitMultiple)).toEqual(83.625);
	});

	it("should calculate beginning equity value with a variety of inputs", function() {
		var baseRev = 75;
		var cagr = 0.1;
		var margin = 0.15;
		var debt = 30;
		var fcf = 27.006;
		var targetReturns = 0.2;
		var exitMultiple = 7;
	expect(beginningEquityCalc(baseRev, cagr, margin, debt, fcf, targetReturns, exitMultiple)).toEqual(49.766);
	});

	it("should calculate beginning equity value even when free cash flow is negative", function() {
		var baseRev = 75;
		var cagr = 0.1;
		var margin = 0.15;
		var debt = 30;
		var fcf = -8.549;
		var targetReturns = 0.1;
		var exitMultiple = 7;
	expect(beginningEquityCalc(baseRev, cagr, margin, debt, fcf, targetReturns, exitMultiple)).toEqual(54.814);
	});
});

describe("enterpriseValueCalc", function() {
	it("should calculate the value of the company", function() {
		var begEquity = 83.625;
		var debt = 25;
	expect(enterpriseValueCalc(begEquity, debt)).toEqual(108.6);
	});

	it("should calculate the value of the company with a variety of inputs", function() {
		var begEquity = 49.766;
		var debt = 30;
	expect(enterpriseValueCalc(begEquity, debt)).toEqual(79.766);
	});

	it("should calculate the value of the company even when free cash flow is negative", function() {
		var begEquity = 54.814;
		var debt = 30;
	expect(enterpriseValueCalc(begEquity, debt)).toEqual(84.813);
	});
});