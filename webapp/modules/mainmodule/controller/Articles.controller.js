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

    var CController = Controller.extend("Articles", {

        onInit: function () {

        },
        //Переход в подробный вид артикула
        onArticleItemPress: function (oEvent) {
            var oData = oEvent.getSource().getBindingContext("myModel").getObject();
            var sPath = oEvent.getSource().getBindingContext("myModel").getPath();
            oEvent.getSource().getModel("myModel").setProperty("/ArticleCurrent/description", oData.description);
            oEvent.getSource().getModel("myModel").setProperty("/ArticleCurrent/article_big_image_path", oData.article_big_image_path);
            oEvent.getSource().getModel("myModel").setProperty("/ArticleCurrent/article_name", oData.article_name);


            this.byId("SplitAppDemo").toDetail(this.createId("articlePage")); //переход в подробный вид

            console.log(oData);
            console.log(sPath);
            console.log();
            //MessageToast.show("путь - " +sPath+"/article_image_path"+" артикул - "+article);
        }
    });


    return CController;

});