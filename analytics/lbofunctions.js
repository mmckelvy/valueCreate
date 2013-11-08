// Calculates cumulative free cash flow.
var freeCashFlowCalc = function (baseRev, cagr, margin, depAmort, capEx, nwcDays, debt, interestRate, taxRate) {
	// Calculate beginning period values.
	var begDebt = debt;
	var begNwc = nwcDays / 365 * baseRev;
	var begRevenue = baseRev;
	var cumFcf = 0;
	// Calculate current period values.  Assumes a five year hold.
	for (var i = 0; i < 5; i++) {
		var currentRev = baseRev * (1 + cagr);
		var ebitda = currentRev * margin;
		var depreciation = currentRev * depAmort;
		var interest = begDebt * interestRate;
		var capitalExpenditures = currentRev * capEx;
		var currentNwc = nwcDays / 365 * currentRev;
		// Calculate EBT
		var ebt = ebitda - depreciation - interest;
		// Calculate taxes
		var taxes = ebt * taxRate;
		// Calculate change in working capital
		var changeNwc = begNwc - currentNwc;
		// Calculate free cash flow
		var fcf = ebt - taxes + depreciation - capitalExpenditures + changeNwc;
		// Reduce debt balance by free cash flow
		begDebt = Math.max(0, begDebt - fcf);
		// Set beginning working capital to ending working capital
		begNwc = currentNwc;
		// Set beginning revenue to ending revenue
		baseRev = currentRev;
		// Add the period free cash flow to the total
		cumFcf += fcf;
	}
	return cumFcf;
};

// Calculate beginning equity value.
var beginningEquityCalc = function (baseRev, cagr, margin, debt, fcf, targetReturns, exitMultiple) {
	var exitEbitda = baseRev * Math.pow(1 + cagr, 5) * margin;
	var terminalValue = exitEbitda * exitMultiple;
	var numerator = terminalValue - (debt - fcf);
	var denominator = Math.pow(1 + targetReturns, 5);
	
	return numerator / denominator;
};

var enterpriseValueCalc = function (begEquity, debt) {
	return begEquity + debt;
};