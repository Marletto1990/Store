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
            this.oSF = this.getView().byId("searchField");
        },
        callSetBreadcrumbs: function (oEvent) {

            var oEventBus = sap.ui.getCore().getEventBus();
            oEventBus.publish("showMaster"); 

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
            //Здесь при обновлении ошибка, не удается получить sType
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
                category: oCtgName.name,
                type: oTpName.name,
                article: sArticleName
            });
        },
        onSearch: function (oEvent) {
            // var item = oEvent.getParameter("suggestionItem");
			// if (item) {
			// 	sap.m.MessageToast.show("Выбран артикул " + item.getDescription());
            // }
            var sArticle = oEvent.getParameter("suggestionItem").getKey();
            var oData = this.getView().getModel("myModel").getProperty("/Articles");
            var oTarget = oData.find(function(element){
                return element.article_num == sArticle;
            });
            var oCategories = this.getView().getModel("myModel").getProperty("/Categories");
            var oCtgName = oCategories.find(function (element) {
                return element.cat_num == oTarget.cat_num;
            });
            var i = oCategories.findIndex(function (element) {
                return element.cat_num == oTarget.cat_num;
            });
            var oTpName = this.getView().getModel("myModel").getProperty("/Categories/" + i + "/type").find(function (element) {
                return element.type_num == oTarget.type_num;
            });
            var sArticleName = oTarget.article_num;

            this.getRouter().navTo("article", {
                category: oCtgName.name,
                type: oTpName.name,
                article: sArticleName
            });
		},

		onSuggest: function (event) {
			var value = event.getParameter("suggestValue");
			var filters = [];
			if (value) {
				filters = [
					new sap.ui.model.Filter([
						new sap.ui.model.Filter("article_name", function(sText) {
							return (sText || "").toUpperCase().indexOf(value.toUpperCase()) > -1;
						}),
						new sap.ui.model.Filter("article_num", function(sDes) {
							return (String(sDes) || "").toUpperCase().indexOf(value.toUpperCase()) > -1;
						})
					], false)
				];
			}

			this.oSF.getBinding("suggestionItems").filter(filters);
			this.oSF.suggest();
		}
    });
});