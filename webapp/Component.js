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
			var oModel = new sap.ui.model.json.JSONModel();
            oModel.loadData("modules/mainmodule/models/goods.json");
            this.setModel(oModel,"myModel");
		}

	});

	return Component;

});
