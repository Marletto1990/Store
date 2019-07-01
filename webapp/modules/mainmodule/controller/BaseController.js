sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	'sap/m/MessageToast',
	'sap/ui/model/Filter',
	"sap/ui/model/FilterOperator"
], function (Controller, History, UIComponent, MessageToast, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("app.modules.mainmodule.controller.BaseController", {
		onAfterRendering: function () {},
		getRouter: function () {
			return UIComponent.getRouterFor(this);
		},
		goToStart: function () {
			this.getRouter().navTo("start");
		},
		onNavBack: function () {
			var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("start", {}, true /*no history*/ );
			}
		},
		_onBaseRouteMatched: function (oEvent, oParameters) {
			var bCatalog = oParameters.catalog;
			var sCategoryName = oParameters.category;
			var sTypeName = oParameters.type;
			var oList = this.getView().byId(oParameters.listId);
			var oTemplate = oList.getBindingInfo(oParameters.aggregationName).template;
			var sModel = oList.getBindingInfo(oParameters.aggregationName).model;
			if (sTypeName) {
				var i = oList.getModel(sModel).getProperty("/Categories").findIndex(function (element) {
					return element.name == sCategoryName;
				});
				var j = oList.getModel(sModel).getProperty("/Categories/" + i + "/type").findIndex(function (element) {
					return element.name == sTypeName;
				});
				var sPath = sModel + ">/Categories/" + i + "/type/" + j;
				oList.bindAggregation(oParameters.aggregationName, sPath, oTemplate);

			} else if (sCategoryName) {
				var i = oList.getModel(sModel).getProperty("/Categories").findIndex(function (element) {
					return element.name == sCategoryName;
				});
				var sPath = sModel + ">/Categories/" + i + "/type";
				oList.bindAggregation(oParameters.aggregationName, sPath, oTemplate);
			} else {
				var sPath = sModel + ">/Categories/";
				oList.bindAggregation(oParameters.aggregationName, sPath, oTemplate);
			}
		},
		_showFilterArticles: function (oEvent, oParameters) {
			var sCategoryName = oParameters.category;
			var oFilters = {};
			if (sCategoryName) {
				var sTypeName = oParameters.type;
				var oList = this.getView().byId(oParameters.listId);
				var sModel = oList.getBindingInfo(oParameters.aggregationName).model;
				var oCtg = oList.getModel(sModel).getProperty("/Categories").find(function (element) {
					return element.name == sCategoryName;
				});
				var nCategoryID = oCtg.cat_num;
				oFilters = {
					"cat_num": nCategoryID
				}
				if (sTypeName) {
					var oTp = oCtg.type.find(function (element) {
						return element.name == sTypeName;
					});
					oFilters.type_num = oTp.type_num;
				}
			}
			this.superFilter(oFilters);
		},
		setArticlesHeaderPath: function () {
			var sCategoryName = this.getView().getModel("myModel").getProperty("/");
			console.log(sCategoryName);

			function setPath(a, b) {
				if (a) {
					return a;
				} else if (b) {
					return b;
				} else {
					return "Каталог";
				}
			}
			this.getView().getModel("myModel").setProperty("/Remote/path", setPath(sTypeName, sCategoryName));

		},
		superFilter: function (oFilters) {
			var aFilter = [];
			for (var key in oFilters) {
				aFilter.push(new Filter(key, FilterOperator.EQ, oFilters[key]));
			}

			// filter binding
			var oList = this.getView().byId("articlesContainer");
			var oBinding = oList.getBinding("content");
			oBinding.filter(aFilter);
		},
		//Navigation Panel
		setBreadcrumbs: function (oEvent, oModel, oParams) {
			setTimeout(function () {
				oModel.setProperty("/Remote_current/title", "");
				oModel.setProperty("/Remote/title", {});

				var aRemote = [{
					"title": "Главная",
					"path": "Main",
					"route": "start"
				}];
				var aRemoteObject1 = {
					"title": "Каталог",
					"path": "Catalog",
					"route": "categories"
				};
				var aRemoteObject2 = {
					"title": oParams.category,
					"path": "Category",
					"route": "types"
				};
				var aRemoteObject3 = {
					"title": oParams.type,
					"path": "Type",
					"route": "articles"
				};
				if ((oParams.menuItem != "catalog") && (!oParams.category) && (!oParams.type) && (!oParams.article)) {
					oModel.setProperty("/Remote", {});
					oModel.setProperty("/Remote_current/title", "Главная");
				} else if ((oParams.menuItem == "catalog") && (!oParams.category) && (!oParams.type) && (!oParams.article)) {
					oModel.setProperty("/Remote", aRemote);
					oModel.setProperty("/Remote_current/title", "Каталог");
				} else if ((oParams.menuItem == "catalog") && (oParams.category) && (!oParams.type) && (!oParams.article)) {
					var oCategory = oModel.getProperty("/Categories").find(function (element) {
						return element.name == oParams.category;
					});
					aRemote.push(aRemoteObject1);
					oModel.setProperty("/Remote", aRemote);
					oModel.setProperty("/Remote_current/title", oCategory.title);
				} else if ((oParams.menuItem == "catalog") && (oParams.category) && (oParams.type) && (!oParams.article)) {
					var oCategory = oModel.getProperty("/Categories").find(function (element) {
						return element.name == oParams.category;
					});
					var i = oModel.getProperty("/Categories").findIndex(function (element) {
						return element.name == oParams.category;
					})
					var oType = oModel.getProperty("/Categories/" + i + "/type").find(function (element) {
						return element.name == oParams.type;
					});
					aRemoteObject2.title = oCategory.title;
					aRemote.push(aRemoteObject1);
					aRemote.push(aRemoteObject2);
					oModel.setProperty("/Remote", aRemote);
					oModel.setProperty("/Remote_current/title", oType.title);
				} else if ((oParams.menuItem == "catalog") && (oParams.category) && (oParams.type) && (oParams.article)) {
					var oCategory = oModel.getProperty("/Categories").find(function (element) {
						return element.name == oParams.category;
					});
					var i = oModel.getProperty("/Categories").findIndex(function (element) {
						return element.name == oParams.category;
					})
					var oType = oModel.getProperty("/Categories/" + i + "/type").find(function (element) {
						return element.name == oParams.type;
					});
					aRemoteObject2.title = oCategory.title;
					aRemoteObject3.title = oType.title;
					aRemote.push(aRemoteObject1);
					aRemote.push(aRemoteObject2);
					aRemote.push(aRemoteObject3);
					oModel.setProperty("/Remote", aRemote);
					oModel.setProperty("/Remote_current/title", "Артикул " + oParams.article);

				}

			}.bind(this), 0);

		},
		onBreadcrumbsPress: function (oEvent) {
			var sRout = oEvent.getSource().getBindingContext("myModel").getObject().route;
			var oCtgName = sap.ui.core.UIComponent.getRouterFor(this)._oRouter._prevRoutes[0].params[0];
			var oTpName = sap.ui.core.UIComponent.getRouterFor(this)._oRouter._prevRoutes[0].params[1];
			var sArticleName;
			if (sArticleName) {
				this.getRouter().navTo(sRout, {
					category: oCtgName,
					type: oTpName,
					article: sArticleName
				});
			} else if (oTpName) {
				this.getRouter().navTo(sRout, {
					category: oCtgName,
					type: oTpName
				});
			} else if (oCtgName) {
				this.getRouter().navTo(sRout, {
					category: oCtgName
				});
			} else {
				this.getRouter().navTo(sRout)
			}
		},
		formatter_isCartNotEmpty_blocked: function (oCart) {
			return oCart ? false : true;
		},
		formatter_isCartNotEmpty_type: function (oCart) {
			return oCart ? "Accept" : "Default";
		},
		formatter_is_visible_addButton: function (Path) {
			return Path.isButtonAddVisible ? true : false;
		},
		formatter_is_visible_deleteButton: function (Path) {
			return Path.isButtonDeleteVisible ? true : false;
		},
		toCartPopover: function (oEvent) {
			if (!this._oPopover) {
				this._oPopover = sap.ui.xmlfragment("mainpath.fragment.cart", this);
				//this._oPopover.bindElement("/Cart");
				this.getView().addDependent(this._oPopover);
			}
			this._oPopover.openBy(oEvent.getSource());
		},
		onCartItemPress: function (oEvent) {
			var artName = oEvent.getSource().getProperty("title");
			var oData = this.getView().getModel("myModel").getProperty("/Articles");
			var aCategory = this.getView().getModel("myModel").getProperty("/Categories");
			var target = oData.find(function (element) {
				return element.article_name == artName;
			})
			var sCategory = aCategory.find(function (element) {
				return element.cat_num == target.cat_num
			})
			var i = aCategory.findIndex(function (element) {
				return element.cat_num == target.cat_num
			})
			var aType = this.getView().getModel("myModel").getProperty("/Categories/" + i + "/type");
			var sType = aType.find(function (element) {
				return element.type_num = target.type_num
			})

			this.getRouter().navTo("article", {
				menuItem: "catalog",
				category: sCategory.name,
				type: sType.name,
				article: target.article_num
			})
			this.getView().getModel("myModel").setProperty("/ArticleCurrent", target);


		},
		deleteFromCart: function (oEvent) {
			var itemForDelete = oEvent.getSource().getBindingContext("myModel").getPath().split("").reverse()[0];
			var aCart = this.getView().getModel("myModel").getProperty("/Cart");
			aCart.splice(+itemForDelete, 1);
			this.getView().getModel("myModel").setProperty("/Cart", aCart);

			var oEventBus = sap.ui.getCore().getEventBus();
			oEventBus.publish("checkCartMatches"); // <----

		},
		clearCart: function () {
			this.getView().getModel("myModel").setProperty("/Cart", []);
			this.getView().getModel("myModel").setProperty("/ArticleViewInfo/isButtonAddVisible", true);
			this.getView().getModel("myModel").setProperty("/ArticleViewInfo/isButtonDeleteVisible", false);
		},
		toOptionsPopover: function (oEvent) {
			if (!this._oPopover2) {
				this._oPopover2 = sap.ui.xmlfragment("mainpath.fragment.options", this);
				//this._oPopover.bindElement("/Cart");
				this.getView().addDependent(this._oPopover2);
			}
			this._oPopover2.openBy(oEvent.getSource());
		},
		toSortingPopover: function (oEvent) {
			if (!this._oPopover3) {
				this._oPopover3 = sap.ui.xmlfragment("mainpath.fragment.sorting", this);
				//this._oPopover.bindElement("/Cart");
				this.getView().addDependent(this._oPopover2);
			}
			this._oPopover3.openBy(oEvent.getSource());
		},
		toOrderRequest: function () {
			this.getRouter().navTo("order_request");
		},
		formatter_count_cost: function (price, quantity, material) {
			if (price && quantity && material) {
				return price * quantity * material;
			}
			return "Ошибка";
		},
		formatter_count_price: function (price, material) {
			if (price && quantity && material) {
				return price * material;
			}
			return "Ошибка";
		},
		incr_quantity: function (oEvent) {
			var sPath = oEvent.getSource().getBindingContext("myModel").getPath();
			var nQ = this.getView().getModel("myModel").getProperty(sPath + "/quantity");

			var sPath = oEvent.getSource().getParent().getBindingContext("myModel").getPath();


			this.getView().getModel("myModel").setProperty(sPath + "/quantity", +Math.round(nQ,0) + 1);
			this.countCartCost( "plus", sPath );
		},
		decr_quantity: function (oEvent) {
			var sPath = oEvent.getSource().getBindingContext("myModel").getPath();
			var nQ = this.getView().getModel("myModel").getProperty(sPath + "/quantity");

			var sPath = oEvent.getSource().getParent().getBindingContext("myModel").getPath();


			if (+Math.round(nQ,0) - 1 >= 0) {
				this.getView().getModel("myModel").setProperty(sPath + "/quantity", +Math.round(nQ,0) - 1);
				this.countCartCost("minus", sPath);
			}
		},
		countCartCost: function( operation, sPath ){
			var nItemPrice = this.getView().getModel("myModel").getProperty(sPath+"/article_price");
			var nQMaterial = this.getView().getModel("myModel").getProperty(sPath+"/qMaterial");
			var nQuantity = this.getView().getModel("myModel").getProperty(sPath+"/quantity");

			this.getView().getModel("myModel").setProperty(sPath+"/countedPrice", Math.round(nItemPrice*nQMaterial,0));
			this.getView().getModel("myModel").setProperty(sPath+"/cost", Math.round(nItemPrice*nQMaterial*nQuantity,0));

			var oCartDataCost = Number(this.getView().getModel("myModel").getProperty("/CartData/cost"));
			var aCart = this.getView().getModel("myModel").getProperty("/Cart");

			if(operation =="minus"){
				oCartDataCost = oCartDataCost-(this.getView().getModel("myModel").getProperty(sPath+"/countedPrice"));
			this.getView().getModel("myModel").setProperty("/CartData/cost",oCartDataCost);
			} else {
				oCartDataCost = oCartDataCost+(this.getView().getModel("myModel").getProperty(sPath+"/countedPrice"));
			this.getView().getModel("myModel").setProperty("/CartData/cost",oCartDataCost);

			}
		
		},
		formatter_quantity: function(stock){
			if (stock != 0){
				return "На складе " + stock + " шт"
			} else { return "Под заказ"}
		},
		formatter_color: function(stock){
			if (stock != 0){
				return 7;
			} else { return 1;} 
		} 
		
	});

});