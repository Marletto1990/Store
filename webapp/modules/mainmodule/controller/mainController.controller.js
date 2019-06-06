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
        onPressGoToCatalog: function () {
            this.byId("SplitAppDemo").toMaster(this.createId("catalog"));
        },
        onPressMasterBack: function () {
            this.byId("SplitAppDemo").backMaster();
        },
        goToProtectiveConstructions: function (oEvent) {
            this.byId("SplitAppDemo").to(this.createId("catalog_ProtConstructions"));
        },
        goToFrameConstructions: function (oEvent) {
            this.byId("SplitAppDemo").to(this.createId("catalog_FrameConstructions"));
        },
        goToStainlessSteelFurniture: function (oEvent) {
            this.byId("SplitAppDemo").to(this.createId("catalog_StainlessSteelFurniture"));
        },
        onPressDetailBack: function () {
            this.byId("SplitAppDemo").backDetail();
        },
        onListItemPress: function (oEvent) {
            var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();

            this.byId("SplitAppDemo").toDetail(this.createId(sToPageId));
        },
        onMenuItemPress: function (oEvent) {
            var oData = oEvent.getSource().getBindingContext("myModel").getObject();
            if (oData.link) {
                if (oData.master_option) {
                    this.byId("SplitAppDemo").toMaster(this.createId(oData.link));
                }
            }


        },
        menuItemType: function(bType){
            return bType ? "Navigation" : "Active";
        }
    });


    return CController;

});