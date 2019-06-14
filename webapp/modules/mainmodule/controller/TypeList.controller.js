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
    return BaseController.extend("app.modules.mainmodule.controller.TypeList", {
        onInit: function () {
            var oRouter = this.getRouter();
            oRouter.getRoute("types").attachMatched(this.onTypeRoutMatched, this);

        },
        onTypeRoutMatched: function (oEvent) {
            var sCategoryName = sap.ui.core.UIComponent.getRouterFor(this)._oRouter._prevRoutes[0].params[0];
            var sTypeName = sap.ui.core.UIComponent.getRouterFor(this)._oRouter._prevRoutes[0].params[1];
            this._onBaseRouteMatched(oEvent, {
                listId: "typeList",
                category: sCategoryName,
                type: sTypeName,
                aggregationName: "items"
            });
            console.log ("on Init onTypeRoutMatches");
        },
        onTypesNavBack: function () {
            var sCategoryName = sap.ui.core.UIComponent.getRouterFor(this)._oRouter._prevRoutes[0].params[0];
            this.getRouter().navTo("categories", {
                category: sCategoryName
            });
        },
        onTypeListItemPress: function (oEvent) {
            var oTps = oEvent.getSource().getBindingContext("myModel").getObject();
            var sCategoryName = sap.ui.core.UIComponent.getRouterFor(this)._oRouter._prevRoutes[0].params[0];
            this.getRouter().navTo("articles", {
                category: sCategoryName,
                type: oTps.name
            });
            console.log(sap.ui.core.UIComponent.getRouterFor(this)._oRouter._prevRoutes[0].params[0]);
            console.log(oTps.name);

        }
    });
});