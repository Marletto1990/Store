sap.ui.define([
    'jquery.sap.global',
    'sap/m/MessageToast',
    'sap/ui/core/Fragment',
    'app/modules/mainmodule/controller/BaseController',
    'sap/ui/model/Filter',
    'sap/ui/model/json/JSONModel',
    'sap/base/Log',
    "sap/ui/model/FilterOperator"
], function (jQuery, MessageToast, Fragment, BaseController, Filter, JSONModel, Log, FilterOperator) {
    "use strict";
    return BaseController.extend("app.modules.mainmodule.controller.Mainmenu", {
        onInit: function () {
            var oRouter = this.getRouter();
            oRouter.getRoute("start").attachMatched(this.callSetBreadcrumbs, this);           
        },
        callSetBreadcrumbs: function (oEvent) {
            var oModel = this.getView().getModel("myModel");
            this.setBreadcrumbs(oEvent, oModel, {
            });

        },
        onMenuItemPress: function (oEvent) {
            var oData = oEvent.getSource().getBindingContext("myModel").getObject();
            this.getRouter().navTo(oData.route);
            //this.getView().getModel("myModel").setProperty("/Remote_current/title", oData.title);
        },
        menuItemType: function (bType) {
            return bType ? "Navigation" : "Active";
        }
    });
});