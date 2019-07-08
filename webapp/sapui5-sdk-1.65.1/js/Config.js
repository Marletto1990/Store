window["sap-ui-demokit-config"] = {

	productName : "SAPUI5",

	supportedThemes : undefined, /* default themes */

	onCreateContent : function (oDemokit) {

		oDemokit.addIndex("customize", {
			caption : "Customize",
			visible : false,
			index : {
				ref: "customize.html",
				links : [
					{text: "Customize", ref:"customize.html"}
				]
			}
		});

	}

};
