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
            oRouter.getRoute("categories").attachMatched(this.onCategoryRoutMatched, this);
            oRouter.getRoute("types").attachMatched(this.onCategoryRoutMatched, this);
            oRouter.getRoute("articles").attachMatched(this.onCategoryRoutMatched, this);
            oRouter.getRoute("categories").attachMatched(this.callSetBreadcrumbs, this);
            oRouter.getRoute("types").attachMatched(this.callSetBreadcrumbs, this);
            oRouter.getRoute("articles").attachMatched(this.callSetBreadcrumbs, this);

        },
        callSetBreadcrumbs: function (oEvent) {
            this.byId("theBreadcrumbs").addStyleClass("hidden");
            var oModel = this.getView().getModel("myModel");
            var sCategory = oEvent.getParameter("arguments").category;
            var sType = oEvent.getParameter("arguments").type;
            setTimeout(function () {
                this.setBreadcrumbs(oEvent, oModel, {
                    menuItem: "catalog",
                    category: sCategory,
                    type: sType
                });
            }.bind(this), 150);
            setTimeout(function () {
                this.byId("theBreadcrumbs").removeStyleClass("hidden");
            }.bind(this), 300);
        },
        onCategoryRoutMatched: function (oEvent) {
            var sCategory = sap.ui.core.UIComponent.getRouterFor(this)._oRouter._prevRoutes[0].params[0];
            var sType = sap.ui.core.UIComponent.getRouterFor(this)._oRouter._prevRoutes[0].params[1];
            this._showFilterArticles(oEvent, {
                listId: "articlesContainer",
                category: sCategory,
                type: sType,
                aggregationName: "content"
            });
        },
        //Переход в подробный вид артикула
        onArticlesItemPress: function (oEvent) {
            var oData = oEvent.getSource().getBindingContext("myModel").getObject();
            var sPath = oEvent.getSource().getBindingContext("myModel").getPath();  
            var oList = this.getView().byId("articlesContainer");
            var oCtgName = oList.getModel("myModel").getProperty("/Categories").find(function (element) {
                return element.cat_num == oData.cat_num;
            });
            var i = oList.getModel("myModel").getProperty("/Categories").findIndex(function (element) {
                return element.cat_num == oData.cat_num;
            });
            var oTpName = oList.getModel("myModel").getProperty("/Categories/" + i + "/type").find(function (element) {
                return element.type_num == oData.type_num;
            });
            var sArticleName = oData.article_num;

            this.getRouter().navTo("article", {
                category: oCtgName.cat_name,
                type: oTpName.name,
                article: sArticleName
            });
            //this.getView().getModel("myModel").setProperty("/Remote_current/title", oData.article_name);

        }
    });
});