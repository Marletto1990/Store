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
            oRouter.getRoute("categories").attachMatched(this.onTypeRoutMatched, this);
            oRouter.getRoute("types").attachMatched(this.onTypeRoutMatched, this);
            oRouter.getRoute("articles").attachMatched(this.onTypeRoutMatched, this);
            //oRouter.getRoute("types").attachMatched(this.callSetBreadcrumbs, this);
        },
        onTypeRoutMatched: function (oEvent) {
            var sCategoryName = sap.ui.core.UIComponent.getRouterFor(this)._oRouter._prevRoutes[0].params[0];
            if (!sCategoryName) {
            }
            var sTypeName = sap.ui.core.UIComponent.getRouterFor(this)._oRouter._prevRoutes[0].params[1];
            var bCatalog = false;
            if (!sCategoryName && !sTypeName) {
                bCatalog = true;
            }
            this._onBaseRouteMatched(oEvent, {
                catalog: bCatalog,
                listId: "typeList",
                category: sCategoryName,
                type: sTypeName,
                aggregationName: "items"
            });
        },
        callSetBreadcrumbs: function (oEvent) {
            var oModel = this.getView().getModel("myModel");
            var sCategory = oEvent.getParameter("arguments").category;

            this.setBreadcrumbs(oEvent, oModel, {
                menuItem: "catalog",
                category: sCategory
            });

        },
        onTypesNavBack: function () {
            var sCategoryName = sap.ui.core.UIComponent.getRouterFor(this)._oRouter._prevRoutes[0].params[0];
            if (sCategoryName) {
                this.getRouter().navTo("categories", {
                    category: sCategoryName,
                });
            } else {
                this.getRouter().navTo("start")
            }

        },
        //here is error
        onTypeListItemPress: function (oEvent) {
            var directory = oEvent.getSource().getBindingContext("myModel").getObject();
            var sCategoryName = sap.ui.core.UIComponent.getRouterFor(this)._oRouter._prevRoutes[0].params[0];
             
            if(!sCategoryName){

                this.getRouter().navTo("types", {
                    category: directory.name,
                });
            } else {

                this.getRouter().navTo("articles", {
                    category: sCategoryName,
                    type: directory.name
                });
            }
        }
    });
});