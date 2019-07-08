/*!
 * SAP APF Analysis Path Framework
 *
 * (c) Copyright 2012-2014 SAP SE. All rights reserved
 */
/* global jQuery, sap */
jQuery.sap.declare("sap.apf.ui.representations.utils.vizFrameSelectionHandler");
jQuery.sap.require("sap.apf.ui.representations.utils.chartDataSetHelper");
(function() {
	"use strict";
	sap.apf.ui.representations.utils.VizFrameSelectionHandler = function(oParameter, oApi) {
		this.oParameter = oParameter;
		this.oApi = oApi;
	};
	var selectionHandlerPrototype = sap.apf.ui.representations.utils.VizFrameSelectionHandler.prototype;
	selectionHandlerPrototype.constructor = sap.apf.ui.representations.utils.VizFrameSelectionHandler;
	function _createDataPointsFromSelectionEvent(sRequiredProperty, aSelectedDataPoint) {
		var dataPointsFromSelection = [];
		aSelectedDataPoint.forEach(function(item) {
			var selectionData = {
				data : {}
			};
			selectionData.data[sRequiredProperty] = item.data ? item.data[sRequiredProperty] : item;
			dataPointsFromSelection.push(selectionData);
		});
		return dataPointsFromSelection;
	}

	function _getUniqueFilters(aFilterValues) {
		return aFilterValues.filter(function(item, nIndex, array) {
			return array.indexOf(item) === nIndex;
		});
	}
	/**
	* @param oCurrentSelectionEvent - selection event from the chart
	* @param bIsCalledFromDeselection - boolean to check if the call is from deselection event 
	* @param aChartSelections - all the available (previous) selection on chart
	* @description finds all the data rows in the data response based on the selection/deselection made on the chart (series, category selection)
	* @returns  {{dataPointsFromSelection, aUniqueFilterValueFromChart}}
	*  - all the data point with the value of filter in selection event, array of unique filters from the selection event
	*
	**/
	selectionHandlerPrototype.getSelectionInfoFromEvent = function(oCurrentSelectionEvent, bIsCalledFromDeselection, aChartSelections) {
		var dataPointsFromSelection, aExclusiveFilters, oSelectionHandlerInstance = this;
		var sRequiredProperty = oSelectionHandlerInstance.oParameter.requiredFilters[0];
		var aCurrentFilterFromEvent = oCurrentSelectionEvent.mParameters.data.map(function(selection) {
			return selection.data[sRequiredProperty];
		});
		var aPreviousFiltersFromChart = aChartSelections.map(function(selection) {
			return selection.data[sRequiredProperty];
		});
		if (bIsCalledFromDeselection) { //remove the filters from existing list if deselection
			aExclusiveFilters = _getUniqueFilters(aPreviousFiltersFromChart).filter(function(item) {
				return aCurrentFilterFromEvent.indexOf(item) === -1;
			});
		} else {//add the filters in existing list if selection
			aExclusiveFilters = _getUniqueFilters(aCurrentFilterFromEvent.concat(aPreviousFiltersFromChart));
		}
		dataPointsFromSelection = _createDataPointsFromSelectionEvent(sRequiredProperty, aExclusiveFilters);
		return {
			dataPointsFromSelection : dataPointsFromSelection,
			aUniqueFilterValueFromChart : aExclusiveFilters
		};
	};
	/**
	 * @description finds all the data rows with the given filters.
	 * @param aFilters - filter values from a chart
	 * @param aDataResponse - the data response of a chart
	 * @param {sap.apf.ui.representations.utils.TimeAxisDateConverter} oTimeAxisDateConverter
	 * @returns aDataPoint - these data points are used to highlight the data points on the chart after it is rendered (used while loading a saved path with selection).
	**/
	selectionHandlerPrototype.getSelectionInfoFromFilter = function(aFilters, aDataResponse, oTimeAxisDateConverter) {
		var aDataPoint = [];
		var sRequiredProperty = this.oParameter.requiredFilters[0];
		var fieldForOriginalValue = sap.apf.ui.representations.utils.ChartDataSetHelper.getFieldNameForOriginalContentOfProperty(sRequiredProperty);
		if (sRequiredProperty) {
			aDataResponse.forEach(function(dataRow) {
				aFilters.forEach(function(filterValue) {
					if (filterValue === dataRow[sRequiredProperty] || filterValue === dataRow[fieldForOriginalValue]) {
						var selectionData = {
							data : {}
						};
						selectionData.data[sRequiredProperty] = dataRow[sRequiredProperty];
						aDataPoint.push(selectionData);
					}
				});
			});
		}
		return aDataPoint;
	};
}());