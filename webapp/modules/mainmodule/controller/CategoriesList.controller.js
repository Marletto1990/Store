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
                var oRouter = this.getRouter();
			    oRouter.getRoute("types").attachMatched(this.onCategoryRoutMatched, this);
            },
            onCategoryRoutMatched: function(oEvent){
                this._onBaseRouteMatched(oEvent, {
                    listId: "typeList",

                });
            },
            onCategoriesItemPress: function(oEvent){
                var oCtx = oEvent.getSource().getBindingContext("myModel").getObject();
                    this.getRouter().navTo("types", {
                        category : oCtx.cat_name
                    });
                //console.log(oCtx);
            },
            onCategoriesNavBack: function(){
                var sCategoryName = sap.ui.core.UIComponent.getRouterFor(this)._oRouter._prevRoutes[0].params[0];
                this.getRouter().navTo("start")
                }
            
    });
});