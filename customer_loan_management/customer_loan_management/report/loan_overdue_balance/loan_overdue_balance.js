// Copyright (c) 2016, frappe and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Loan Overdue Balance"] = {
	"filters": [
		{
        	    "fieldname": "from_date",
       		    "label": __("From Date"),
        	    "fieldtype": "Date",
		    "default": frappe.datetime.get_today()
        	},
		{
        	    "fieldname": "to_date",
        	    "label": __("To Date"),
        	    "fieldtype": "Date",
		    "default": frappe.datetime.get_today()
        	},
		{
		    "fieldname": "sales_partner",
	            "label": __("Sales Partner"),
	            "fieldtype": "Link",
		    "options": "Sales Partner"
		},
		{
		    "fieldname": "customer",
	            "label": __("Customer"),
	            "fieldtype": "Link",
		    "options": "Customer"
		}
	]
}
