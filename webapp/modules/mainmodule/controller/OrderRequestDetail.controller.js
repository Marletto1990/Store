sap.ui.define([
	"app/modules/mainmodule/controller/BaseController",
	"sap/m/MessageBox",
	"sap/m/MessageToast"

], function (BaseController,MessageBox,MessageToast) {
	"use strict";
	return BaseController.extend("app.modules.mainmodule.controller.OrderRequestDetail", {
		onInit: function () {
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