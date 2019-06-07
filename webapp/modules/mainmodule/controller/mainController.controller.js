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
            var oTemplate = oList_types.getBindingInfo("items").template;
            oList_types.bindItems("myModel>"+sPath+"/"+sChild, oTemplate);

            this.navigateToMaster(oData);
        },
        //создание третьего уровня меню
        onMenuItemPress3: function (oEvent) {
            var oData = oEvent.getSource().getBindingContext("myModel").getObject();
            this.byId("SplitAppDemo").toMaster(this.createId("articles"));
            this.filterArticles(oData.type_num)
        },

        navigateToMaster: function(oData){
            if (oData.link) {
                if (oData.master_option) {
                    this.byId("SplitAppDemo").toMaster(this.createId(oData.link));
                }
            } else {MessageToast.show("нет линка!");}
        },
        menuItemType: function(bType){
            return bType ? "Navigation" : "Active";
        },
        //Фильтр для артикулов вручную
        /*filterArticles: function(oEvent){
            var aFilter = [];
            var typeNum = oEvent.getSource().getBindingContext("myModel").getProperty("type_num");
            var allArticles = this.getView().getModel("myModel").getProperty("/Articles/");
            allArticles.forEach(function(item) {
                aFilter.push(item.article_num);
            });
            var currentArticles = aFilter.filter(number => Number((number/100).toFixed(0))===typeNum);

            return(currentArticles);
        }*/
        filterArticles: function (sId) {

			// build filter array
			var aFilter = [];
			if (sId) {
				aFilter.push(new Filter("type_num", FilterOperator.EQ, sId));
			}

			// filter binding
			var oList = this.byId("articlesList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
        },
        onArticleItemPress: function(oEvent){
            var article = oEvent.getSource().getBindingContext("myModel").getProperty("article_num");
            var article2= this.byId("articlePage");
            var sPath = oEvent.getSource().getBindingContext("myModel").getPath();
            article2.bindElement(sPath);

            this.byId("SplitAppDemo").toDetail(this.createId("articlePage"));

            MessageToast.show("путь - " +sPath+" артикул - "+article);
        }
    });


    return CController;

});