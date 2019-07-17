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

    var CController = BaseController.extend("AdminMaster", {

        onInit: function () {

        },
        onAdminMasterPress: function(oEvent){
            this.getRouter().navTo("_adminCreateNew");
        }
    });


    return CController;

});