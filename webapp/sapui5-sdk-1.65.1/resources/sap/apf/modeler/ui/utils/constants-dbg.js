/*!
 * SAP APF Analysis Path Framework
 * 
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
sap.ui.define(function(){
	"use strict";
	var constants = {
		configurationObjectTypes : {
			CONFIGURATION : "configuration",
			FACETFILTER : "facetFilter",
			SMARTFILTERBAR : "smartFilterBar",
			CATEGORY : "category",
			STEP : "step",
			REPRESENTATION : "representation",
			NAVIGATIONTARGET : "navigationTarget",
			ISNEWCONFIG : "apf1972-"
		},
		events : {//Use controller name as the object key for controller specific events
			UPDATESUBVIEWINSTANCESONRESET : "updateSubViewInstancesOnResetEvent",
			ADDPROPERTY : "addProperty",
			REMOVEPROPERTY : "removeProperty",
			SETNEXTPROPERTYINPARENTOBJECT : "setNextPropertyInParentObject",
			REMOVECURRENTPROPERTYFROMPARENTOBJECT : "removeCurrentPropertyFromParentObject",
			REMOVEPROPERTYFROMPARENTOBJECT : "removePropertyFromParentObject",
			REMOVEALLPROPERTIESFROMPARENTOBJECT : "removeAllPropertiesFromParentObject",
			UPDATEPROPERTYVALUESTATE : "updatePropertyValueState",
			SETFOCUSONADDICON : "setFocusOnAddIcon",
			FOCUSONREMOVE : "focusOnRemove",
			SETFOCUSONREMOVEICON : "setFocusOnRemoveIcon",
			UPDATEPROPERTY : "updateProperty",
			REMOVEADDEDPROPERTYFROMOTHERPROPERTYTYPE : "removeAddedPropertyFromOtherPropertyType",
			ADDREMOVEDPROPERTYFROMOTHERPROPERTYTYPE : "addRemovedPropertyFromOtherPropertyType",
			facetFilter : {
				ENABLEDISABLEFRRFIELDS : "enableDisableFRRFields",
				USESAMEASVHR : "useSameAsVHR",
				CLEARVHRFIELDSIFVALUELIST : "clearVHRFieldsIfValueList",
				DONOTSHOWATRUNTIME : "doNotShowAtRuntime",
				UPDATEPROPERTIES : "updatePropertiesInConfiguration"
			},
			step : {
				SETTOPNPROPERTIES : "setTopNProperties",
				SETDATAREDUCTIONSECTION : "setDataReductionSection",
				SETVISIBILITYOFFILTERMAPPINGFIELDS : "setVisibilityOfFilterMappingFields",
				RESETFILTERMAPPINGFIELDS : "resetFilterMappingFields",
				UPDATEFILTERMAPPINGFIELDS : "updateFilterMappingFields"
			},
			representation : {
				SETCHARTICON : "setChartIcon"
			}
		},
		propertyTypes : {
			HIERARCHIALCOLUMN : "hierarchicalColumn",
			DIMENSION : "dimensions",
			MEASURE : "measures",
			LEGEND : "legend",
			PROPERTY : "property",
			REPRESENTATIONSORT : "representationSort",
			STEPSORT : "stepSort"
		},
		aggregationRoles : {
			DIMENSION : "dimension",
			MEASURE : "measure"
		},
		similarChartTypes : [ "ColumnChart", "BarChart", "LineChart", "StackedColumnChart", "StackedBarChart", "PercentageStackedColumnChart", "PercentageStackedBarChart" ],
		texts : {
			NOTAVAILABLE : "notavailableText"
		}
	};
	sap.apf.modeler.ui.utils.CONSTANTS = constants;
	return constants;
}, true /*GLOBAL_EXPORT*/);
