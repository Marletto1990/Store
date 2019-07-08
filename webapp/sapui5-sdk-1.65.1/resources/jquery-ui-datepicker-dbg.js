(function(jQuery){

	var MESSAGE = "The file jquery-ui-datepicker.js has been moved to sap.ui.thirdparty.jqueryui! Please update the dependencies accordingly.";

	if(jQuery && jQuery.sap && jQuery.sap.require){
		jQuery.sap.require("sap.ui.thirdparty.jqueryui.jquery-ui-datepicker");
		jQuery.sap.log.warning(MESSAGE);
	}else{
		throw new Error(MESSAGE);
	}

})(window.jQuery);