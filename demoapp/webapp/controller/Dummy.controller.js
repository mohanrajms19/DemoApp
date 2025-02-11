sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("demoapp.controller.Dummy", {
        onInit() {
            this.showLoading(true);
            this.onNavBack();
        }
    });
});