// Calculates cumulative free cash flow.
var freeCashFlowCalc = function (baseRev, cagr, margin, depAmort, capEx, nwcDays, debt, interestRate, taxRate) {
	// Calculate beginning period values.
	var begDebt = debt;
	var begNwc = nwcDays / 365 * baseRev;
	// Calculate current period base values.
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
	return Math.round(ebt - taxes + depreciation - capitalExpenditures + changeNwc);
};

var beginningEquity = function (baseRev, cagr, margin, debt, fcf, targetReturns, exitMultiple) {
	var exitEbitda = baseRev * Math.pow(1 + cagr, 5) * margin;
	var terminalValue = exitEbitda * exitMultiple;
	var discountFactor = Math.pow(1 + targetReturns, 5);
	return terminalValue / discountFactor;
}