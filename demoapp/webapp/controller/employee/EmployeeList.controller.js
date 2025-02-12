sap.ui.define([
	"demoapp/controller/BaseController"
], function (BaseController) {
	"use strict";
	return BaseController.extend("demoapp.controller.employee.EmployeeList", {
        onListItemPressed : function(oEvent){
			var oItem, oCtx;
			oItem = oEvent.getSource();
			oCtx = oItem.getBindingContext();
			this.getRouter().navTo("employee",{
				employeeId : oCtx.getProperty("EmployeeID")
			});
		}

	});
});