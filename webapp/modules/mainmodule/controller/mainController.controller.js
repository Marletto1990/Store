sap.ui.define([
    'jquery.sap.global',
    'sap/m/MessageToast',
    'sap/ui/core/Fragment',
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/Filter',
    'sap/ui/model/json/JSONModel',
    'sap/base/Log'
], function (jQuery, MessageToast, Fragment, Controller, Filter, JSONModel, Log) {
    "use strict";

    var CController = Controller.extend("mainController", {

        onInit: function () {

        },
        onPressGoToCatalog: function(){
            this.getSplitAppObj().toMaster(this.createId("catalog"));
        },
        onPressMasterBack : function() {
			this.getSplitAppObj().backMaster();
		},
        getSplitAppObj : function() {
			var result = this.byId("SplitAppDemo");
			if (!result) {
				Log.info("SplitApp object can't be found");
			}
			return result;
		}
    });


    return CController;

});