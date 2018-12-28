// Copyright (c) 2018, frappe and contributors
// For license information, please see license.txt

cur_frm.add_fetch("customer_loan_grant","loan_amount","loan_amount")
cur_frm.add_fetch("customer_loan_grant","due_amount","loan_due_amount")
cur_frm.add_fetch("customer_loan_grant","instalment_amount","instalment_amount")


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

frappe.ui.form.on("Loan Collection", "after_save", function(frm, doctype, name) {
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
