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
            //this.setArticlesHeaderPath();
            var oRouter = this.getRouter();
            oRouter.getRoute("types").attachMatched(this.onCategoryRoutMatched, this);
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
            oEvent.getSource().getModel("myModel").setProperty("/ArticleCurrent/description", oData.description);
            oEvent.getSource().getModel("myModel").setProperty("/ArticleCurrent/article_big_image_path", oData.article_big_image_path);
            oEvent.getSource().getModel("myModel").setProperty("/ArticleCurrent/article_name", oData.article_name);
            console.log(oData);
            console.log(sPath);

            var sCategoryName = sap.ui.core.UIComponent.getRouterFor(this)._oRouter._prevRoutes[0].params[0];
            var sTypeName = sap.ui.core.UIComponent.getRouterFor(this)._oRouter._prevRoutes[0].params[1];
            var sArticleName =  oData.article_num;
            this.getRouter().navTo("article", {
                category: sCategoryName,
                type: sTypeName,
                article: sArticleName
            });


            //console.log(aArticleRemote);
            //var aArticleRemote = this.getView().getModel("myModel").getProperty("/Remote")[2];
                 
        }
    });
});