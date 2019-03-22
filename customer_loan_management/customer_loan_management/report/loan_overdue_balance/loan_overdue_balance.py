# Copyright (c) 2013, frappe and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import msgprint, _

def execute(filters=None):

	conditions, filters = get_conditions(filters)
	columns = get_column()
	data = get_data(conditions,filters)
	return columns,data

def get_column():
	return [_("Customer") + ":Link/Customer:150",
			_("Sales Partner") + ":Link/Sales Partner:150",
			_("Loan Granted Amount") + ":Currency:180",
			_("Due Amount") + ":Currency:100",
			_("Over Due Days") + ":Int:100",
			_("Total Outstanding Amount") + ":Currency:180"]

def get_data(conditions,filters):
	to_do = frappe.db.sql("""select customer, sales_partner, loan_amount, due_amount, over_due_days, total_outstanding_amount from `tabCustomer Loan Grant` where docstatus is not null %s order by date asc;"""%conditions, filters, as_list=1)
	return to_do

def get_conditions(filters):
	conditions = ""
	if filters.get("from_date"): conditions += " and date >= %(from_date)s"
	if filters.get("to_date"): conditions += " and date <= %(to_date)s"
	if filters.get("sales_partner"): conditions = "and sales_partner = %(sales_partner)s"
	if filters.get("customer"): conditions = "and customer = %(customer)s"

	return conditions, filters
