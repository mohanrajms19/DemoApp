sap.ui.define([
   "demoapp/controller/BaseController"
 ], function (BaseController) {
    "use strict";
 
    return BaseController.extend("demoapp.controller.Login", {
        onDisplayNotFound : function () {
			//display the "notFound" target without changing the hash
			this.getRouter().getTargets().display("notFound",  {
				fromTarget : "Login"
			});
		},
        onNavToEmployees : function (){
			this.getRouter().navTo("employeeList");
		},
		onNavToEmployeeOverview : function ()  {
			this.getRouter().navTo("employeeOverview");
		}
    });
 
 });