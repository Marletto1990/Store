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
            oRouter.getRoute("article").attachMatched(this.createThisArticle, this);
            oRouter.getRoute("article").attachMatched(this.callSetBreadcrumbs, this);
            oRouter.getRoute("article").attachMatched(this.checkCartMatches, this);
            
            var oEventBus = sap.ui.getCore().getEventBus();
            oEventBus.subscribe("checkCartMatches", this.checkCartMatches, this);  // ---->
        },
        createThisArticle: function(){

            var oEventBus = sap.ui.getCore().getEventBus();
            oEventBus.publish("showMaster"); 


            var aArticles = this.getView().getModel("myModel").getProperty("/Articles");
            var sArticleName = sap.ui.core.UIComponent.getRouterFor(this)._oRouter._prevRoutes[0].params[2];
            var n = aArticles.findIndex(function(element){
                return element.article_num == sArticleName;
            })
            var oModel = this.getView().getModel("myModel");
            this.getView().getModel("myModel").setProperty("/ArticlePath", n);
            this.getView().setBindingContext( new sap.ui.model.Context(oModel, "/Articles/"+n),"myModel");
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
        },
        addOrRemoveToCart: function (oEvent) {
            var n = this.getView().getModel("myModel").getProperty("/ArticlePath");
            var aCart = this.getView().getModel("myModel").getProperty("/Cart");
            var aArticles = this.getView().getModel("myModel").getProperty("/Articles");
            var match = aCart.find(function (element) {
                return element.article_num == aArticles[n].article_num
            })

            if (!match) {
                aCart.push(aArticles[n]);
                this.getView().getModel("myModel").setProperty("/Cart", aCart);
                this.getView().getModel("myModel").setProperty("/ArticleViewInfo/isButtonAddVisible", false);
                this.getView().getModel("myModel").setProperty("/ArticleViewInfo/isButtonDeleteVisible", true);

            } else {
                var matchOut = aCart.filter(function (element) {
                    return element.article_num != aArticles[n].article_num;
                })
                this.getView().getModel("myModel").setProperty("/Cart", matchOut);
                this.getView().getModel("myModel").setProperty("/ArticleViewInfo/isButtonAddVisible", true);
                this.getView().getModel("myModel").setProperty("/ArticleViewInfo/isButtonDeleteVisible", false);
            }
        },
        checkCartMatches() {
            var n = this.getView().getModel("myModel").getProperty("/ArticlePath");
            var aArticles = this.getView().getModel("myModel").getProperty("/Articles");
            var aCart = this.getView().getModel("myModel").getProperty("/Cart");
            var match = aCart.find(function (element) {
                return element.article_num == aArticles[n].article_num
            })

            if (!match) {
                this.getView().getModel("myModel").setProperty("/ArticleViewInfo/isButtonAddVisible", true);
                this.getView().getModel("myModel").setProperty("/ArticleViewInfo/isButtonDeleteVisible", false);
            } else {
                this.getView().getModel("myModel").setProperty("/ArticleViewInfo/isButtonAddVisible", false);
                this.getView().getModel("myModel").setProperty("/ArticleViewInfo/isButtonDeleteVisible", true);
            }
        }
    });
});