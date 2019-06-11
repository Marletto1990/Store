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
        return BaseController.extend("app.modules.mainmodule.controller.CategoriesList", {
            onInit: function () {
            },
            onCategoriesItemPress: function(oEvent){
                var oCtx = oEvent.getSource().getBindingContext("myModel").getObject();
                    this.getRouter().navTo("types", {
                        category : oCtx.cat_name
                    });
                console.log(oCtx);
            }
    });
});