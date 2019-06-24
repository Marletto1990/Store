sap.ui.define([
	"app/modules/mainmodule/controller/BaseController"

], function (BaseController) {
	"use strict";
	return BaseController.extend("app.modules.mainmodule.controller.OrderRequestMaster", {
		onInit: function () {
			var oRouter = this.getRouter();
			oRouter.getRoute("order_request").attachMatched(this.makeAmericaGreatAgain, this);
			
		},
		makeAmericaGreatAgain: function(){
			var oEventBus = sap.ui.getCore().getEventBus();
			oEventBus.publish("hideMaster"); 
		}
	});
});