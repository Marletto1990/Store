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
        onPressDetailBack: function () {
            this.byId("SplitAppDemo").backDetail();
        },
        onListItemPress: function (oEvent) {
            var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();

            this.byId("SplitAppDemo").toDetail(this.createId(sToPageId));
        },

        //создание первого уровня меню
        onMenuItemPress: function (oEvent) {
            var oData = oEvent.getSource().getBindingContext("myModel").getObject();
            this.navigateToMaster(oData);
        },

            //создание второго уровня меню
        onMenuItemPress2: function (oEvent) {
            var oData = oEvent.getSource().getBindingContext("myModel").getObject();
            
            var sPath = oEvent.getSource().getBindingContext("myModel").getPath();
            var sChild = oData.child;
            var oList_types = this.getView().byId("typeList");
           // oList_types.bindElement({path:sPath+"/"+sChild, model: "myModel"});
           var oTemplate = oList.getBindingInfo("items").template;
           oList_types.bindItems("myModel>"+sPath+"/"+sChild, oTemplate);

            this.navigateToMaster(oData);
        },
        //создание второго уровня меню
        onMenuItemPress3: function (oEvent) {
            var oData = oEvent.getSource().getBindingContext("myModel").getObject();
            
            var sPath = oEvent.getSource().getBindingContext("myModel").getPath();
            var sChild = oData.child;
            var oList_articles = this.getView().byId("typeList");
            // oList__articles.bindElement({path:sPath+"/"+sChild, model: "myModel"});
            var oTemplate = oList.getBindingInfo("items").template;
            oList_articles.bindItems("myModel>"+sPath+"/"+sChild, oTemplate);

            this.navigateToMaster(oData);
        },
        navigateToMaster: function(oData){
            if (oData.link) {
                if (oData.master_option) {
                    this.byId("SplitAppDemo").toMaster(this.createId(oData.link));
                }
            } else {alert ("нет линка!");}
        },
        menuItemType: function(bType){
            return bType ? "Navigation" : "Active";
        },
        //создание второго уровня меню
        onMenu2ItemPress: function (oEvent) {
            var sPath = oEvent.getSource().getBindingContext("myModel").getPath();
            console.log(sPath);
            console.log(oEvent.getSource().getBindingContext("myModel").getObject());

            var oData = oEvent.getSource().getBindingContext("myModel").getObject();
            if (oData.link) {
                if (oData.master_option) {
                    this.byId("SplitAppDemo").toMaster(this.createId(oData.link));
                } else {alert ("нет линка!");}
            } else {alert ("нет линка!");}
        },
        menuItemType: function(bType){
            return bType ? "Navigation" : "Active";
        },

        //создание третьего уровня меню
        onTypeItemPress: function (oEvent) {
            let sPath = oEvent.getSource().getBindingContext("myModel").getPath();
            console.log(sPath);
            console.log(oEvent.getSource().getBindingContext("myModel").getObject());
        }
    });


    return CController;

});