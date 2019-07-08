/*!
 * SAP APF Analysis Path Framework
 * 
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.apf.modeler.core.messageDefinition");
sap.apf.modeler.core.messageDefinition = [ {
	code : "11005",
	severity : "technError",
	text : "Bad HTTP request returned status code {0} with status text {1}."
}, {
	code : "11006",
	severity : "technError",
	text : "Unknown identifier: {0}"
}, {
	code : "11007",
	severity : "technError",
	text : "Cannot export unsaved configuration. Configuration ID: {0}"
},  {
	code : "11013",
	severity : "technError",
	text : "Metadata request {0} to server failed."
},  {
	code : "11016",
	severity : "error",
	description : "Sorting options must be supplied when setting top n",
	key : "11016"
}, {
	code : "11020",
	severity : "error",
	description : "Text property has invalid format and cannot be imported - see previous messages for details",
	key : "11020"
}, {
	code : "11021",
	severity : "error",
	description : "ApfApplicationId {0} referenced in the text property is not yet existing - please load one configuration of the application before importing the texts.",
	key : "11021"
}, {
	code : "11030",
	severity : "error",
	description : "Label {0} is not valid",
	key : "11030"
}, {
	code : "11031",
	severity : "error",
	description : "Category {0} is not valid",
	key : "11031"
}, {
	code : "11032",
	severity : "error",
	description : "Request {0} is not valid",
	key : "11032"
}, {
	code : "11033",
	severity : "error",
	description : "Binding {0} is not valid",
	key : "11033"
}, {
	code : "11034",
	severity : "error",
	description : "Facet filter {0} is not valid",
	key : "11034"
}, {
	code : "11035",
	severity : "error",
	description : "Step {0} is not valid",
	key : "11035"
}, {
	code : "11036",
	severity : "error",
	description : "Configuration is not valid",
	key : "11036"
}, {
	code : "11037",
	severity : "error",
	description : "Invalid application guid {0}",
	key : "11037"
}, {
	code : "11038",
	severity : "error",
	description : "Invalid configuration guid {0}",
	key : "11038"
}, {
	code : "11039",
	severity : "error",
	description : "Invalid text guid {0}",
	key : "11039"
}, {
	code : "11040",
	severity : "error",
	description : "Navigation target {0} is not valid",
	key : "11040"
}, {
	code : "11041",
	severity : "technError",
	text : "Network service for retrieving semantic objects failed - see console."
}, {
	code : "11042",
	severity : "technError",
	text : "Error occurred when retrieving actions for semantic object - see console."
}, {
	code : "11500",
	severity : "error",
	description : "An error occurred while attempting to save the application.",
	key : "11500"
}, {
	code : "11501",
	severity : "error",
	description : "An error occurred while attempting to delete the application.",
	key : "11501"
}, {
	code : "11502",
	severity : "error",
	description : "An error occurred while importing the configuration.",
	key : "11502"
}, {
	code : "11503",
	severity : "error",
	description : "An error occurred while importing the text properties file.",
	key : "11503"
}, {
	code : "11504",
	severity : "technError",
	description : "An error occurred while retrieving the semantic objects available.",
	key : "11504"
}, {
	code : "11505",
	severity : "technError",
	description : "An error occurred while retrieving the actions for the given semantic object.",
	key : "11505"
}, {
	code : "11506",
	severity : "error",
	description : "An error occurred while getting the unused texts.",
	key : "11506"
}, {
	code : "11507",
	severity : "error",
	description : "An error occurred while doing the text pool cleanup.",
	key : "11507"
}, {
	code : "11508",
	severity : "fatal",
	description : "The app has stopped working due to a technical error.",
	key : "11508"
}, {
	code : "11509",
	severity : "fatal",
	description : "OData service is not available. You cannot create a new application or change existing ones.",
	key : "11509"
}, {
	code : "11510",
	severity : "success",
	description : "Application has been deleted.",
	key : "11510"
}, {
	code : "11511",
	severity : "success",
	description : "Cleanup of text pool completed.",
	key : "11511"
}, {
	code : "11512",
	severity : "success",
	description : "Application has been saved.",
	key : "11512"
}, {
	code : "11513",
	severity : "success",
	description : "Configuration is saved.",
	key : "11513"
}, {
	code : "11514",
	severity : "error",
	description : "Error in saving the configuration.",
	key : "11514"
}, {
	code : "11515",
	severity : "success",
	description : "Configuration file imported.",
	key : "11515"
}, {
	code : "11516",
	severity : "success",
	description : "Text properties file imported",
	key : "11516"
}, {
	code : "11517",
	severity : "success",
	description : "Incorrect extension used for configuration file. Please use .json format.",
	key : "11517"
}, {
	code : "11518",
	severity : "success",
	description : "Incorrect extension used for text properties file. Please use .properties format.",
	key : "11518"
}, {
	code : "11519",
	severity : "success",
	description : "The configuration file cannot be imported because of an error while reading the file. See the previous messages for details.",
	key : "11519"
}, {
	code : "11520",
	severity : "success",
	description : "The application you referenced does not yet exist. You must also upload a configuration file.",
	key : "11520"
}, {
	code : "11521",
	severity : "success",
	description : "The configuration file and text properties file do not belong to the same application. The text properties file cannot be imported.",
	key : "11521"
}, {
	code : "11522",
	severity : "success",
	description : "The text properties file cannot be imported because of an error while reading the file. See the previous messages for details.",
	key : "11522"
}, {
	code : "11523",
	severity : "information",
	description : "Sorting field in section ‘Data Reduction’ has been changed. Please check and adjust if necessary.",
	key : "11523"
},{
	code : "11524",
	severity : "technError",
	text : "The entity type {0} in smart filter bar configuration is not valid - please check service"
}
];