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

});