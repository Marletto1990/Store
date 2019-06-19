sap.ui.define([
	'sap/ui/core/UIComponent',
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
],
	function(UIComponent, JSONModel, Device) {
	"use strict";

	var Component = UIComponent.extend("app.Component", {

		metadata : {
		    manifest: "json"
		},

		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();
			/*var oModel = new sap.ui.model.json.JSONModel();
            oModel.loadData("modules/mainmodule/models/goods.json");
			this.setModel(oModel,"myModel");*/
			var oModel = this.getModel("myModel");
			oModel.dataLoaded().then( function(oData){
				var oLoadedModel = this.getModel("myModel");
				var aArticles = oLoadedModel.getProperty("/Articles");
				var aArticles2 = [];
				aArticles.forEach( function (item){
					aArticles2.push(item);
				})
				function shuffle(o) {
					for (var j, x, k = o.length; k; j = Math.floor(Math.random()*k), x = o[--k], o[k] = o[j], o[j] = x);
					return o;
				}
				shuffle(aArticles2);
				var aRandomArticles = [];
				for(var i=0;i<4;i++){
					aRandomArticles.push(aArticles2[i])
				}
				oLoadedModel.setProperty("/RandomArticles",aRandomArticles);
			}.bind(this))


		}

	});

	return Component;

});
