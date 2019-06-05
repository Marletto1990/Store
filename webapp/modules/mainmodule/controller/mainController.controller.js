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
            alert("onInit")
        }
    });


    return CController;

});