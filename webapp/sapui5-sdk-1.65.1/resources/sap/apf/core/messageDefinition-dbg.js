/*!
 * SAP APF Analysis Path Framework
 * 
 * (c) Copyright 2012-2018 SAP AG. All rights reserved
 */

sap.ui.define(function() {
	var messageDefinition = [
		{
			code: "3001",
			severity: "technError",
			text: "Text is not available for the following key: {0}"
		}, {
			code: "5001",
			severity: "fatal",
			text: "Request {3} to server failed with http status code {0}, http error message {1}, and server response {2}.",
			key: "5001"
		}, {
			code: "5002",
			severity: "error",
			description: "Error in OData request; update of analysis step {0} failed.",
			key: "5002"
		}, {
			code: "5004",
			severity: "fatal",
			description: "Request with ID {0} does not exist in the analytical content configuration.",
			key: "5004"
		}, {
			code: "5005",
			severity: "technError",
			text: "Required property {1} is missing in the filter of the OData request for entity type {0}."
		}, {
			code: "5006",
			severity: "technError",
			text: "Inconsistency in data model; non-filterable property {1} is set as required filter for entity type {0}."
		}, {
			code: "5015",
			severity: "fatal",
			description: "Service for request {0} is not defined in the analytical content configuration.",
			key: "5015"
		}, {
			code: "5016",
			severity: "technError",
			text: "Mandatory parameter key property {0} is missing in filter."
		}, {
			code: "5018",
			severity: "fatal",
			description: "Metadata request {0} failed.",
			key: "5018"
		}, {
			code: "5019",
			severity: "technError",
			text: "System query option $orderby for property {1} removed from OData request for entity type {0}."
		}, {
			code: "5020",
			severity: "fatal",
			description: "Analytical content configuration is not available.",
			key: "5020"
		}, {
			code: "5021",
			severity: "error",
			description: "Error during server request; session timeout occurred.",
			key: "5021"
		}, {
			code: "5022",
			severity: "fatal",
			description: "Analytical configuration with ID {0} is not available.",
			key: "5022"
		}, {
			code: "5023",
			severity: "fatal",
			description: "Texts could not be loaded for Analytical configuration with ID {0}.",
			key: "5023"
		}, {
			code: "5024",
			severity: "fatal",
			description: "URL Parameter for Analytical Configuration ID must contain the ID of the application and the ID of the Analytical configuration seperated by a dot.",
			key: "5024"
		}, {
			code: "5025",
			severity: "fatal",
			description: "Value for SAP client has not been provided at startup of the application.",
			key: "5025"
		}, {
			code: "5026",
			severity: "fatal",
			description: "Logical system cannot be determined for SAP client {0}. ",
			key: "5026"
		}, {
			code: "5027",
			severity: "technError",
			text: "Inconsistent parameters; analysis path cannot be saved. Path ID: {0}, path name: {1}, callback function {2}"
		}, {
			code: "5028",
			severity: "technError",
			text: "Binding with ID {0} contains a representation without ID."
		}, {
			code: "5029",
			severity: "technError",
			text: "Binding with ID {0} contains a duplicated representation ID."
		}, {
			code: "5030",
			severity: "technError",
			text: "Constructor property of representation type ID {0} does not contain a module path to a valid function."
		}, {
			code: "5031",
			severity: "technError",
			text: "Argument for method 'setApplicationMessageCallback' is not a function."
		}, {
			code: "5032",
			severity: "technError",
			text: "System query option {1} unknown in request for entity type {0}."
		}, {
			code: "5033",
			severity: "technError",
			text: "Unsupported type {0} in configuration object provided."
		}, {
			code: "5034",
			severity: "technError",
			text: "Facet filter configuration attribute 'property' missing."
		}, {
			code: "5035",
			severity: "technError",
			text: "Function module path contained in property preselectionFuntion of facet filter ID {0} does not contain a valid function."
		}, {
			code: "5036",
			severity: "technError",
			text: "Start parameter step id {0} is not existing."
		}, {
			code: "5037",
			severity: "technError",
			text: "Start parameter representation id {0} is not existing."
		}, {
			code: "5038",
			severity: "technError",
			text: "Environment for sap.ushell.Container is not existing."
		}, {
			code: "5039",
			severity: "technError",
			text: "Error while pushing content to the ushell container"
		}, {
			code: "5040",
			severity: "technError",
			text: "Error while fetching content from the ushell container"
		}, {
			code: "5041",
			severity: "error",
			description: "Metadata document {0} is inconsistent. It contains no entity sets.",
			key: "5041"
		}, {
			code: "5042",
			severity: "error",
			description: "Exception occurred: {0}",
			key: "5042"
		}, {
			code: "5043",
			severity: "fatal",
			description: "Server error {1} occurred when trying to read the Smart Business Evaluation Id {0}.",
			key: "5043"
		}, {
			code: "5044",
			severity: "fatal",
			description: "Smart Business Evaluation Id {0} could not be evaluated, because the entry for DataSource SmartBusiness is missing in the manifest of the component.",
			key: "5044"
		}, {
			code: "5045",
			severity: "fatal",
			description: "There occurred an error when trying to resolve the X-AppState with ID {0}. See log in console.",
			key: "5045"
		}, {
			code: "5046",
			severity: "fatal",
			description: "The selection variant in X-AppState with ID {0} contains invalid parameter object. The parameter name is missing.",
			key: "5046"
		}, {
			code: "5047",
			severity: "fatal",
			description: "The selection variant in X-AppState with ID {0} contains invalid parameter object with name {1}. The parameter value is missing.",
			key: "5047"
		}, {
			code: "5048",
			severity: "fatal",
			description: "The selection variant in X-AppState with ID {0} contains invalid selection. The property name is missing.",
			key: "5048"
		}, {
			code: "5049",
			severity: "fatal",
			description: "The selection variant in X-AppState with ID {0} for property {1} contains invalid selection. The range definition is invalid.",
			key: "5049"
		}, {
			code: "5050",
			severity: "fatal",
			description: "The selection variant in X-AppState with ID {0} for property {1} contains invalid range. The sign must be I.",
			key: "5050"
		}, {
			code: "5051",
			severity: "fatal",
			description: "The selection variant in X-AppState with ID {0} for property {1} contains invalid range. The option BT requires a high value.",
			key: "5051"
		}, {
			code: "5052",
			severity: "fatal",
			description: "Service {0} for SmartFilterBar not available.",
			key: "5052"
		}, {
			code: "5053",
			severity: "fatal",
			description: "Initialization of SmartFilterBar failed, for example, because the entity type {0} doesn't exist in service {1} .",
			key: "5053"
		}, {
			code: "5054",
			severity: "fatal",
			description: "Server problem occurred when loading application configuration file from {0}."
		}, {
			code: "5055",
			severity: "fatal",
			description: "The application configuration from url path {0} has no valid format."
		}, {
			code: "5056",
			severity: "fatal",
			description: "The text resource locations are missing in the application configuration from {0}."
		},
		{
			code: "5057",
			severity: "fatal",
			description: "Error when loading the analytical configuration from {0}."
		},
		{
			code: "5058",
			severity: "fatal",
			description: "Server error {0} when loading the application message configuration from url path {2}: {1}."
		},
		{
			code: "5059",
			severity: "fatal",
			description: "The url path {0} for the resource location {1} is not valid."
		},
		{
			code: "5060",
			severity: "fatal",
			description: "No analytical configuration defined either in the application configuration or the data source AnalyticalConfigurationLocation is missing in the manifest."
		},
		{
			code: "5061",
			severity: "fatal",
			description: "EntityType of the smart business service definition is missing in the application configuration file."
		},
		{
			code: "5062",
			severity: "fatal",
			description: "The type in Smart Business configuration is either missing or not smartBusinessRequest."
		},
		{
			code: "5063",
			severity: "fatal",
			description: "The service in the Smart Business service configuration is missing."
		},
		{
			code: "5064",
			severity: "fatal",
			description: "The data source definition for path persistence, that has to be declared  with name PathPersistenceServiceRoot, is missing in the manifest."
		},
		{
			code: "5065",
			severity: "fatal",
			description: "The data source definition for analytical configuration, that has to be declared  with name PathPersistenceServiceRoot, is either missing in the manifest or incomplete."
		},
		{
			code: "5066",
			severity: "fatal",
			description: "The persistence path configuration is missing in the application configuration."
		},
		{
			code: "5067",
			severity: "fatal",
			description: "The service of the persistence path configuration is missing in the application configuration."
		},
		{
			code: "5068",
			severity: "fatal",
			description: "Server problem {1} occurred when loading application configuration file from {0}: {2}"
		},
		{
			code: "5069",
			severity: "fatal",
			description: "The selection variant in X-AppState with ID {0} for property {1} contains invalid option. The option CP may not contain more than two wildcards.",
			key: "5069"
		},
		{
			code: "5070",
			severity: "error",
			description: "Javascript exception was caught: {0}",
			key: "5070"
		},
		{
			code: "5071",
			severity: "error",
			description: "Exception happened during processing of error by message callback function: {0}",
			key: "5071"
		},
		{
			code: "5072",
			severity: "fatal",
			description: "Entity set {0} for hierarchical service {1} not available",
			key: "5072"
		},
		{
			code: "5073",
			severity: "fatal",
			description: "Hierarchical property {2} in entity set {0} for hierarchical service {1} has no hierarchical annotations",
			key: "5073"
		}, {
			code: "5074",
			severity: "technError",
			text: "UShell service for navigation targets does not exist in the current runtime, so no navigation to other applications is possible"
		},
		{
			code: "5075",
			severity: "error",
			description: "URL Parameter for Analytical Configuration ID must be supplied when reading, loading or storing analysis paths.",
			key: "5075"
		},
		{
			code: "5100",
			severity: "fatal",
			description: "Unexpected internal error: {0}. Contact SAP.",
			key: "5100"
		}, {
			code: "5101",
			severity: "technError",
			text: "Unexpected internal error: {0}. Contact SAP."
		}, {
			code: "5102",
			severity: "fatal",
			description: "Wrong definition in analytical content configuration: {0}",
			key: "5102"
		}, {
			code: "5103",
			severity: "technError",
			text: "Wrong definition in analytical content configuration: {0}"
		}, {
			code: "5104",
			severity: "technError",
			text: "Wrong filter mapping definition in analytical content configuration"
		}, {
			code : "5105",
			severity : "technError",
			text : "XSRF Token could not be fetched from the application router"
		}, {
			code: "5200",
			severity: "technError",
			text: "Server error during processing of path: {0} {1}"
		}, {
			code: "5201",
			severity: "error",
			description: "Unknown server error.",
			key: "5201"
		}, {
			code: "5202",
			severity: "technError",
			text: "Persistence service call returned '405 - Method not allowed'."
		}, {
			code: "5203",
			severity: "technError",
			text: "Bad request; data is structured incorrectly."
		}, {
			code: "5204",
			severity: "error",
			description: "Error during server request; maximum number of analysis steps exceeded.",
			key: "5204"
		}, {
			code: "5205",
			severity: "error",
			description: "Error during server request; maximum number of analysis paths exceeded.",
			key: "5205"
		}, {
			code: "5206",
			severity: "error",
			description: "Access forbidden; insufficient privileges",
			key: "5206"
		}, {
			code: "5207",
			severity: "error",
			description: "Inserted value too large; probably maximum length of analysis path name exceeded",
			key: "5207"
		}, {
			code: "5208",
			severity: "error",
			description: "Error during path persistence; request to server can not be proceed due to invalid ID.",
			key: "5208"
		}, {
			code: "5210",
			severity: "fatal",
			description: "Error during opening of analysis path; see log.",
			key: "5210"
		}, {
			code: "5211",
			severity: "error",
			description: "Server response contains undefined path objects.",
			key: "5211"
		}, {
			code: "5212",
			severity: "error",
			description: "Metadata file of application {0} could not be accessed.",
			key: "5212"
		}, {
			code: "5213",
			severity: "error",
			description: "Text file of application {0} could not be accessed.",
			key: "5213"
		}, {
			code: "5214",
			severity: "error",
			description: "Request to the server failed with http status code {0} and http error message \"{1}\".",
			key: "5214"
		}, {
			code: "5220",
			severity: "error",
			description: "Error Message from Server: {0}",
			key: "5220"
		}, {
			code: "5221",
			severity: "error",
			description: "Server Error - Analytical Configuration could not be read. Technical key of application is {0}, technical key of analytical configuration is {1}.",
			key: "5221"
		}, {
			code: "5222",
			severity: "error",
			description: "Server Error - Texts of Application could not be read. The technical key of the application is {0}.",
			key: "5222"
		}, {
			code: "5223",
			severity: "error",
			description: "Server Error - Analytical Configurations could not be read. The technical key of the application is {0}.",
			key: "5223"
		}, {
			code: "5224",
			severity: "error",
			description: "Server Error - Settings of the Layered Repository could not be read.",
			key: "5224"
		}, {
			code: "5225",
			severity: "error",
			description: "Server Error - Analytical Configuration could not be deleted. Technical key of application is {0}, technical key of analytical configuration is {1}.",
			key: "5225"
		}, {
			code: "5226",
			severity: "error",
			description: "Server Error - Analytical Configuration could not be created. Technical key of application is {0}.",
			key: "5226"
		}, {
			code: "5227",
			severity: "error",
			description: "Server Error - Application could not be created.",
			key: "5227"
		}, {
			code: "5228",
			severity: "error",
			description: "Server Error - Application could not be updated. The technical key of the application is {0}.",
			key: "5228"
		}, {
			code: "5229",
			severity: "error",
			description: "Server Error - Applications could not be read.",
			key: "5229"
		}, {
			code: "5230",
			severity: "error",
			description: "Server Error - Text property file of Application could not be updated. The technical key of the application is {0}.",
			key: "5230"
		}, {
			code: "5231",
			severity: "error",
			description: "Server Error - Analytical Configurations could not be read from the Vendor Layer during Import",
			key: "5231"
		}, {
			code: "5232",
			severity: "error",
			description: "Server Error - Metadata of the Analytical Configurations could not be updated. The technical key of application is {0}, technical key of analytical configuration is {1}.",
			key: "5232"
		}, {
			code: "5233",
			severity: "error",
			description: "Server Error - Analytical configuration could not be updated. The technical key of application is {0}, technical key of analytical configuration is {1}.",
			key: "5233"
		}, {
			code: "5234",
			severity: "information",
			description: "In this hierarchical step you can make selections in the hierarchy {0}. You have already added analysis step {1}, in which you can also make selections in the hierarchy {0}. For technical reasons, you cannot add more than one hierarchical step with the same selection option.",
			key: "5234"
		}, {
			code: "5235",
			severity: "technError",
			text: "The filter, that is provided to the called application during navigation could not be reduced properly. So the original filter is supplied."
		}, {
			code: "5236",
			severity: "fatal",
			description: "Please configure the data source {0} in the manifest of the component.",
			key: "5236"
		}, {
			code: "5237",
			severity: "error",
			text: "Server Error - The application could not be deleted. Technical key of the application is {0}.",
			key: "5237"
		},  {
			code: "5238",
			severity: "error",
			text: "The analytical configuration with key {0} already exists under another application and cannot be created again",
			key: "5238"
		}, {
			code: "5252",
			severity: "fatal",
			description: "Server Error - Analysis Path could not be opened.",
			key: "5252"
		}, {
			code: "5301",
			severity: "warning",
			description: "Add or update path filter API method called with unsupported filter; See sap.apf.api documentation",
			key: "5301"
		}, {
			code: "5408",
			severity: "error",
			description: "Format information is missing at least for text element {0} - please edit the exported text property file manually",
			key: "5408"
		}, {
			code: "5409",
			severity: "error",
			description: "Application id {0} cannot be used as translation uuid in text property file - please edit the exported text property file manually",
			key: "5409"
		}, {
			code: "5410",
			severity: "error",
			description: "Imported text property file does not contain the APF application id - expected an entry like #ApfApplicationId=543EC63F05550175E10000000A445B6D.",
			key: "5410"
		}, {
			code: "5411",
			severity: "error",
			description: "Expected a valid text entry <key>=<value> in line {0}, but could not find - key must be in valid guid format.",
			key: "5411"
		}, {
			code: "5412",
			severity: "error",
			description: "No valid text entry <key>=<value> in line {0}, key is not in valid guid format like 543EC63F05550175E10000000A445B6D.",
			key: "5412"
		}, {
			code: "5415",
			severity: "error",
			description: "Date in line {0} has invalid format.",
			key: "5415"
		},
		{
			code: "6001",
			severity: "fatal",
			description: "Missing {0} in the configuration; contact your administrator.",
			key: "6001"
		}, {
			code: "6000",
			severity: "error",
			description: "Data is not available for the {0} step.",
			key: "6000"
		}, {
			code: "6002",
			severity: "error",
			description: "Missing {0} for {1} in the configuration; contact your administrator.",
			key: "6002"
		}, {
			code: "6003",
			severity: "error",
			description: "Missing {0} in the configuration; contact your administrator.",
			key: "6001"
		}, {
			code: "6004",
			severity: "technError",
			text: "Metadata not available for step {0}."
		}, {
			code: "6005",
			severity: "error",
			description: "Server request failed. Unable to read paths.",
			key: "6005"
		}, {
			code: "6006",
			severity: "error",
			description: "Server request failed. Unable to save path {0}.",
			key: "6006"
		}, {
			code: "6007",
			severity: "error",
			description: "Server request failed. Unable to update path {0}.",
			key: "6007"
		}, {
			code: "6008",
			severity: "error",
			description: "Server request failed. Unable to open path {0}.",
			key: "6008"
		}, {
			code: "6009",
			severity: "error",
			description: "Server request failed. Unable to delete path {0}.",
			key: "6009"
		}, {
			code: "6010",
			severity: "technError",
			description: "Data is not available for filter {0}",
			key: "6010"
		}, {
			code: "6011",
			severity: "fatal",
			description: "Smart Business service failed.Please try later",
			key: "6011"
		}, {
			code: "6012",
			severity: "information",
			description: "Add at least one step to the path before saving",
			key: "6012"
		}, {
			code: "6013",
			severity: "information",
			description: "This table uses the top n function to limit the number of data records. Therefore, the table is already sorted to determine the top n records and you cannot sort it by any other sorting criteria.",
			key: "6013"
		}, {
			code: "6014",
			severity: "information",
			description: "Maximum number of analysis paths exceeded",
			key: "6014"
		}, {
			code: "6015",
			severity: "information",
			description: "Maximum number of analysis steps exceeded; delete a step",
			key: "6015"
		}, {
			code: "6016",
			severity: "success",
			description: "Path {0} updated",
			key: "6016"
		}, {
			code: "6017",
			severity: "success",
			description: "Path {0} updated",
			key: "6017"
		}, {
			code: "7000",
			severity: "error",
			description: "Missing {0} in the configuration; contact your administrator.",
			key: "6001"
		},
		{
			code: "9001",
			severity: "fatal",
			description: "The app has stopped working due to a technical error.",
			key: "9001"
		}
	];
	return messageDefinition;
}, true /*GLOBAL_EXPORT*/);