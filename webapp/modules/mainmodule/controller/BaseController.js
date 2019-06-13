sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	'sap/m/MessageToast'
], function(Controller, History, UIComponent,MessageToast) {
	"use strict";

	return Controller.extend("app.modules.mainmodule.controller.BaseController", {

		getRouter : function () {
			return UIComponent.getRouterFor(this);
		},

		onNavBack: function () {
			var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("start", {}, true /*no history*/);
			}
		},
		_onBaseRouteMatched: function(oEvent, oParameters){
			var sListId = oParameters.listId;

			var sCategoryName = oEvent.getParameter("arguments")[param].category;
			var sTypeName = oEvent.getParameter("arguments")[param].type;
			var sArticleName = oEvent.getParameter("arguments")[param].article;

			var oList = this.getView().byId(sListId);
			var oTemplate = oList.getBindingInfo("items").template;
			var sModel = oList.getBindingInfo("items").model;
			var i = oList.getModel(sModel).getProperty("/Categories").findIndex( function (element){
				return element.cat_name == sCategoryName; 
			});
			var sPath = sModel+">/Categories/" + i + "/type";



			oList.bindAggregation("items", sPath, oTemplate);
		},
		/*_onBaseRouteMatched2: function(oEvent){
			var sCategoryName = oEvent.getParameter("arguments").category;
			var oList = this.getView().byId("typeList");
			var oTemplate = oList.getBindingInfo("items").template;
			var sModel = oList.getBindingInfo("items").model;
			var i = oList.getModel(sModel).getProperty("/Categories").findIndex( function (element){
				return element.cat_name == sCategoryName; 
			});
			var sPath = sModel+">/Categories/" + i + "/type";
			oList.bindAggregation("items", sPath, oTemplate);
		}*/

	});

});