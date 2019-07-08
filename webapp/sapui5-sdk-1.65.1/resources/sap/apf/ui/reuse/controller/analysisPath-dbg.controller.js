/*!
 * SAP APF Analysis Path Framework
 *
 * (c) Copyright 2012-2018 SAP SE. All rights reserved
 */
/**
 *@class analysisPath
 *@memberOf sap.apf.ui.reuse.controller
 *@name analysisPath
 *@description controller for view.analysisPath
 */
sap.ui.define([
	'sap/ui/core/mvc/Controller'
],function(BaseController) {
	"use strict";

	return BaseController.extend("sap.apf.ui.reuse.controller.analysisPath", {
		/**
		 *@this {sap.apf.ui.reuse.controller.analysisPath}
		 */
		/**
		 *@memberOf sap.apf.ui.reuse.controller.analysisPath
		 */
		refreshAnalysisPath : function() {
			this.getView().getCarousel().getController().refreshCarousel();
		},
		isOpenPath : false,//KLS what does this mean? Why no setter method?
		isNewPath : false,
		isBackNavigation : false,
		bLastValidState : false,
		onInit : function() {
			this.oCoreApi = this.getView().getViewData().oCoreApi;
			this.oUiApi = this.getView().getViewData().uiApi;
			if (sap.ui.Device.system.desktop) {
				this.getView().addStyleClass("sapUiSizeCompact");//KLS why are style classes added here and in the view? Who is responsible?
			}
		},
		/**
		 *@memberOf sap.apf.ui.reuse.controller.analysisPath
		 *@method refresh
		 *@description Adds loading sign to steps which have changed
		 *@param {number} nStartIndex index of step in analysis path after which filter has changed
		 */
		refresh : function(nStartIndex) {
			var oView = this.getView().oCarousel;//KLS correct naming for this variable? better carouselView
			var aStepViews = oView.stepViews;
			var i;
			if (nStartIndex !== -1) {
				for(i = nStartIndex; i < aStepViews.length; i++) {
					var oStepView = {};//KLS why initialization?
					oStepView = aStepViews[i];
					if (oStepView !== undefined) {
						oStepView.oThumbnailChartLayout.setBusy(true);
					}
				}
			}
			var nActiveStepIndex = this.oCoreApi.getSteps().indexOf(this.oCoreApi.getActiveStep());
			if (nActiveStepIndex > nStartIndex) {
				var oChartView = this.oUiApi.getStepContainer();
				oChartView.stepLayout.setBusy(true);
			}
			if (!this.oCoreApi.isDirty() && this.oCoreApi.getSteps().length !== 0) {
				this.oCoreApi.setDirtyState(true);
				this.setPathTitle();
			}
		},
		setPathTitle : function() {
			var pathTitleCandidate = this.oCoreApi.getPathName();
			if (pathTitleCandidate.length == 0) {
				pathTitleCandidate = this.oCoreApi.getTextNotHtmlEncoded("unsaved");
			}
			if (this.oCoreApi.isDirty()) {
				pathTitleCandidate = '*' + pathTitleCandidate;
			}
			this.oUiApi.getAnalysisPath().oSavedPathName.setTitle(pathTitleCandidate);
			this.oUiApi.getAnalysisPath().oSavedPathName.setTooltip(pathTitleCandidate);
		},
		/**
		 *@memberOf sap.apf.ui.reuse.controller.analysisPath
		 *@method callBackforUpdatePath
		 *@param {object} oCurrentStep: Current Step instance
		 *@param {boolean} bStepChanged  returns true if filter of step has changed
		 *@description Calls method updateCurrentStep if current step has changed
		 */
		callBackForUpdatePath : function(oCurrentStep, bStepChanged) {
			var nIndex = this.oCoreApi.getSteps().indexOf(oCurrentStep);
			if (nIndex === 0) {
				this.refreshAnalysisPath();
			}
			this.updateCurrentStep(oCurrentStep, nIndex, bStepChanged);
		},
		/**
		 *@memberOf sap.apf.ui.reuse.controller.analysisPath
		 *@method callBackForUpdatePathAndSetLastStepAsActive
		 *@param {object} oCurrentStep: Current Step instance
		 *@param {boolean} bStepChanged returns true if step has changed
		 *@description Sets last step as active and calls method update Path
		 */
		callBackForUpdatePathAndSetLastStepAsActive : function(oCurrentStep, bStepChanged) {
			var nIndex = this.oCoreApi.getSteps().indexOf(oCurrentStep);
			if (nIndex === 0) {
				var oStep = this.oCoreApi.getSteps()[this.oCoreApi.getSteps().length - 1];
				this.oCoreApi.setActiveStep(oStep);
				this.refreshAnalysisPath();
			}
			this.updateCurrentStep(oCurrentStep, nIndex, bStepChanged);
			this.oUiApi.getLayoutView().setBusy(false);
		},
		/**
		 *@memberOf sap.apf.ui.reuse.controller.analysisPath
		 *@method updateCurrentStep
		 *@param {object} oCurrentStep: CurrentStep instance
		 *@param {number} nIndex: index of CurrentStep
		 *@param {boolean} bStepChanged returns true if step has changed
		 *@description updates Analysis Path if steps following current step has changed. If CurrentStep is active draws chart in main area.
		 */
		updateCurrentStep : function(oCurrentStep, nIndex, bStepChanged) {
			var nActiveIndex = this.oCoreApi.getSteps().indexOf(this.oCoreApi.getActiveStep());
			var isActiveStep = (nIndex === nActiveIndex);
			this.drawThumbnail(nIndex, bStepChanged || this.isOpenPath);
			if (isActiveStep) {
				this.drawMainChart(bStepChanged);
			}

			if (this.isOpenPath && (this.oCoreApi.getSteps().indexOf(oCurrentStep) === (this.oCoreApi.getSteps().length - 1))) {
				this.oUiApi.getLayoutView().setBusy(false);
				this.isOpenPath = false;
			}
			if (this.isBackNavigation && (this.oCoreApi.getSteps().indexOf(oCurrentStep) === (this.oCoreApi.getSteps().length - 1))) {
				this.oUiApi.getLayoutView().setBusy(false);
				this.isBackNavigation = false;
			}
			if (this.bLastValidState && (this.oCoreApi.getSteps().indexOf(oCurrentStep) === (this.oCoreApi.getSteps().length - 1))) {
				this.oUiApi.getLayoutView().setBusy(false);
				this.bLastValidState = false;
			}
			this.isNewPath = false;
		},
		/**
		 *@memberOf sap.apf.ui.reuse.controller.analysisPath
		 *@method drawMainChart
		 *@param {boolean} bStepChanged returns true if step has changed
		 *@description gets chartArea of application from API sap.apf.ui.getStepConatiner() and draws Chart
		 */
		drawMainChart : function(bStepChanged) {
			var oChartView = this.oUiApi.getStepContainer();
			oChartView.getController().drawStepContent(bStepChanged);
		},
		/**
		 *@memberOf sap.apf.ui.reuse.controller.analysisPath
		 *@method drawMainChart
		 *@param {number} nIndex index of step for which thumbnail has to be drawn
		 *@param {boolean} bStepChanged returns true if step has changed
		 *@description gets chartArea of application from API sap.apf.ui.getStepConatiner() and draws Chart
		 */
		drawThumbnail : function(nIndex, bStepChanged) {
			var oStepView = this.getView().getCarousel().getStepView(nIndex);
			oStepView.getController().drawThumbnailContent(bStepChanged);
		},
		/**
		 * @method navigateToStep
		 * @param {Number} index to which step to navigate to
		 * @description Navigates to the step with the given index: sets the step to active and draws it in the stepContainer
		 */
		navigateToStep : function(index){
			this.getView().getCarousel().getStepView(index).getController().setActiveStep(index);
		},
		/**
		 *@memberOf sap.apf.ui.reuse.controller.analysisPath
		 *@method apfDestroy
		 *@description Used to clean up resources specific to APF during shutdown
		 */
		apfDestroy : function() {
			this.getView().getToolbar().getController().apfDestroy();
			this.getView().getCarousel().getController().apfDestroy();
		}
	});
});