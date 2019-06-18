sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	'sap/m/MessageToast',
	'sap/ui/model/Filter',
	"sap/ui/model/FilterOperator"
], function (Controller, History, UIComponent, MessageToast, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("app.modules.mainmodule.controller.BaseController", {
		onAfterRendering: function () {
			//this.setArticlesHeaderPath();
		},
		getRouter: function () {
			return UIComponent.getRouterFor(this);
		},

		onNavBack: function () {
			var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("start", {}, true /*no history*/ );
			}
		},
		_onBaseRouteMatched: function (oEvent, oParameters) {

			var sCategoryName = oParameters.category;
			var sTypeName = oParameters.type;
			var oList = this.getView().byId(oParameters.listId);
			var oTemplate = oList.getBindingInfo(oParameters.aggregationName).template;
			var sModel = oList.getBindingInfo(oParameters.aggregationName).model;
			//debugger
			if (sTypeName) {
				var i = oList.getModel(sModel).getProperty("/Categories").findIndex(function (element) {
					return element.cat_name == sCategoryName;
				});
				var j = oList.getModel(sModel).getProperty("/Categories" + i + "/type").findIndex(function (element) {
					return element.name == sTypeName;
				});
				var sPath = sModel + ">/Categories/" + i + "/type/" + j;
				oList.bindAggregation(oParameters.aggregationName, sPath, oTemplate);

			} else {
				var i = oList.getModel(sModel).getProperty("/Categories").findIndex(function (element) {
					return element.cat_name == sCategoryName;
				});
				var sPath = sModel + ">/Categories/" + i + "/type";
				oList.bindAggregation(oParameters.aggregationName, sPath, oTemplate);
			}
		},
		_showFilterArticles: function (oEvent, oParameters) {
			var sCategoryName = oParameters.category;
			var oFilters = {};
			if (sCategoryName) {
				var sTypeName = oParameters.type;
				var oList = this.getView().byId(oParameters.listId);
				var sModel = oList.getBindingInfo(oParameters.aggregationName).model;
				var oCtg = oList.getModel(sModel).getProperty("/Categories").find(function (element) {
					return element.cat_name == sCategoryName;
				});
				var nCategoryID = oCtg.cat_num;
				oFilters = {
					"cat_num": nCategoryID
				}
				if (sTypeName) {
					var oTp = oCtg.type.find(function (element) {
						return element.name == sTypeName;
					});
					oFilters.type_num = oTp.type_num;
				}
			}
			this.superFilter(oFilters);
		},
		setArticlesHeaderPath: function () {
			var sCategoryName = this.getView().getModel("myModel").getProperty("/");
			console.log(sCategoryName);

			function setPath(a, b) {
				if (a) {
					return a;
				} else if (b) {
					return b;
				} else {
					return "Каталог";
				}
			}
			this.getView().getModel("myModel").setProperty("/Remote/path", setPath(sTypeName, sCategoryName));

		},
		superFilter: function (oFilters) {
			var aFilter = [];
			for (var key in oFilters) {
				aFilter.push(new Filter(key, FilterOperator.EQ, oFilters[key]));
			}

			// filter binding
			var oList = this.getView().byId("articlesContainer");
			var oBinding = oList.getBinding("content");
			oBinding.filter(aFilter);
		},

		//Navigation Panel
		setBreadcrumbs: function (oEvent, oModel, oParams) {
			setTimeout(function () {
				oModel.setProperty("/Remote_current/title", "");
				oModel.setProperty("/Remote/title", {});
				var aRemote = [{
					"title": "Главная",
					"path": "Main",
					"route": "start"
				}];
				var aRemoteObject1 = {
					"title": oParams.menuItem,
					"path": "Catalog",
					"route": "categories"
				};
				var aRemoteObject2 = {
					"title": oParams.category,
					"path": "Category",
					"route": "types"
				};
				var aRemoteObject3 = {
					"title": oParams.type,
					"path": "Type",
					"route": "articles"
				};
				if ((oParams.menuItem != "catalog") && (!oParams.category) && (!oParams.type) && (!oParams.article)) {
					oModel.setProperty("/Remote", {});
					oModel.setProperty("/Remote_current/title", "Главная");
				} else if ((oParams.menuItem == "catalog") && (!oParams.category) && (!oParams.type) && (!oParams.article)) {
					oModel.setProperty("/Remote", aRemote);
					oModel.setProperty("/Remote_current/title", oParams.menuItem);
				} else if ((oParams.menuItem == "catalog") && (oParams.category) && (!oParams.type) && (!oParams.article)) {
					aRemote.push(aRemoteObject1);
					oModel.setProperty("/Remote", aRemote);
					oModel.setProperty("/Remote_current/title", oParams.category);
				} else if ((oParams.menuItem == "catalog") && (oParams.category) && (oParams.type) && (!oParams.article)) {
					aRemote.push(aRemoteObject1);
					aRemote.push(aRemoteObject2);
					oModel.setProperty("/Remote", aRemote);
					oModel.setProperty("/Remote_current/title", oParams.type);
				} else if ((oParams.menuItem == "catalog") && (oParams.category) && (oParams.type) && (oParams.article)) {
					aRemote.push(aRemoteObject1);
					aRemote.push(aRemoteObject2);
					aRemote.push(aRemoteObject3);
					oModel.setProperty("/Remote", aRemote);
					oModel.setProperty("/Remote_current/title", oParams.article);

				}

			}.bind(this), 0);

		},
		onBreadcrumbsPress: function (oEvent) {
			var sRout = oEvent.getSource().getBindingContext("myModel").getObject().route;
			var oCtgName = sap.ui.core.UIComponent.getRouterFor(this)._oRouter._prevRoutes[0].params[0];
			var oTpName = sap.ui.core.UIComponent.getRouterFor(this)._oRouter._prevRoutes[0].params[1];
			var sArticleName;
			if (sArticleName) {
				this.getRouter().navTo(sRout, {
					category: oCtgName,
					type: oTpName,
					article: sArticleName
				});
			} else if (oTpName) {
				this.getRouter().navTo(sRout, {
					category: oCtgName,
					type: oTpName
				});
			} else if (oCtgName) {
				this.getRouter().navTo(sRout, {
					category: oCtgName
				});
			} else {
				this.getRouter().navTo(sRout)
			}
		},
        hideBreadcrumbs(){
        }
	});

});