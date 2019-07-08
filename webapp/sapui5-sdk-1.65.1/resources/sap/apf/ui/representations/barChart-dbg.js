/*!
 * SAP APF Analysis Path Framework
 *
 * (c) Copyright 2012-2014 SAP SE. All rights reserved
 */
sap.ui.define([
'sap/apf/ui/representations/BaseVizFrameChartRepresentation',
'sap/apf/core/constants',
'sap/apf/ui/utils/constants'], function(BaseVizFrameChartRepresentation, coreConstants, utilsConstants){

/**
 * @class barChart constructor.
 * @param oParametersdefines parameters required for chart such as Dimension/Measures,tooltip, axis information.
 * @returns chart object
 */

	"use strict";
	   function BarChart(oApi, oParameters) {
		BaseVizFrameChartRepresentation.apply(this, [ oApi, oParameters ]);
		this.type = utilsConstants.representationTypes.BAR_CHART;
		this.chartType = utilsConstants.vizFrameChartTypes.BAR;
		this._addDefaultKind();
	};
	BarChart.prototype = Object.create(BaseVizFrameChartRepresentation.prototype);
	//Set the "constructor" property to refer to barChart
	BarChart.prototype.constructor = BarChart;
	/**
	 * @private
	 * @method _addDefaultKind
	 * @description reads the oParameters for chart and modifies it by including a default kind 
	 * in case the "kind" property is not defined in dimension/measures
	 */
	BarChart.prototype._addDefaultKind = function() {
		this.parameter.measures.forEach(function(measure) {
			if (measure.kind === undefined) {//handle the scenario where the kind is not available
				measure.kind = coreConstants.representationMetadata.kind.YAXIS;
			}
		});
		this.parameter.dimensions.forEach(function(dimension, index) {
			if (dimension.kind === undefined) {//handle the scenario where the kind is not available
				dimension.kind = index === 0 ? coreConstants.representationMetadata.kind.XAXIS : coreConstants.representationMetadata.kind.LEGEND;
			}
		});
	};
	BarChart.prototype.getAxisFeedItemId = function(sKind) {
		var oSupportedTypes = coreConstants.representationMetadata.kind;
		var axisfeedItemId;
		switch (sKind) {
			case oSupportedTypes.XAXIS:
				axisfeedItemId = coreConstants.vizFrame.feedItemTypes.CATEGORYAXIS;
				break;
			case oSupportedTypes.YAXIS:
				axisfeedItemId = coreConstants.vizFrame.feedItemTypes.VALUEAXIS;
				break;
			case oSupportedTypes.LEGEND:
				axisfeedItemId = coreConstants.vizFrame.feedItemTypes.COLOR;
				break;
			default:
				break;
		}
		return axisfeedItemId;
	};
	/*BEGIN_COMPATIBILITY*/
	sap.apf.ui.representations.barChart = BarChart;
	/*END_COMPATIBILITY*/
	return BarChart;
}, true /*Global_Export*/);