sap.ui.define([
	'sap/apf/core/constants',
	'sap/m/MessageBox'
], function(Constants) {
	'use strict';

	// jQuery.sap.require("sap.m.MessageBox");
	function messageCallbackForStartup(messageObject) {
		function closeApplication() {
			window.history.go(-1);
		}
		function createMessageText(messageObject) {
			var text = messageObject.getMessage();
			while (messageObject.getPrevious()) {
				messageObject = messageObject.getPrevious();
				text = text + '\n' + messageObject.getMessage();
			}
			return text;
		}
		function openDetailedLogDialog() {
			var oDetailLogDialog = new sap.m.Dialog({
				title : "Error",
				type : sap.m.DialogType.Message,
				state : sap.ui.core.ValueState.Error,
				content : new sap.ui.core.HTML({
					content : [ '<div><p> ' + jQuery.sap.encodeHTML(createMessageText(messageObject)) + '</p></div>' ].join(""),
					sanitizeContent : true
				}),
				beginButton : new sap.m.Button({
					text : "Close", //This text has to be a translated text
					press : function() {
						oDetailLogDialog.close();
					}
				}),
				afterClose : function() {
					oDetailLogDialog.destroy();
				}
			});
			oDetailLogDialog.setInitialFocus(oDetailLogDialog);
			oDetailLogDialog.open();
		}
		var oDialog = new sap.m.Dialog({
			title : "Error",
			type : sap.m.DialogType.Message,
			state : sap.ui.core.ValueState.Error,
			content : [ new sap.m.Text({
				text : messageObject.getMessage()
			}), new sap.m.VBox({
				alignItems : sap.m.FlexAlignItems.End,
				items : [ new sap.m.Link({
					text : "Show Details", //This text should be a translated text
					press : function() {
						openDetailedLogDialog();
					}
				}) ]
			}) ],
			beginButton : new sap.m.Button({
				text : "Close", //This text has to be a translated text
				press : function() {
					if (messageObject.getSeverity() === Constants.message.severity.fatal) {
						closeApplication();
					}
				}
			}),
			afterClose : function() {
				oDialog.destroy();
			}
		});
		oDialog.setInitialFocus(oDialog);
		oDialog.open();
	}

	sap.apf.messageCallbackForStartup = messageCallbackForStartup;
	return messageCallbackForStartup;
}, true /*GLOBAL_EXPORT*/);
