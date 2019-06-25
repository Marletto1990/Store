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

    return BaseController.extend('app.modules.mainmodule.controller.News', {
		onInit: function () {
            //var oRouter = this.getRouter();
            //oRouter.getRoute("start").attachMatched(this.showRandomArticles, this);
        },
        onNewsButtonPress: function(){
            this.getRouter().getTargets().display("notFound");
        },
        onNewsItemPress: function(oEvent){
            var oData = oEvent.getSource().getBindingContext("myModel").getObject();  
            var oList = this.getView().byId("articlesContainerNews");
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
                category: oCtgName.name,
                type: oTpName.name,
                article: sArticleName
            });
        }
	});
});