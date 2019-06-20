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

    return BaseController.extend('app.modules.mainmodule.controller.Articles', {

        onInit: function () {
            var oRouter = this.getRouter();
            oRouter.getRoute("article").attachMatched(this.callSetBreadcrumbs, this);
        },
        callSetBreadcrumbs: function (oEvent) {
            var oModel = this.getView().getModel("myModel");
            var sCategory = oEvent.getParameter("arguments").category;
            var sType = oEvent.getParameter("arguments").type;
            this.setBreadcrumbs(oEvent, oModel, {
                menuItem: "catalog",
                category: sCategory,
                type: sType,
                article: oEvent.getParameter("arguments").article
            });
        },    
        onArticleNavBack: function(){
            var sCategoryName = sap.ui.core.UIComponent.getRouterFor(this)._oRouter._prevRoutes[0].params[0];
            var sTypeName = sap.ui.core.UIComponent.getRouterFor(this)._oRouter._prevRoutes[0].params[1];
            this.getRouter().navTo("articles", {
                category: sCategoryName,
                type: sTypeName
            });
            //console.log(sap.ui.core.UIComponent.getRouterFor(this)._oRouter._prevRoutes[0].params[0]);

        },
        addToCart: function(){
            var oProduct = this.getView().getModel("myModel").getProperty("/ArticleCurrent");
            var oCart = this.getView().getModel("myModel").getProperty("/Cart");
            oCart.push(oProduct);
            this.getView().getModel("myModel").setProperty("/Cart", oCart);
        }
    });
});