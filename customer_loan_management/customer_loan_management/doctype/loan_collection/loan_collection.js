// Copyright (c) 2018, frappe and contributors
// For license information, please see license.txt

cur_frm.add_fetch("customer_loan_grant","customer","customer")
cur_frm.add_fetch("customer_loan_grant","loan_amount","loan_amount")
cur_frm.add_fetch("customer_loan_grant","due_amount","loan_due_amount")
cur_frm.add_fetch("customer_loan_grant","instalment_amount","instalment_amount")
cur_frm.add_fetch("customer_loan_grant","cash_account","cash_account")
cur_frm.add_fetch("customer_loan_grant","accounts_receivable","accounts_receivable")


frappe.ui.form.on('Loan Collection', {
	customer_loan_grant: function(frm) {
		var loan_due_amount = frm.doc.loan_due_amount;
		var instalment_amount = frm.doc.instalment_amount;
		var due_amount = (loan_due_amount - instalment_amount);

		frm.set_value("due_amount",due_amount);
	}
});

frappe.ui.form.on('Loan Collection', {
	instalment_amount: function(frm) {
		var loan_due_amount = frm.doc.loan_due_amount;
		var instalment_amount = frm.doc.instalment_amount;
		var due_amount = (loan_due_amount - instalment_amount);

		frm.set_value("due_amount",due_amount);
	}
});


/* ##############################################  Penalty Amount Calculation   ##########################################################*/

frappe.ui.form.on('Loan Collection', {
	due_amount: function(frm) {
		var one_day_penalty_amount = frm.doc.one_day_penalty_amount;
		var over_due_days = frm.doc.over_due_days;
		var due_amount = frm.doc.due_amount;
		var penalty_amount = (one_day_penalty_amount * over_due_days);
		var total_outstanding_amount = (due_amount + penalty_amount);

		frm.set_value("total_outstanding_amount",total_outstanding_amount);
	}
});

frappe.ui.form.on('Loan Collection', {
	one_day_penalty_amount: function(frm) {
		var one_day_penalty_amount = frm.doc.one_day_penalty_amount;
		var over_due_days = frm.doc.over_due_days;
		var due_amount = frm.doc.due_amount;
		var penalty_amount = (one_day_penalty_amount * over_due_days);
		var total_outstanding_amount = (due_amount + penalty_amount);

		frm.set_value("penalty_amount",penalty_amount);
		frm.set_value("total_outstanding_amount",total_outstanding_amount);
	}
});

frappe.ui.form.on('Loan Collection', {
	over_due_days: function(frm) {
		var one_day_penalty_amount = frm.doc.one_day_penalty_amount;
		var over_due_days = frm.doc.over_due_days;
		var due_amount = frm.doc.due_amount;
		var penalty_amount = (one_day_penalty_amount * over_due_days);
		var total_outstanding_amount = (due_amount + penalty_amount);

		frm.set_value("penalty_amount",penalty_amount);
		frm.set_value("total_outstanding_amount",total_outstanding_amount);
	}
});

/* ##############################################    Due Amount Update   ################################################################*/


frappe.ui.form.on("Loan Collection", "on_submit", function(frm, doctype, name) {
frappe.call({
	"method": "customer_loan_management.customer_loan_management.loan_due_amount.update_due_amount",
	args: {
		doctype: "Loan Collection",
		customer_loan: frm.doc.customer_loan_grant,
		due_amount: frm.doc.due_amount
     	},

	callback:function(r){
     ;}
});
});

/* ##############################################   Outstanding Aoount Update  ###########################################################*/


frappe.ui.form.on("Loan Collection", "on_submit", function(frm, doctype, name) {
frappe.call({
	"method": "customer_loan_management.customer_loan_management.loan_due_amount.update_outstanding_amount",
	args: {
		doctype: "Loan Collection",
		customer_loan: frm.doc.customer_loan_grant,
		total_outstanding_amount: frm.doc.total_outstanding_amount
     	},

	callback:function(r){
     ;}
});
});

/* ##############################################    Instalment Account   ################################################################*/

frappe.ui.form.on("Loan Collection", "on_submit", function(frm, doctype, name) {
frappe.call({
	"method": "customer_loan_management.customer_loan_management.loan_due_amount.update_instalment_amount_ca",
	args: {
		doctype: "Loan Collection",
		cash_account: frm.doc.cash_account,
		date: frm.doc.date,
		instalment_amount: frm.doc.instalment_amount,
		customer: frm.doc.customer,
		name: frm.doc.name
     	},

	callback:function(r){
     ;}
});
});

frappe.ui.form.on("Loan Collection", "on_submit", function(frm, doctype, name) {
frappe.call({
	"method": "customer_loan_management.customer_loan_management.loan_due_amount.update_instalment_amount_ar",
	args: {
		doctype: "Loan Collection",
		accounts_receivable: frm.doc.accounts_receivable,
		date: frm.doc.date,
		instalment_amount: frm.doc.instalment_amount,
		customer: frm.doc.customer,
		name: frm.doc.name
     	},

	callback:function(r){
     ;}
});
});

/* ##############################################    Penalty Account   ################################################################*/

frappe.ui.form.on("Loan Collection", "on_submit", function(frm, doctype, name) {
frappe.call({
	"method": "customer_loan_management.customer_loan_management.loan_due_amount.update_penalty_amount",
	args: {
		doctype: "Loan Collection",
		penalty_income_account: frm.doc.penalty_income_account,
		date: frm.doc.date,
		penalty_amount: frm.doc.penalty_amount,
		customer: frm.doc.customer,
		name: frm.doc.name
     	},

	callback:function(r){
     ;}
});
});

frappe.ui.form.on("Loan Collection", "on_submit", function(frm, doctype, name) {
frappe.call({
	"method": "customer_loan_management.customer_loan_management.loan_due_amount.update_penalty_amount_ar",
	args: {
		doctype: "Loan Collection",
		accounts_receivable: frm.doc.accounts_receivable,
		date: frm.doc.date,
		penalty_amount: frm.doc.penalty_amount,
		customer: frm.doc.customer,
		name: frm.doc.name
     	},

	callback:function(r){
     ;}
});
});
