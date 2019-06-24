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
    return BaseController.extend("app.modules.mainmodule.controller.Main", {
        onInit: function () {
            var oEventBus = sap.ui.getCore().getEventBus();
            oEventBus.subscribe("hideMaster", this.hideMaster, this);
            oEventBus.subscribe("showMaster", this.showMaster, this);
        },
        hideMaster: function () {
            this.getView().byId("SplitAppDemo").setProperty("mode", "HideMode");
        },
        showMaster: function () {
            this.getView().byId("SplitAppDemo").setProperty("mode", "ShowHideMode");
        }
    });
});