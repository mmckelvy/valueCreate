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



/*
What is the sequence of steps to calculate cumulative free cash flow?
(1) get the beginning value of debt, nwc, and revenue
(2) grow the revenue by (1 + cagr)
(3) calculate the free cash flow using the beg values of debt and nwc and the current value of revenue
(4) reduce the beginning value of debt by the amount of free cash flow
(5) set the beginning value of nwc and revenue to the ending value
*/
