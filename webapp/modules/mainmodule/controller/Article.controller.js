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
            oRouter.getRoute("article").attachMatched(this.checkCartMatches, this);
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
        onArticleNavBack: function () {
            var sCategoryName = sap.ui.core.UIComponent.getRouterFor(this)._oRouter._prevRoutes[0].params[0];
            var sTypeName = sap.ui.core.UIComponent.getRouterFor(this)._oRouter._prevRoutes[0].params[1];
            this.getRouter().navTo("articles", {
                category: sCategoryName,
                type: sTypeName
            });
            //console.log(sap.ui.core.UIComponent.getRouterFor(this)._oRouter._prevRoutes[0].params[0]);

        },
        addOrRemoveToCart: function (oEvent) {
            var oProduct = this.getView().getModel("myModel").getProperty("/ArticleCurrent");
            var aCart = this.getView().getModel("myModel").getProperty("/Cart");
            var match = aCart.find(function (element) {
                return element.article_num == oProduct.article_num
            })

            if (!match) {
                aCart.push(oProduct);
                this.getView().getModel("myModel").setProperty("/Cart", aCart);
                this.byId("cartAddButton").setProperty("text", "Удалить из заявки");
                this.byId("cartAddButton").setProperty("icon", "sap-icon://cart-2");
                this.byId("cartAddButton").setProperty("type", "Reject");
            } else {
                var matchOut = aCart.filter(function (element) {
                    return element.article_num != oProduct.article_num;
                })
                this.getView().getModel("myModel").setProperty("/Cart", matchOut);
                console.log(this.getView().getModel("myModel").getProperty("/Cart"));
                this.byId("cartAddButton").setProperty("text", "Добавить в заявку");
                this.byId("cartAddButton").setProperty("icon", "sap-icon://cart-3");
                this.byId("cartAddButton").setProperty("type", "Emphasized");
            }
        },
        checkCartMatches() {
            var oProduct = this.getView().getModel("myModel").getProperty("/ArticleCurrent");
            var aCart = this.getView().getModel("myModel").getProperty("/Cart");
            var match = aCart.find(function (element) {
                return element.article_num == oProduct.article_num
            })

            if (!match) {
                console.log("Нет в корзине");
                this.byId("cartAddButton").setProperty("text", "Добавить в заявку");
                this.byId("cartAddButton").setProperty("icon", "sap-icon://cart-3");
                this.byId("cartAddButton").setProperty("type", "Emphasized");
            } else {
                console.log("Уже в корзине");
                this.byId("cartAddButton").setProperty("text", "Удалить из заявки");
                this.byId("cartAddButton").setProperty("icon", "sap-icon://cart-2");
                this.byId("cartAddButton").setProperty("type", "Reject");
            }
        }
    });
});