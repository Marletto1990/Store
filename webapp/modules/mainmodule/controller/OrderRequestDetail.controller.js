sap.ui.define([
	"app/modules/mainmodule/controller/BaseController",
	"sap/m/MessageBox",
	"sap/m/MessageToast"

], function (BaseController,MessageBox,MessageToast) {
	"use strict";
	return BaseController.extend("app.modules.mainmodule.controller.OrderRequestDetail", {
		onInit: function () {
			var oRouter = this.getRouter();
			oRouter.getRoute("order_request").attachMatched(this.callCount, this);
		},
		callCount: function(){
			var oCart = this.getView().getModel("myModel").getProperty("/Cart");
			var nCartDataCost = 0;
			oCart.forEach( function(item, i, arr){
				var nItemPrice = this.getView().getModel("myModel").getProperty("/Cart/"+i+"/article_price");
				var nQMaterial = this.getView().getModel("myModel").getProperty("/Cart/"+i+"/qMaterial");

				this.getView().getModel("myModel").setProperty("/Cart/"+i+"/countedPrice", Math.round(nItemPrice*nQMaterial,0));
					nCartDataCost = nCartDataCost + item.countedPrice;					
			}.bind(this))

			this.getView().getModel("myModel").setProperty("/CartData/cost", nCartDataCost);
		},
		onFire: function(oEvent) {
			MessageBox.confirm(
				"Отправить заявку?", {
					actions: [MessageBox.Action.YES, MessageBox.Action.NO],
					onClose: function(oAction) { 
						if (oAction=="YES"){
							
							//var oStore = jQuery.sap.storage(jQuery.sap.storage.Type.local);
							//var oCart = this.getView().getModel("myModel").getProperty("/Cart");
							//oStore.put("id", oCart);

							MessageToast.show("Заявка отправлена. Мы свяжемся с Вами в ближайшее время");

						} else { console.log("Отмена")}
					 }
				}
			);
		},
	});
});