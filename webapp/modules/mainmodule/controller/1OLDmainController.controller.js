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
            this.goBackDetail();
        },
        onPressDetailBack: function () {
            this.byId("SplitAppDemo").backDetail();
        },
        goBackDetail: function () {
            MessageToast.show('123123');
            
        },
        onListItemPress: function (oEvent) {
            var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();
            this.byId("SplitAppDemo").toDetail(this.createId(sToPageId));
        },
        //запись функции-фильтра для возврата на уровень для detail
        remoteDetailwrite: function (oEvent,sFilter) {
            oEvent.getSource().getModel("myModel").setProperty("/Remote/goDetailBackFunc", sFilter);
            console.log(oEvent.getSource().getModel("myModel").getProperty("/Remote/goDetailBackFunc"));
        },
        //создание первого уровня меню
        onMenuItemPress: function (oEvent) {
            var oData = oEvent.getSource().getBindingContext("myModel").getObject();
            if(oData.link == "catalog"){           
                 this.navigateToMaster(oData);
                 this.byId("SplitAppDemo").toDetail(this.createId("detail"));
                 this.remoteDetailwrite(oEvent,"qwe");
                } else {
            this.byId("SplitAppDemo").toDetail(this.createId(oData.link)); 
             }
        },

        //создание второго уровня меню
        onMenuItemPress2: function (oEvent) {
            var oData = oEvent.getSource().getBindingContext("myModel").getObject();
            var sPath = oEvent.getSource().getBindingContext("myModel").getPath();
            var sChild = oData.child;
            var oList_types = this.getView().byId("typeList");
            var oTemplate = oList_types.getBindingInfo("items").template;
            oList_types.bindItems("myModel>" + sPath + "/" + sChild, oTemplate);
            this.navigateToMaster(oData);
            this.filterCategories(oData.cat_num);
        },
        //создание третьего уровня меню
        onMenuItemPress3: function (oEvent) {
            var oData = oEvent.getSource().getBindingContext("myModel").getObject();
            this.byId("SplitAppDemo").toMaster(this.createId("articles"));
            this.filterArticles(oData.type_num);//master
            this.filterTypes(oData.type_num);//detail
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
        },
        //переход из мастера в детальный вид артикула
        navigateToMaster: function (oData) {
            if (oData.link) {
                if (oData.master_option) {
                    this.byId("SplitAppDemo").toMaster(this.createId(oData.link));
                }
            } else {
                MessageToast.show("нет линка!");
            }
        },
        menuItemType: function (bType) {
            return bType ? "Navigation" : "Active";
        },
        //Фильтр для категорий (Второй уровень)(detail)
        filterCategories: function (sCatNum) {

            // build filter array
            var aFilter = [];
            if (sCatNum) {
                aFilter.push(new Filter("cat_num", FilterOperator.EQ, sCatNum));
            }

            // filter binding
            var oList = this.byId("articlesPage");
            var oBinding = oList.getBinding("content");
            oBinding.filter(aFilter);
        },   
        //Фильтр для артикулов (detail)
        filterTypes: function (sTypeNum) {

            // build filter array
            var aFilter = [];
            if (sTypeNum) {
                aFilter.push(new Filter("type_num", FilterOperator.EQ, sTypeNum));
            }

            // filter binding
            var oList = this.byId("articlesPage");
            var oBinding = oList.getBinding("content");
            oBinding.filter(aFilter);
        },     
        //Фильтр для артикулов (master)
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
        }
    });


    return CController;

});