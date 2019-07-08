/*!
 * SAP APF Analysis Path Framework
 *
 * (c) Copyright 2012-2014 SAP SE. All rights reserved
 */
sap.ui.define(['sap/apf/ui/representations/BaseVizFrameChartRepresentation','sap/apf/core/constants','sap/apf/ui/utils/constants'],function(B,c,u){"use strict";function H(a,p){B.apply(this,[a,p]);this.type=u.representationTypes.HEATMAP_CHART;this.chartType=u.vizFrameChartTypes.HEATMAP;this._addDefaultKind();};H.prototype=Object.create(B.prototype);H.prototype.constructor=H;H.prototype._addDefaultKind=function(){this.parameter.measures.forEach(function(m){if(m.kind===undefined){m.kind=c.representationMetadata.kind.SECTORCOLOR;}});this.parameter.dimensions.forEach(function(d,i){if(d.kind===undefined){d.kind=i===0?c.representationMetadata.kind.XAXIS:c.representationMetadata.kind.XAXIS2;}});};H.prototype.setVizPropsForSpecificRepresentation=function(){this.chart.setVizProperties({categoryAxis2:{visible:true,title:{visible:true},label:{visible:true}}});};H.prototype.setVizPropsOfThumbnailForSpecificRepresentation=function(){this.thumbnailChart.setVizProperties({categoryAxis2:{visible:false,title:{visible:false}}});};H.prototype.getAxisFeedItemId=function(k){var s=c.representationMetadata.kind;var a;switch(k){case s.XAXIS:a=c.vizFrame.feedItemTypes.CATEGORYAXIS;break;case s.XAXIS2:a=c.vizFrame.feedItemTypes.CATEGORYAXIS2;break;case s.SECTORCOLOR:a=c.vizFrame.feedItemTypes.COLOR;break;default:break;}return a;};sap.apf.ui.representations.heatmapChart=H;return H;},true);
