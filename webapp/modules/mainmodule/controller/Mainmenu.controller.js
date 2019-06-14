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
            oRouter.getRoute("start").attachMatched(this.takePath, this);
        },
        takePath: function(){
            var oModel =this.getView().getModel("myModel");
            var sCategory = sap.ui.core.UIComponent.getRouterFor(this)._oRouter._prevRoutes[0].params[0];
            var sType = sap.ui.core.UIComponent.getRouterFor(this)._oRouter._prevRoutes[0].params[1];
            //this.setBreadcrumbs(aPath, oModel)
        },
        onMenuItemPress: function (oEvent) {
            var oData = oEvent.getSource().getBindingContext("myModel").getObject();
            this.getRouter().navTo(oData.route);
        },
        menuItemType: function (bType) {
            return bType ? "Navigation" : "Active";
        }
    });
});