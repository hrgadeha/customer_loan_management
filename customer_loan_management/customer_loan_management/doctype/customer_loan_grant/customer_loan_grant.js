// Copyright (c) 2018, frappe and contributors
// For license information, please see license.txt

cur_frm.add_fetch("customer","customer_name","customer_name")


frappe.ui.form.on('Customer Loan Grant', {
	loan_duration: function(frm) {
		var loan_amount = frm.doc.loan_amount;
		var interest_rate = frm.doc.interest_rate;
		var loan_days = frm.doc.days;
		var instalment_amount = (((loan_amount * interest_rate) + loan_amount) / loan_days);

		frm.set_value("instalment_amount",instalment_amount);
		frm.set_value("due_amount",loan_amount);
	}
});

frappe.ui.form.on('Customer Loan Grant', {
	interest_rate: function(frm) {
		var loan_amount = frm.doc.loan_amount;
		var interest_rate = frm.doc.interest_rate;
		var loan_days = frm.doc.days;
		var instalment_amount = (((loan_amount * interest_rate) + loan_amount) / loan_days);

		frm.set_value("instalment_amount",instalment_amount);
		frm.set_value("due_amount",loan_amount);
	}
});

frappe.ui.form.on('Customer Loan Grant', {
	loan_amount: function(frm) {
		var loan_amount = frm.doc.loan_amount;
		var interest_rate = frm.doc.interest_rate;
		var loan_days = frm.doc.days;
		var instalment_amount = (((loan_amount * interest_rate) + loan_amount) / loan_days);

		frm.set_value("instalment_amount",instalment_amount);
		frm.set_value("due_amount",loan_amount);
	}
});

frappe.ui.form.on('Customer Loan Grant', {
	days: function(frm) {
		var loan_amount = frm.doc.loan_amount;
		var interest_rate = frm.doc.interest_rate;
		var loan_days = frm.doc.days;
		var instalment_amount = (((loan_amount * interest_rate) + loan_amount) / loan_days);

		frm.set_value("instalment_amount",instalment_amount);
		frm.set_value("due_amount",loan_amount);
	}
});
