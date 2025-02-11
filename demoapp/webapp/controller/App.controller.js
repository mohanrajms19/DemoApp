sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (Controller) => {
  "use strict";

  return Controller.extend("demoapp.controller.App", {
    onInit: function () {
      this.reloadData();
  },
  reloadData: function () {
      let that = this;
      if (window.performance) {
        console.info("window.performance works fine on this browser");
      }
      console.info(performance.navigation.type);
      if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
        //this.setManifest(1);
       // this.setSideNavigation();
      } else {
        console.info("This page is not reloaded");
      }
    }
  });
});