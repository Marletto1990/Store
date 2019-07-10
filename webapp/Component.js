sap.ui.define([
		'sap/ui/core/UIComponent',
		"sap/ui/model/json/JSONModel",
		"sap/ui/Device"
	],
	function (UIComponent, JSONModel, Device) {
		"use strict";

		var Component = UIComponent.extend("app.Component", {

			metadata: {
				manifest: "json"
			},

			init: function () {
				// call the base component's init function
				UIComponent.prototype.init.apply(this, arguments);
				this.getRouter().initialize();
				/*var oModel = new sap.ui.model.json.JSONModel();
            	oModel.loadData("modules/mainmodule/models/goods.json");
				this.setModel(oModel,"myModel");*/
				var oModel = this.getModel("myModel");
				var that = this;
				var fModelDataLoad = function () {
					let request = new XMLHttpRequest();
					request.open("GET", "/getModelData");
					request.send();
					request.onreadystatechange = function () {
						if (this.readyState != 4) return;
						if (this.status != 200) {
							console.log('ошибка: ' + (this.status ? this.statusText : 'запрос не удался'));
							return;
						} else {
							try {
								var sReqJSON = request.responseText;
								var oResModel = JSON.parse(sReqJSON);
								console.log(typeof oResModel);
							} catch (err) {
								alert("Некорректный ответ " + err.message);
							}
							fModelDataSet(oResModel);
						}
					}
				};
				
				var fModelDataLoadNext = function (oData) {
					var oLoadedModel = this.getModel("myModel");
					var aArticles = oLoadedModel.getProperty("/Articles");
					var aArticles2 = [];
					aArticles.forEach(function (item) {
						aArticles2.push(item);
					})

					function shuffle(o) {
						for (var j, x, k = o.length; k; j = Math.floor(Math.random() * k), x = o[--k], o[k] = o[j], o[j] = x);
						return o;
					}
					shuffle(aArticles2);
					var aRandomArticles = [];
					for (var i = 0; i < 4; i++) {
						aRandomArticles.push(aArticles2[i])
					}
					oLoadedModel.setProperty("/RandomArticles", aRandomArticles);
				}.bind(this)

				var fModelDataSet = function(data){
					that.getModel("myModel").setData(data);
					fModelDataLoadNext();
				};
				fModelDataLoad();
			}

		});

		return Component;

	});