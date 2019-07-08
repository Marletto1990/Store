/*!
 * SAP APF Analysis Path Framework
 * 
 * (c) Copyright 2012-2018 SAP SE. All rights reserved
*/
jQuery.sap.declare("sap.apf.ui.representations.treeTable");jQuery.sap.require("sap.apf.core.constants");jQuery.sap.require("sap.apf.ui.utils.formatter");jQuery.sap.require("sap.apf.modeler.ui.utils.constants");jQuery.sap.require("sap.apf.ui.representations.BaseUI5ChartRepresentation");jQuery.sap.require("sap.apf.ui.representations.utils.paginationDisplayOptionHandler");jQuery.sap.require("sap.ui.table.TreeTable");(function(){'use strict';function g(t){return t.metadata.getPropertyMetadata(t.requiredFilter).text;}function a(t){return t.oTreeTableControlObject.parameters.treeAnnotationProperties.hierarchyNodeExternalKeyFor;}function b(r,m){if(r){if(m.getPropertyMetadata(r)["filter-restriction"]==="single-value"){return sap.ui.table.SelectionMode.Single;}return sap.ui.table.SelectionMode.MultiToggle;}return sap.ui.table.SelectionMode.None;}function _(t,s,T){var o;var m=function(q){return function(r){if(T.metadata!==undefined){var u;if(r){u=T.oFormatter.getFormattedValue(q,r);if(u!==undefined){return u;}}}return r;};};o=new sap.ui.table.TreeTable({showNoData:false,title:s,enableSelectAll:false,visibleRowCountMode:sap.ui.table.VisibleRowCountMode.Auto});o.setLayoutData(new sap.m.FlexItemData({growFactor:1}));o.addStyleClass("sapUiSizeCompact");o.setSelectionMode(b(T.requiredFilter,T.metadata));var C=[],n,p;t.name.forEach(function(q,r){n=new sap.m.Text().bindText(t.value[r],m(t.value[r]),sap.ui.model.BindingMode.OneWay);p=new sap.ui.table.Column({label:new sap.m.Label({text:q}),template:n,tooltip:q});C.push(p);});C.forEach(function(q){o.addColumn(q);});T.oTreeTableModel.attachBatchRequestCompleted(function(){if(T.oApi.getUiApi().getLayoutView().getController()&&T.oApi.getUiApi().getLayoutView().getController().byId("stepContainer")){T.oApi.getUiApi().getLayoutView().getController().byId("stepContainer").getContent()[0].byId("idStepLayout").setBusy(false);}d(T,o,t);if(T.oRepresentationFilterHandler.getFilterValues().length>0){c(T);}else{T.oTreeTable.clearSelection();}});T.oTreeTableModel.attachBatchRequestSent(function(E){if(T.oApi.getUiApi().getLayoutView().getController()&&T.oApi.getUiApi().getLayoutView().getController().byId("stepContainer")){T.oApi.getUiApi().getLayoutView().getController().byId("stepContainer").getContent()[0].byId("idStepLayout").setBusy(true);}});o.setModel(T.oTreeTableModel);o.bindRows(T.oTreeTableControlObject);return o;}function c(t){var T=t.oTreeTable.getRows();t.oTreeTable.clearSelection();setTimeout(function(){T.forEach(function(r,m){var n=r.getBindingContext();if(n){var R=n.getProperty(t.requiredFilter);t.oRepresentationFilterHandler.getFilterValues().forEach(function(o){if(R===o){t.oTreeTable.addSelectionInterval(m,m);}});}});},1);}function d(t,T,m){if(t.metadata!==undefined){for(var n=0;n<m.name.length;n++){var M=t.metadata.getPropertyMetadata(m.value[n]);if(M["aggregation-role"]==="measure"){var o=T.getColumns()[n];o.setHAlign(sap.ui.core.HorizontalAlign.End);}}}}function e(t,m){var C=t.oTreeTable.getContextByIndex(m).getProperty(t.requiredFilter);var s=t.oTreeTable.getSelectionMode(t.requiredFilter);var I=t.oTreeTable.isIndexSelected(m);var D=t.oTreeTable.getContextByIndex(m).getProperty(g(t));var n=t.oTreeTable.getContextByIndex(m).getProperty(a(t));t.oPaginationDisplayOptionHandler.createDisplayValueLookupForPaginatedFilter(C,D,n);var u=t.oRepresentationFilterHandler.getFilterValues();if(I){u=i(t,s,C,u);}else{u=j(t,s,C,u);}k(t,u);}function f(t){t.oRepresentationFilterHandler.clearFilters();}function h(F){return F.filter(function(m,n,o){return o.indexOf(m)===n;});}function i(t,s,C,u){if(s===sap.ui.table.SelectionMode.Single){u=[C];}else{u.push(C);}return h(u);}function j(t,s,C,u){if(s===sap.ui.table.SelectionMode.Single){u=[];}else{var m=u.indexOf(C);if(m!==-1){u.splice(m,1);}}return u;}function k(t,u){f(t);t.oRepresentationFilterHandler.updateFilterFromSelection(u);t.oApi.selectionChanged();}function l(t){var C={name:[],value:[]};var p=t.oParameters.hierarchicalProperty.concat(t.oParameters.properties);p.forEach(function(m,n){var o=m.fieldName;var q=t.metadata.getPropertyMetadata(o).label||t.metadata.getPropertyMetadata(o).name;if(m.kind===sap.apf.modeler.ui.utils.CONSTANTS.propertyTypes.HIERARCHIALCOLUMN){if(m.labelDisplayOption==="text"){o=t.metadata.getPropertyMetadata(t.oTreeTableControlObject.parameters.treeAnnotationProperties.hierarchyNodeFor).text;}else{o=t.oTreeTableControlObject.parameters.treeAnnotationProperties.hierarchyNodeExternalKeyFor;}}C.name[n]=m.fieldDesc===undefined||!t.oApi.getTextNotHtmlEncoded(m.fieldDesc).length?q:t.oApi.getTextNotHtmlEncoded(m.fieldDesc);C.value[n]=o;});return C;}sap.apf.ui.representations.treeTable=function(A,p){var t=this;t.oParameters=p;t.requiredFilter=t.oParameters.requiredFilters[0];t.oKeyTextLookup={};t.type=sap.apf.ui.utils.CONSTANTS.representationTypes.TREE_TABLE_REPRESENTATION;sap.apf.ui.representations.BaseUI5ChartRepresentation.apply(t,[A,p]);t.oPaginationDisplayOptionHandler=new sap.apf.ui.representations.utils.PaginationDisplayOptionHandler();t._selectRowInTreeTable=function(E){var m=E.getParameter("userInteraction");var n=E.getParameter("rowIndex");if(!m||n===undefined||n===null){return;}e(t,n);};t.handleRowSelectionInTreeTable=function(E){t._selectRowInTreeTable(E);};};sap.apf.ui.representations.treeTable.prototype=Object.create(sap.apf.ui.representations.BaseUI5ChartRepresentation.prototype);sap.apf.ui.representations.treeTable.prototype.constructor=sap.apf.ui.representations.treeTable;sap.apf.ui.representations.treeTable.prototype.getMainContent=function(s){if(!this.oTreeTable){var t=l(this);this.oTreeTable=_(t,s,this);this.oTreeTable.attachRowSelectionChange(this.handleRowSelectionInTreeTable.bind(this));}return new sap.m.VBox({fitContainer:true,items:[this.oTreeTable]});};sap.apf.ui.representations.treeTable.prototype.getSelections=function(){var s=[],t=this,S;this.oRepresentationFilterHandler.getFilterValues().forEach(function(m){S=t.oPaginationDisplayOptionHandler.getDisplayNameForPaginatedFilter(m,t.parameter.requiredFilterOptions,t.requiredFilter,t.oFormatter,t.metadata);s.push({id:m,text:S});});return s;};sap.apf.ui.representations.treeTable.prototype.removeAllSelection=function(){this.oRepresentationFilterHandler.clearFilters();this.oTreeTable.clearSelection();this.oApi.selectionChanged();};sap.apf.ui.representations.treeTable.prototype.getFilter=function(){var m=this.oApi.createFilter();var A=m.getTopAnd().addOr('exprssionOr');this.oRepresentationFilterHandler.getFilterValues().forEach(function(n){var F={id:n,name:this.requiredFilter,operator:"EQ",value:n};A.addExpression(F);}.bind(this));return m;};sap.apf.ui.representations.treeTable.prototype.setFilterValues=function(v){var t=this,F=[];var r=t.requiredFilter;t.oRepresentationFilterHandler.clearFilters();v.forEach(function(m){var n=m[r];var o=m[g(t)];var p=m[a(t)];t.oPaginationDisplayOptionHandler.createDisplayValueLookupForPaginatedFilter(n,o,p);F.push(n);});t.oRepresentationFilterHandler.updateFilterFromSelection(F);};sap.apf.ui.representations.treeTable.prototype.updateTreetable=function(m,M,o,F){this.oTreeTableModel=M;this.oTreeTableControlObject=m;this.metadata=o;this.oFormatter=new sap.apf.ui.utils.formatter({getEventCallback:this.oApi.getEventCallback.bind(this.oApi),getTextNotHtmlEncoded:this.oApi.getTextNotHtmlEncoded,getExits:this.oApi.getExits()},this.metadata);if(this.oTreeTable&&F){this.oTreeTable.bindRows(this.oTreeTableControlObject);}};sap.apf.ui.representations.treeTable.prototype.getThumbnailContent=function(){var t;var T=new sap.ui.core.Icon({src:"sap-icon://tree",size:"70px"}).addStyleClass('thumbnailTableImage');t=T;return t;};sap.apf.ui.representations.treeTable.prototype.getPrintContent=function(s){var t=this.oTreeTable.clone();var p={oRepresentation:t};return p;};sap.apf.ui.representations.treeTable.prototype.getSelectedFilterPropertyLabel=function(r){return this.metadata.getPropertyMetadata(r)["hierarchy-node-for"];};sap.apf.ui.representations.treeTable.prototype.destroy=function(){if(this.oParameters){this.oParameters=null;}if(this.oTreeTableModel){this.oTreeTableModel=null;}if(this.oTreeTableControlObject){this.oTreeTableControlObject=null;}if(this.oTreeTable){this.oTreeTable.destroy();}if(this.metadata){this.metadata=null;}if(this.oRepresentationFilterHandler){this.oRepresentationFilterHandler=null;}sap.apf.ui.representations.BaseUI5ChartRepresentation.prototype.destroy.call(this);};}());
