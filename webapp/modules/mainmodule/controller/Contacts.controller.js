sap.ui.define([
    'jquery.sap.global',
    'sap/m/MessageToast',
    'sap/ui/core/Fragment',
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/Filter',
    'sap/ui/model/json/JSONModel',
    'sap/base/Log',
    "sap/ui/model/FilterOperator"
], function (jQuery, MessageToast, Fragment, Controller, Filter, JSONModel, Log, FilterOperator) {
    "use strict";

    var CController = Controller.extend("Contacts", {

        onInit: function () {

        }
    });


    return CController;

});