/*!
 * SAP APF Analysis Path Framework
 *
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
jQuery.sap.require("sap.apf.modeler.ui.utils.textManipulator");jQuery.sap.require("sap.apf.utils.utils");sap.ui.define(["sap/apf/modeler/ui/controller/propertyType"],function(B){"use strict";var t=sap.apf.modeler.ui.utils.textManipulator;return B.extend("sap.apf.modeler.ui.controller.representationProperty",{onBeforeRendering:function(){var c=this;if(c.byId("idLabelDisplayOptionType")){c.byId("idLabelDisplayOptionType").destroy();}c.byId("idPropertyTypeLayout").setSpan("L4 M4 S4");},getAllPropertiesAsPromise:function(){var c=this,s,p,P=[];var S=c.oStepPropertyMetadataHandler.oStep;var d=jQuery.Deferred();S.getConsumablePropertiesForRepresentation(c.oRepresentation.getId()).done(function(r){r.consumable.forEach(function(a){c.oStepPropertyMetadataHandler.getProperties().forEach(function(b){if(a===b){P.push(a);}});});s=c.getSelectedProperty();if(s!==c.oTextReader("none")&&s!==undefined){p=P.indexOf(s)!==-1?P:P.concat(s);if(r.available.indexOf(s)!==-1||s===c.oTextReader("none")){P=p;}else{P=P.concat(t.addPrefixText([s],c.oTextReader));s=t.addPrefixText([s],c.oTextReader)[0];}}if(c.oStepPropertyMetadataHandler.getStepType()==="hierarchicalStep"){P.splice(0,0,c.oTextReader("none"));}d.resolve({aAllProperties:P,sSelectedKey:s});});return d.promise();},getPropertyTextLabelKey:function(p){var c=this;return c.oRepresentation.getPropertyTextLabelKey(p);},updatePropertiesInConfiguration:function(p){var c=this;c.oRepresentation.getProperties().forEach(function(m){c.oRepresentation.removeProperty(m);});p.forEach(function(P){c.oRepresentation.addProperty(P.sProperty);c.oRepresentation.setPropertyKind(P.sProperty,P.sKind);c.oRepresentation.setPropertyTextLabelKey(P.sProperty,P.sTextLabelKey);});},createNewPropertyInfoAsPromise:function(n){var c=this,N={};N.sProperty=n;N.sKind=c.getView().getViewData().oPropertyTypeData.sContext;N.sTextLabelKey=undefined;return sap.apf.utils.createPromise(N);},setPropertyTextLabelKey:function(p,l){var c=this;c.oRepresentation.setPropertyTextLabelKey(p,l);},setNextPropertyInParentObject:function(){var c=this;c.updateOfConfigurationObjectAsPromise().then(function(){c.setDetailData();});},removePropertyFromParentObject:function(){var c=this;c.oRepresentation.removeProperty(t.removePrefixText(c.byId("idPropertyType").getSelectedKey(),c.oTextReader(sap.apf.modeler.ui.utils.CONSTANTS.texts.NOTAVAILABLE)));},addPropertyAsPromise:function(){var c=this,p=[];var s=c.oStepPropertyMetadataHandler.oStep;var C=sap.apf.modeler.ui.utils.CONSTANTS;s.getConsumablePropertiesForRepresentation(c.oRepresentation.getId()).done(function(r){r.consumable.forEach(function(P){c.oStepPropertyMetadataHandler.getProperties().forEach(function(S){if(P===S){p.push(P);}});});c.getView().fireEvent(C.events.ADDPROPERTY,{"sProperty":p[0],"sContext":c.getView().getViewData().oPropertyTypeData.sContext});c.oConfigurationEditor.setIsUnsaved();});}});});
