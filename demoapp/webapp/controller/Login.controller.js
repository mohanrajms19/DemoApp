sap.ui.define([
    "com/lighthouse/init/BaseController",
    "sap/ui/model/json/JSONModel",
    'sap/m/MessagePopover',
    'sap/m/MessageItem',
    'sap/ui/core/message/Message',
    'sap/ui/core/library',
    'sap/ui/core/Core',
    'sap/ui/core/Element',
    'com/lighthouse/utils/ErrorMessage',
    'com/lighthouse/utils/URLConstants',
], function (BaseController, JSONModel, MessagePopover, MessageItem, Message, coreLibrary, Core, Element, ErrorMessage, URLConstants) {
    "use strict";
    var timerId, that;
    // shortcut for sap.ui.core.MessageType
    var MessageType = coreLibrary.MessageType;

    return BaseController.extend("demoapp.controller.Dummy.Login", {
        onInit: function () {
            that = this;
            that.getView().addStyleClass(that.getOwnerComponent().getContentDensityClass());
            let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("login").attachMatched(this._onObjectMatched, this);

            //validation related id parameters
            this.formId = this.getView().byId('loginForm');
            this.pageId = this.getView().byId('loginPage');
            this.popoverBtn = this.getView().byId('messagePopoverBtnLogin');
            //
            this.loginBtn = this.byId("loginBtn");
            this.verifyBtn = this.byId("verifyBtn");
            this.companyLable = this.byId("companyLable");
            this.companyCB = this.byId("companyCB");

        },
        _onObjectMatched: function () {
            //Default theme
            sap.ui.getCore().applyTheme("sap_fiori_3");

            this.errorPopoveraParams();

            // this.loginBtn.setVisible(true);
            // this.verifyBtn.setVisible(false);
            // this.companyCB.setVisible(false);
            // this.companyLable.setVisible(false);
            this.loginModel();
            this.onPressChangePassword();
            this.fetchCompanies();
        },
        onAfterRendering: function () {
            this.getView().addDelegate({
                onsapenter: function () {
                    that.oView.getController().onPressLogin();
                }
            });
        },
        loginModel: function () {
            let oModel = new JSONModel({ companyID: 1, userName: "admin@its.com", password: 123456, enable: true, superAdmin: 1, verifyCompany: false });
            this.getView().setModel(oModel, "loginModel");
        },
        errorPopoveraParams: function () {
            //value state removing if existing state is thare means
            this.eMdl = this.getOwnerComponent().getModel('errors');
            ErrorMessage.removeValueState([this.formId], this.eMdl);
        },
        handleMessagePopoverPress: function (oEvent) {
            //this.errorMessagePopover(oEvent.getSource());
        },
        /* fetchCompanies */
        fetchCompanies: async function () {

            try {
                let oModel = this.getView().getModel("loginModel");
                let oData = oModel.getData();
                let path = URLConstants.URL.mm_companies;
                let companies = await this.restMethodPost(path, {});
                oModel.getData().companiesCollection = companies;
                oModel.refresh(true);
                // this.companiesId.setBusy(false);
            } catch (error) {
                this.showLoading(false);
                this.errorHandling(error);
            }
        },
        onShowPassword: function (oEvent) {
            let oSource = oEvent.getSource();
            let type = oSource.getType() == 'Text';
            let getIcon = oSource.getValueHelpIconSrc();
            let show = ((oSource) => {
                oSource.setValueHelpIconSrc("sap-icon://show");
                oSource.setType("Password");
            });
            let hide = ((oSource) => {
                oSource.setValueHelpIconSrc("sap-icon://hide");
                oSource.setType("Text");
            });

            if (type) {
                show(oSource);
            } else {
                hide(oSource);
            }

            oSource.setValue(oSource.getValue());

        },
        onPressChangePassword: function (oEvent) {
            var cModel = this.getView().getModel('loginModel');
            cModel.getData().enable = true;
            cModel.refresh();
            this.loginBtn.setText("Login");
        },
        onVerifyCompany: async function (oEvent) {
            try {
                var cModel = this.getView().getModel('loginModel');
                let reqData = cModel.getData();
                ErrorMessage.formValidation([this.formId], this.eMdl, this.pageId); //Error popover
                var valid = this.eMdl.getData();
                if (valid.length == 0) {
                    let path = URLConstants.URL.login_validate;
                    let reqData = cModel.getData();
                    reqData.verifyCompany = true;
                    let login = await this.restMethodPostLogin(path, reqData);
                    if (login && login[0]) {
                        login[0].role = 2,
                            login[0].companyId = reqData.companyID
                        that.setStorage("userContext", login[0]);
                    }
                    await this.fetchModulesByUser();
                    this.showLoading(false);
                    this.getRouter().navTo("dashboard");
                } else {
                    this.errorHandling();
                    this.showLoading(false);
                }
            } catch (error) {
                this.errorHandling(error);
                this.showLoading(false);

            }
            /*    this.loginModel();
               this.getRouter().navTo("dashboard"); */
            //this.fetchActiveRecordsCount();
        },
        onPressLogin: async function (oEvent) {
            var that = this;
            var cModel = this.getView().getModel('loginModel');
            this.showLoading(true);
            try {
                ErrorMessage.formValidation([this.formId], this.eMdl, this.pageId); //Error popover
                var valid = this.eMdl.getData();
                if (valid.length == 0) {
                    that.setStorage("dashboardData", null);
                    that.setStorage("userContext", null);
                    that.setStorage("user_modules", null);
                    this.errorMessagePopoverClose();
                    let path = URLConstants.URL.login_validate;
                    let reqData = cModel.getData();
                    let login = await this.restMethodPostLogin(path, reqData);
                    if (login && login[0]) {
                        login[0].userName = login[0].email;
                        this.getView().setModel(new JSONModel(login[0]), "loginModel");
                        if (login[0].superAdmin == 1) {
                            login[0].companyId = reqData.companyID,
                                login[0].role = 1,
                                that.setStorage("userContext", login[0]);
                            await this.fetchModulesByUser();
                            this.showLoading(false);
                            this.getRouter().navTo("dashboard");
                        } else {
                            login[0].companyId = reqData.companyID,
                                login[0].role = 2,
                                that.setStorage("userContext", login[0]);
                            await this.fetchModulesByUser();
                            this.showLoading(false);
                            this.getRouter().navTo("dashboard");
                        }
                    }
                } else {
                    this.errorHandling();
                    this.showLoading(false);
                }
            } catch (error) {
                this.showLoading(false);
                this.errorHandling(error);
            }
        },
    });
});
