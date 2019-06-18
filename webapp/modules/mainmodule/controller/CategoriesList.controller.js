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
    return BaseController.extend("app.modules.mainmodule.controller.CategoriesList", {
        onInit: function () {
            var oRouter = this.getRouter();
            oRouter.getRoute("categories").attachMatched(this.callSetBreadcrumbs, this);
        },
        callSetBreadcrumbs: function (oEvent) {
            var oModel = this.getView().getModel("myModel");
            this.setBreadcrumbs(oEvent, oModel, {
                menuItem: "catalog"
            });
        },
        onCategoriesItemPress: function (oEvent) {
            var oData = oEvent.getSource().getBindingContext("myModel").getObject();
            this.getRouter().navTo("types", {
                category: oData.cat_name
            });
            //this.getView().getModel("myModel").setProperty("/Remote_current/title", oData.title);
        },
        onCategoriesNavBack: function () {
            this.getRouter().navTo("start")
        }

    });
});