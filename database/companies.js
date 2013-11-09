// Include mongoose.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create the user schema.
var companySchema = new Schema ({
	companyName: String,
	targetReturns: Number,
	exitMultiple: Number,
	baseRev: Number,
	cagr: Number,
	margin: Number,
	depAmort: Number,
	capEx: Number,
	nwcDays: Number,
	debt: Number,
	interestRate: Number,
	taxRate: Number
});

companySchema.methods.freeCashFlowCalc = function () {
	// Calculate beginning period values.
	var begDebt = this.debt;
	var begNwc = this.nwcDays / 365 * this.baseRev;
	var begRevenue = this.baseRev;
	var cumFcf = 0;
	// Calculate current period values.  Assumes a five year hold.
	var baseRev = this.baseRev;
	for (var i = 0; i < 5; i++) {
		var currentRev = baseRev * (1 + this.cagr);
		var ebitda = currentRev * this.margin;
		var depreciation = currentRev * this.depAmort;
		var interest = begDebt * this.interestRate;
		var capitalExpenditures = currentRev * this.capEx;
		var currentNwc = this.nwcDays / 365 * currentRev;
		// Calculate EBT
		var ebt = ebitda - depreciation - interest;
		// Calculate taxes
		var taxes = ebt * this.taxRate;
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
	return {
		cumFcf: cumFcf,
		terminalEbitda: ebitda
	}
};

companySchema.methods.enterpriseValueCalc = function () {
	var fcf = this.freeCashFlowCalc().cumFcf;
	var exitEbitda = this.baseRev * Math.pow(1 + this.cagr, 5) * this.margin;
	var terminalValue = exitEbitda * this.exitMultiple;
	var numerator = terminalValue - (this.debt - fcf);
	var denominator = Math.pow(1 + this.targetReturns, 5);
	var begEquity = numerator / denominator;
	
	return begEquity + this.debt;
};

companySchema.methods.ebitdaSourceReturns = function () {
	var terminalEbitda = this.freeCashFlowCalc().terminalEbitda;
	var entryEbitda = this.baseRev * this.margin;
	var difference = terminalEbitda - entryEbitda;
	
	return difference * this.exitMultiple;
};

// Create the User model with the user schema.
var Company = mongoose.model('Company', companySchema);
module.exports = Company;
 