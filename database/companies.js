// Include mongoose.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create the company schema.
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

// Returns company's cumulative free cash flow and final year EBITDA.
companySchema.methods.freeCashFlowCalc = function () {
	// Calculate beginning period values.  Assumes a five year hold.
	var periods = 5;
	var begDebt = this.debt;
	var begNwc = this.nwcDays / 365 * this.baseRev;
	var begRevenue = this.baseRev;
	var cumFcf = 0;
	// Calculate current period values.
	var baseRev = this.baseRev;
	for (var i = 0; i < periods; i++) {
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

// Returns company's key value metrics: entry enterprise value, entry equity, and ending equity.
companySchema.methods.valueCalc = function () {
	var fcf = this.freeCashFlowCalc().cumFcf;
	var terminalEbitda = this.freeCashFlowCalc().terminalEbitda;
	var terminalValue = terminalEbitda * this.exitMultiple;
	var endEquity = terminalValue - (this.debt - fcf);
	var denominator = Math.pow(1 + this.targetReturns, 5);
	var begEquity = endEquity / denominator;
	
	return {
		tev: begEquity + this.debt,
		endEquity: endEquity,
		begEquity: begEquity
	}
};

// Returns EBITDA contribution to equity growth.
companySchema.methods.ebitdaSourceReturns = function () {
	var terminalEbitda = this.freeCashFlowCalc().terminalEbitda;
	var entryEbitda = this.baseRev * this.margin;
	var difference = terminalEbitda - entryEbitda;
	
	return difference * this.exitMultiple;
};

// Returns the multiple expansion contribution to equity growth
companySchema.methods.multipleSourceReturns = function () {
	var tev = this.valueCalc().tev;
	var entryEbitda = this.baseRev * this.margin;
	var entryMultiple = tev / entryEbitda;
	
	return (this.exitMultiple - entryMultiple) * entryEbitda;
};

// Call necessary functions, package up the result in an object that is ready to be transmitted to the client.
companySchema.methods.getResults = function () {
	return {
		companyName: this.companyName,
		freeCashFlow: Math.round(this.freeCashFlowCalc().cumFcf * 10) / 10,
		tev: Math.round(this.valueCalc().tev * 10) / 10,
		endEquity: Math.round(this.valueCalc().endEquity * 10) / 10,
		begEquity: Math.round(this.valueCalc().begEquity * 10) / 10,
		ebitdaSourceReturns: Math.round(this.ebitdaSourceReturns() * 10) / 10,
		multipleSourceReturns: Math.round(this.multipleSourceReturns() * 10) / 10
	};
};

// Create the Company model with the companySchema schema.
var Company = mongoose.model('Company', companySchema);
module.exports = Company;
 