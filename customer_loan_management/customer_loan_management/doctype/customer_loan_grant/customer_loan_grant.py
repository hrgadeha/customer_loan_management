# -*- coding: utf-8 -*-
# Copyright (c) 2018, frappe and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.utils import nowdate

class CustomerLoanGrant(Document):
	pass

@frappe.whitelist(allow_guest=True)
def postDailyInterest():
	doc = frappe.db.sql ("""SELECT name FROM `tabCustomer Loan Grant` where docstatus = 1""", as_list= 1)
	for i in doc:
		data = frappe.get_doc("Customer Loan Grant", i[0])
		if data.due_amount != 0:
			gl_entry_cr = frappe.get_doc({
			"doctype": "GL Entry", 
			"posting_date": nowdate(),
			"party": data.customer, 
			"voucher_type":"Customer Loan Grant",
			"party_type":"Customer",
			"voucher_no":data.name,
			"cost_center":data.cost_center,
			"account":data.interest_income_account,
			"credit":data.interest_amount_per_day,
			"credit_in_account_currency":data.interest_amount_per_day
			})
			gl_entry_cr.insert(ignore_permissions=True)
			gl_entry_cr.submit()
			gl_entry_dr = frappe.get_doc({
			"doctype": "GL Entry", 
			"posting_date": nowdate(),
			"party": data.customer, 
			"voucher_type":"Customer Loan Grant",
			"party_type":"Customer",
			"voucher_no":data.name,
			"cost_center":data.cost_center,
			"account":data.accounts_receivable,
			"debit":data.interest_amount_per_day,
			"debit_in_account_currency":data.interest_amount_per_day
			})
			gl_entry_dr.insert(ignore_permissions=True)
			gl_entry_dr.submit()
