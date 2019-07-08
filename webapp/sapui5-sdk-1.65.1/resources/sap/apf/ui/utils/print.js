/*
 * ! SAP APF Analysis Path Framework
 * 
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.apf.ui.utils.print");jQuery.sap.require("sap.apf.ui.utils.printView");jQuery.sap.require("sap.apf.ui.utils.formatter");jQuery.sap.require("sap.viz.ui5.types.legend.Common");
sap.apf.ui.utils.Print=function(I){"use strict";var c=I.oCoreApi;var u=I.uiApi;var a=null;var p=new sap.apf.ui.utils.PrintModel(I);var b=new sap.apf.ui.utils.PrintView(I,p);this.oPrintLayout={};function _(C){if(!jQuery.isEmptyObject(C.oPrintLayout)){C.oPrintLayout.removeContent();}jQuery('#apfPrintArea').remove();jQuery("body").append('<div id="apfPrintArea"></div>');u.createApplicationLayout(false).then(function(h){h.setBusy(true);});}this.doPrint=function(){c.getApplicationConfigProperties().done(function(h){p.setApplicationConfig(h);var j,n,P;var i=2000,s=this;p.nStepRenderCount=0;a=c.getSteps();p.nNoOfSteps=a.length;this.oPrintLayout=new sap.ui.layout.VerticalLayout({id:"idAPFPrintLayout"});_(this);P=new sap.ui.layout.VerticalLayout({id:'idAPFPrintFirstPageLayout',content:[b.getHeaderForFirstPage(),b.getPrintLayoutForFacetFiltersAndFooters()]}).addStyleClass("filterLayout");this.oPrintLayout.addContent(P);for(j=0;j<a.length;j++){n=parseInt(j,10)+1;this.oPrintLayout.addContent(b.getPrintLayoutForEachStep(a[j],n,a.length));}this.oPrintLayout.placeAt("apfPrintArea");d(s.oPrintLayout,i);}.bind(this));};function d(P,h){new Promise(function(r){setTimeout(function(){r();},h);}).then(function(){g(P);f();e(P);return u.createApplicationLayout(false)}).then(function(i){i.setBusy(false);});}function e(P){var s,C;var o,h,k;for(var i=0;i<jQuery("#apfPrintArea").siblings().length;i++){jQuery("#apfPrintArea").siblings()[i].hidden=false;}for(var l=0;l<a.length;l++){s=a[l].getSelectedRepresentation();s=s.bIsAlternateView?s.toggleInstance:s;if(s&&s.titleControl&&s.titleControl.oParent){h=s.titleControl.oParent.getItems();if(h&&h.length>1){for(var j=0;j<h.length;j++){if(h[j].getMetadata()._sClassName==="sap.m.HBox"){k=h[j];k.setVisible(true);}}}}if(s.type!==sap.apf.ui.utils.CONSTANTS.representationTypes.TREE_TABLE_REPRESENTATION&&s.type!==sap.apf.ui.utils.CONSTANTS.representationTypes.TABLE_REPRESENTATION){C=P.getContent()[l+1].getContent()[1].getContent()[0];C.destroy();C=null;}}P.destroy();P=null;jQuery("div[id^=idAPFStepLayout]").remove();jQuery("#apfPrintArea").remove();}function f(){var i=sap.ui.Device.system.tablet;var h=sap.ui.Device.os.ios;if(i===true&&h===true){var j=jQuery("html").clone();var k=jQuery(j).find('body');jQuery(k).children("div").each(function(l,n){if(jQuery(n).attr('id')==='apfPrintArea'){jQuery(n).show();}else{jQuery(n).remove();}});jQuery(jQuery(j).find('body')).html(jQuery(k.html()));var t="<html>"+jQuery(j).html()+"</html>";var m=window.open("","_blank","width=300,height=300");m.document.write(t);m.print();}else{window.print();}}function g(P){var h=P.getDomRef();jQuery("#apfPrintArea").empty();jQuery("#apfPrintArea").append(jQuery(h).html());for(var i=0;i<jQuery("#apfPrintArea").siblings().length;i++){jQuery("#apfPrintArea").siblings()[i].hidden=true;}}};
