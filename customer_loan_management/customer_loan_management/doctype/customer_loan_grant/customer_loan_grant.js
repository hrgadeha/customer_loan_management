// Copyright (c) 2018, frappe and contributors
// For license information, please see license.txt

cur_frm.add_fetch("loan_duration","days","days")
cur_frm.add_fetch("collection_frequency","days","collection_days")
cur_frm.add_fetch("loan_duration","interest_rate","interest_rate")

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

frappe.ui.form.on('Customer Loan Grant', {
	"date": function(frm) {
		var date = frm.doc.date
		frm.set_value("last_loan_collection_date",date);
	}
});

frappe.ui.form.on('Customer Loan Grant', {
	loan_duration: function(frm) {
		var loan_amount = frm.doc.loan_amount;
		var interest_rate = frm.doc.interest_rate;
		var loan_days = frm.doc.days;
		var collection_days = frm.doc.collection_days;
		var instalment_amount = ((((loan_amount * (interest_rate)/100) + loan_amount) / loan_days)) * collection_days;
		var int_amount = (loan_amount * (interest_rate / 100));

		frm.set_value("instalment_amount",instalment_amount);
		frm.set_value("due_amount",loan_amount);
		frm.set_value("interest_amount",int_amount);
	}
});

frappe.ui.form.on('Customer Loan Grant', {
	interest_rate: function(frm) {
		var loan_amount = frm.doc.loan_amount;
		var interest_rate = frm.doc.interest_rate;
		var loan_days = frm.doc.days;
		var collection_days = frm.doc.collection_days;
		var instalment_amount = ((((loan_amount * (interest_rate)/100) + loan_amount) / loan_days)) * collection_days;
		var int_amount = (loan_amount * (interest_rate / 100));

		frm.set_value("instalment_amount",instalment_amount);
		frm.set_value("due_amount",loan_amount);
		frm.set_value("interest_amount",int_amount);
	}
});

frappe.ui.form.on('Customer Loan Grant', {
	loan_amount: function(frm) {
		var loan_amount = frm.doc.loan_amount;
		var interest_rate = frm.doc.interest_rate;
		var loan_days = frm.doc.days;
		var collection_days = frm.doc.collection_days;
		var instalment_amount = ((((loan_amount * (interest_rate)/100) + loan_amount) / loan_days)) * collection_days;
		var int_amount = (loan_amount * (interest_rate / 100));

		frm.set_value("instalment_amount",instalment_amount);
		frm.set_value("due_amount",loan_amount);
		frm.set_value("interest_amount",int_amount);
	}
});

frappe.ui.form.on('Customer Loan Grant', {
	collection_frequency: function(frm) {
		var loan_amount = frm.doc.loan_amount;
		var interest_rate = frm.doc.interest_rate;
		var loan_days = frm.doc.days;
		var collection_days = frm.doc.collection_days;
		var instalment_amount = ((((loan_amount * (interest_rate)/100) + loan_amount) / loan_days)) * collection_days;
		var int_amount = (loan_amount * (interest_rate / 100));

		frm.set_value("instalment_amount",instalment_amount);
		frm.set_value("due_amount",loan_amount);
		frm.set_value("interest_amount",int_amount);
	}
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

frappe.ui.form.on("Customer Loan Grant", "onload", function(frm) {
    cur_frm.set_query("accounts_receivable", function() {
        return {
            "filters": {
                "account_type": "Receivable"
            }
        };
    });
});

frappe.ui.form.on("Customer Loan Grant", "onload", function(frm) {
    cur_frm.set_query("cash_account", function() {
        return {
            "filters": {
                "account_type": "Cash"
            }
        };
    });
});

frappe.ui.form.on("Customer Loan Grant", "onload", function(frm) {
    cur_frm.set_query("interest_income_account", function() {
        return {
            "filters": {
                "account_type": "Income Account"
            }
        };
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

frappe.ui.form.on('Customer Loan Grant', {
	loan_duration: function(frm) {
		var interest_amount = frm.doc.interest_amount;
		var days = frm.doc.days;
		var interest_amount_per_day = (interest_amount / days);

		frm.set_value("interest_amount_per_day",interest_amount_per_day);
	}
});

frappe.ui.form.on('Customer Loan Grant', {
	loan_amount: function(frm) {
		var interest_amount = frm.doc.interest_amount;
		var days = frm.doc.days;
		var interest_amount_per_day = (interest_amount / days);

		frm.set_value("interest_amount_per_day",interest_amount_per_day);
	}
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

frappe.ui.form.on('Customer Loan Grant', {
	loan_duration: function(frm) {
		var days = frm.doc.days;
		var collection_days = frm.doc.collection_days;
		var due_days = parseInt(days / collection_days);

		frm.set_value("due_days",due_days);
	}
});

frappe.ui.form.on('Customer Loan Grant', {
	collection_frequency: function(frm) {
		var days = frm.doc.days;
		var collection_days = frm.doc.collection_days;
		var due_days = parseInt(days / collection_days);

		frm.set_value("due_days",due_days);
	}
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

frappe.ui.form.on("Customer Loan Grant", "on_submit", function(frm, doctype, name) {
frappe.call({
	"method": "customer_loan_management.customer_loan_management.loan_due_amount.update_cash_account",
	args: {
		doctype: "Customer Loan Grant",
		cash_account: frm.doc.cash_account,
		date: frm.doc.date,
		loan_amount: frm.doc.loan_amount,
		customer: frm.doc.customer,
		name: frm.doc.name
     	},

	callback:function(r){
     ;}
});
});

frappe.ui.form.on("Customer Loan Grant", "on_submit", function(frm, doctype, name) {
frappe.call({
	"method": "customer_loan_management.customer_loan_management.loan_due_amount.update_rece_account",
	args: {
		doctype: "Customer Loan Grant",
		accounts_receivable: frm.doc.accounts_receivable,
		date: frm.doc.date,
		loan_amount: frm.doc.loan_amount,
		customer: frm.doc.customer,
		name: frm.doc.name
     	},

	callback:function(r){
     ;}
});
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

frappe.ui.form.on("Customer Loan Grant", "on_submit", function(frm, doctype, name) {
frappe.call({
	"method": "customer_loan_management.customer_loan_management.loan_due_amount.update_interest_amount",
	args: {
		doctype: "Customer Loan Grant",
		interest_income_account: frm.doc.interest_income_account,
		date: frm.doc.date,
		interest_amount: frm.doc.interest_amount_per_day,
		customer: frm.doc.customer,
		name: frm.doc.name
     	},

	callback:function(r){
     ;}
});
});

frappe.ui.form.on("Customer Loan Grant", "on_submit", function(frm, doctype, name) {
frappe.call({
	"method": "customer_loan_management.customer_loan_management.loan_due_amount.update_interest_amount_ar",
	args: {
		doctype: "Customer Loan Grant",
		accounts_receivable: frm.doc.accounts_receivable,
		date: frm.doc.date,
		interest_amount: frm.doc.interest_amount_per_day,
		customer: frm.doc.customer,
		name: frm.doc.name
     	},

	callback:function(r){
     ;}
});
});
