/*!
 * SAP APF Analysis Path Framework
 *
 * (c) Copyright 2012-2018 SAP SE. All rights reserved
 */
/* global window */

sap.ui.define([
	'sap/apf/ui/utils/helper',
	'sap/apf/core/constants',
	'sap/ui/core/mvc/Controller',
	'sap/apf/ui/utils/constants',
	'sap/suite/ui/commons/ChartContainerContent',
	'sap/suite/ui/commons/ChartContainerToolbarPlaceholder',
	'sap/ui/core/Icon',
	'sap/ui/core/CustomData',
	'sap/m/Link',
	'sap/m/ToggleButton',
	'sap/m/Label',
	'sap/m/Button',
	'sap/m/ToolbarSpacer',
	'sap/m/List',
	'sap/m/ListMode',
	'sap/m/ListSeparators',
	'sap/m/StandardListItem',
	'sap/m/Popover',
	'sap/m/PlacementType'
], function (Helper, CoreConstants, BaseController, Constants, ChartContainerContent, ChartContainerToolbarPlaceholder, Icon, CustomData,
	Link, ToggleButton, Label, Button, ToolbarSpacer, List, ListMode, ListSeparators, StandardListItem, Popover, PlacementType) {
	"use strict";

	var oCoreApi, oUiApi, oActiveStep, bRepresentationChanged = false;

	function _isTableRepresentation() {
		var oRepresentation = oActiveStep.getSelectedRepresentation();
		if (oRepresentation.type === Constants.representationTypes.TABLE_REPRESENTATION) {
			return true;
		}
		return false;
	}

	function _isTreeTableRepresentation() {
		var oRepresentation = oActiveStep.getSelectedRepresentation();
		if (oRepresentation.type === Constants.representationTypes.TREE_TABLE_REPRESENTATION) {
			return true;
		}
		return false;
	}

	function _isToggleInstance() {
		if (oActiveStep.getSelectedRepresentation().bIsAlternateView === undefined || oActiveStep.getSelectedRepresentation().bIsAlternateView ===
			false) {
			return false;
		}
		return true;
	}

	function _getRequiredFilter(oController) {
		var oRepresentation = oController.getCurrentRepresentation();
		var aRequiredFilters = oRepresentation.getParameter().requiredFilters;
		if (aRequiredFilters === undefined || aRequiredFilters.length === 0) {
			return undefined;
		}
		return aRequiredFilters[0];
	}

	function _setHeightAndWidth(oController, oChartContent) {
		var oChartContainer = oController.byId("idChartContainer");
		var containerHeight = "0";
		var containerWidth = jQuery(window).width();
		var chartContainerID = oChartContainer.getId();
		if (jQuery("#" + chartContainerID).length !== 0) {
			containerHeight = jQuery("#" + chartContainerID + " > div:first-child > div:nth-child(2)").offset().top;
			containerWidth = jQuery("#" + chartContainerID + " > div:first-child > div:nth-child(2)").width();
		}
		var cHeight = (jQuery(window).height() - containerHeight) - jQuery(".applicationFooter").height();
		var cWidth = containerWidth;
		oChartContent.setHeight(cHeight + "px");
		oChartContent.setWidth(cWidth + "px");
	}

	function _setChartContainerContent(oController) {
		var oChartContainer = oController.byId("idChartContainer");
		var oRepresentation = oController.getCurrentRepresentation();
		var oTitle = oActiveStep.longTitle && !oCoreApi.isInitialTextKey(oActiveStep.longTitle.key) ? oActiveStep.longTitle : oActiveStep.title;
		var oStepTitle = oCoreApi.getTextNotHtmlEncoded(oTitle);
		var oChartContent = oRepresentation.getMainContent(oStepTitle);
		var fnSetHeightAndWidth = {
			onBeforeRendering: function () {
				_setHeightAndWidth(oController, oChartContent);
			}
		};
		oChartContent.addEventDelegate(fnSetHeightAndWidth);
		oChartContainer.removeAllContent();
		var oChartContainerContent = new ChartContainerContent({
			content: oChartContent
		});
		oChartContainer.addContent(oChartContainerContent);
	}

	function _setSelectionPropertyCountText(oController, oChartContainerToolbar) {
		var oSelectedText = oController.byId("idSelectedText");
		var oSelectedRepresentation = oController.getCurrentRepresentation();
		var selectionCount = _getSelectionCount(oController);
		var selectedDimension = oSelectedRepresentation.getSelectionFilterLabel();
		var selectedText = selectedDimension + " (" + selectionCount + ") ";
		var oSelectionContainer = oController.byId("idSelPropertyAndCount");
		if (!oSelectionContainer) {
			oSelectionContainer = new Link({
				id: oController.createId("idSelPropertyAndCount"),
				press: oController.handlePressSelectedPropertyCountLink.bind(oController)
			});
			oSelectionContainer.addAriaLabelledBy(oSelectedText.getId());
		} else if (oSelectionContainer && (oSelectedRepresentation.chart !== undefined) && (oSelectedRepresentation.chart !== null)) {
				oSelectedRepresentation.chart.detachEvent("setFocusOnSelectedLinkEvent", oSelectedRepresentation.chart.setFocusOnSelectLink);
		}

		if (oSelectionContainer && (oSelectedRepresentation.chart !== undefined) && (oSelectedRepresentation.chart !== null)) {
			oSelectedRepresentation.chart.setFocusOnSelectLink = function () {
				oSelectionContainer.focus();
			};
		}
		oSelectionContainer.setVisible(true);
		oSelectionContainer.setText(selectedText);
		oChartContainerToolbar.addContent(oSelectionContainer);
		oChartContainerToolbar.onAfterRendering = function () {
			if (oSelectionContainer && (oSelectedRepresentation.chart !== undefined) && (oSelectedRepresentation.chart !== null)) {
				oSelectedRepresentation.chart.fireEvent("setFocusOnSelectedLinkEvent");
				oSelectedRepresentation.chart.detachEvent("setFocusOnSelectedLinkEvent", oSelectedRepresentation.chart.setFocusOnSelectLink);
			}
		};
	}

	function _setCustomIconContent(oController) {
		var oChartContainer = oController.byId("idChartContainer");
		oChartContainer.removeAllCustomIcons();
		_setChartIcon(oController);
		_setAlternateRepIcon(oController);
		_setViewSettingsIcon(oController);
	}

	function _setChartIcon(oController) {
		var oChartContainer = oController.byId("idChartContainer");
		var representationInfo = oActiveStep.getSelectedRepresentationInfo();
		var sortDescription;
		if (representationInfo.parameter && representationInfo.parameter.orderby) {
			new Helper(oCoreApi).getRepresentationSortInfo(representationInfo).done(function (representationSortDetail) {
				var aSortFieldOrder = representationInfo.parameter.orderby;
				for (var i = 0; i < representationSortDetail.length; i++) {
					sortDescription = aSortFieldOrder[0].property;
				}
				var sortOrder = (aSortFieldOrder[0].ascending == true) ? "Sort Order: Ascending" : "Sort Order: Descending";
				var toolTipText = oCoreApi.getTextNotHtmlEncoded(representationInfo.label) + "\n" + ((sortDescription !== undefined) ? oCoreApi.getTextNotHtmlEncoded(
					"sortBy") + ": " + sortDescription : "") + "\n" + sortOrder;
				var selectedRepresentationIcon = new Icon({
					src: representationInfo.picture,
					tooltip: toolTipText,
					press: function (oEvent) {
						oController.handlePressChartIcon(oEvent);
					}
				});
				oChartContainer.addCustomIcon(selectedRepresentationIcon);
			});
		} else {
			var toolTipText = oCoreApi.getTextNotHtmlEncoded(representationInfo.label) + "\n" + ((sortDescription !== undefined) ? oCoreApi.getTextNotHtmlEncoded(
				"sortBy") + ": " + sortDescription : "");
			var selectedRepresentationIcon = new Icon({
				src: representationInfo.picture,
				tooltip: toolTipText,
				press: function (oEvent) {
					oController.handlePressChartIcon(oEvent);
				}
			});
			oChartContainer.addCustomIcon(selectedRepresentationIcon);
		}
	}

	function _setAlternateRepIcon(oController) {
		var oChartContainer = oController.byId("idChartContainer");
		var toolTipText = oCoreApi.getTextNotHtmlEncoded("listView");
		var alternateTableIcon = new sap.ui.core.Icon({
			src : "sap-icon://table-view",
			tooltip : toolTipText,
			press : oController.handlePressAlternateRepIcon.bind(oController)
		});
		var oRepresentation = oController.getCurrentRepresentation();
		var chartType = oRepresentation.type;
		if (_isTableRepresentation() || _isTreeTableRepresentation() || chartType == "TableRepresentation" ) {
			oChartContainer.removeCustomIcon(alternateTableIcon);
			return;
		}
		oChartContainer.addCustomIcon(alternateTableIcon);
	}

	function _setViewSettingsIcon(oController) {
		if ((oController.getCurrentRepresentation().topN !== undefined) || (!_isToggleInstance() && !_isTableRepresentation()) || (
				_isTreeTableRepresentation())) {
			return;
		}
		var oChartContainer = oController.byId("idChartContainer");
		var toolTipText = oCoreApi.getTextNotHtmlEncoded("view-Settings-Button");
		var sortButton = new Icon({
			src: "sap-icon://drop-down-list",
			tooltip: toolTipText,
			press: function () {
				oController.getCurrentRepresentation().getViewSettingDialog().open();
			}
		});
		oChartContainer.addCustomIcon(sortButton);
	}

	function _setSelectedText(oController, oChartContainerToolbar) {
		var oSelectedText = oController.byId("idSelectedText");
		if (!oSelectedText) {
			oSelectedText = new Label({
				id: oController.createId("idSelectedText"),
				text: oCoreApi.getTextNotHtmlEncoded("selectedValue")
			});
		}
		oSelectedText.setVisible(true);
		oChartContainerToolbar.addContent(oSelectedText);
	}

	function _setResetLink(oController, oChartContainerToolbar) {
		var oResetLink = oController.byId("idReset");
		if (!oResetLink) {
			oResetLink = new Button({
				text: oCoreApi.getTextNotHtmlEncoded("reset"),
				id: oController.createId("idReset"),
				type: "Transparent",
				press: oController.handlePressResetButton.bind(oController)
			}).addStyleClass("chartContainerResetStyle");
		}
		oResetLink.setVisible(true);
		oChartContainerToolbar.addContent(oResetLink);
	}

	function _setSelectionsAndTexts(oController, oChartContainerToolbar) {
		var selectionCount = _getSelectionCount(oController);
		if (selectionCount > 0 && _getRequiredFilter(oController) !== undefined) {
			_setSelectedText(oController, oChartContainerToolbar);
			_setSelectionPropertyCountText(oController, oChartContainerToolbar);
			_setResetLink(oController, oChartContainerToolbar);
		}
	}

	function _setPathFilterDisplayButton(oController, oChartContainerToolbar) {
		var oPathFilterDisplayButton = oController.byId("idPathFilterDisplayButton");
		if (!oPathFilterDisplayButton) {
			oPathFilterDisplayButton = new Button({
				text: oCoreApi.getTextNotHtmlEncoded("pathFilterDisplayButton"),
				id: oController.createId("idPathFilterDisplayButton"),
				icon: "sap-icon://message-information",
				type: "Transparent",
				press: function () {
					if (oController.byId("idStepLayout").getBusy() === false) {
						oCoreApi.getPathFilterInformation().then(function (pathFilterInformation) {
							// eslint-disable-next-line new-cap
							var pathFilterInformationDialog = new sap.ui.xmlview({
								viewName: "sap.apf.ui.reuse.view.pathFilterDisplay",
								viewData: {
									pathFilterInformation: pathFilterInformation,
									oCoreApi: oCoreApi,
									oUiApi: oUiApi
								},
								id: oController.createId("pathFilterDisplay")
							});
							pathFilterInformationDialog.setParent(oController.getView());
							pathFilterInformationDialog.getContent()[0].open();
						});
					}
				}
			});
		}
		oChartContainerToolbar.addContent(oPathFilterDisplayButton);
	}

	function _setToggleDisplayButton(oController, oChartContainerToolbar) {
		var oRepresentation = oController.getCurrentRepresentation();
		var chartType = oRepresentation.type;
		var oChartSelection = undefined;
		var chartPressedState = false;
		if (chartType !== "TableRepresentation" && chartType !== "listView" && chartType !== "TreeTableRepresentation" ) {
			if (oRepresentation.chart !== undefined) {
				if (Object.getOwnPropertyNames(oRepresentation.chart).length !== 0) {
					oChartSelection = oRepresentation.chart.vizSelection();
					chartPressedState = oRepresentation.chart.getVizProperties().plotArea.dataLabel.visible;
				}
			}
			var oSwitchDisplayButton = oController.byId("idToggleDisplayButton");
			if (!oSwitchDisplayButton) {
				oSwitchDisplayButton = new sap.m.ToggleButton({
					id: oController.createId("idToggleDisplayButton"),
					pressed: false,
					text: oCoreApi.getTextNotHtmlEncoded("values"),
					tooltip: oCoreApi.getTextNotHtmlEncoded("displayValues"),
					press: oController.handleToggleDisplay.bind(oController)
				});
			} else {
				oRepresentation = oController.getCurrentRepresentation();
				oSwitchDisplayButton.setPressed(chartPressedState);
			}
			if (oChartSelection !== undefined) {
				oController.getCurrentRepresentation().chart.vizSelection(oChartSelection, {
					clearSelection: false
				});
			}
			oChartContainerToolbar.addContent(oSwitchDisplayButton);
		}

	}

	function _setChartToolbarContent(oController) {
		var oChartContainer = oController.byId("idChartContainer");
		var oChartContainerToolbar = oChartContainer.getToolbar();
		oChartContainerToolbar.removeAllContent();
		// add text to the left
		var oCurrentStepLabel = new Label({
			text: oCoreApi.getTextNotHtmlEncoded("currentStep")
		});
		oChartContainerToolbar.addContent(oCurrentStepLabel);
		// add spacing
		var oSpacer = new ToolbarSpacer();
		oChartContainerToolbar.addContent(oSpacer);
		// add selections and texts
		_setToggleDisplayButton(oController, oChartContainerToolbar);
		_setSelectionsAndTexts(oController, oChartContainerToolbar);
		_setPathFilterDisplayButton(oController, oChartContainerToolbar);
		oChartContainerToolbar.addContent(new ChartContainerToolbarPlaceholder());
		oChartContainer.setToolbar(oChartContainerToolbar);
	}

	function _drawChartContainer(oController) {
		if (oActiveStep === undefined) {
			return;
		}
		_setChartContainerContent(oController);
		_setCustomIconContent(oController);
		_setChartToolbarContent(oController);
	}

	function _getSelectionCount(oController) {
		var selectedRepresentation = oController.getCurrentRepresentation();
		var selectionCount = selectedRepresentation.getSelections().length;
		return selectionCount;
	}

	function _drawPopOverContent(oController, oControlReference) {
		var oAllChartList = new List({
			mode: ListMode.SingleSelectMaster,
			showSeparators: ListSeparators.None,
			includeItemInSelection: true,
			selectionChange: oController.handleSelectionChartSwitchIcon.bind(oController)
		});
		var sortDescription;
		var oRepresentation;
		for (var j = 0; j < oActiveStep.getRepresentationInfo().length; j++) {
			oRepresentation = oActiveStep.getRepresentationInfo()[j];
			sortDescription = undefined;
			if (oRepresentation.parameter && oRepresentation.parameter.orderby) { //if orderby has a value then only get the sort description
				// eslint-disable-next-line no-loop-func
				new Helper(oCoreApi).getRepresentationSortInfo(oRepresentation).done(function (representationSortDetail) {
					var aSortDescription = [];
					for (var i = 0; i < representationSortDetail.length; i++) {
						representationSortDetail[i].done(function (sSortDescription) {
							aSortDescription.push(sSortDescription);
						});
					}
					sortDescription = aSortDescription.join(", ");
					var sDescriptionText = sortDescription !== undefined ? oCoreApi.getTextNotHtmlEncoded("sortBy") + ": " + sortDescription : "";
					var oItem = new StandardListItem({
						description: sDescriptionText,
						icon: oRepresentation.picture,
						title: oCoreApi.getTextNotHtmlEncoded(oRepresentation.label),
						customData: [new CustomData({
							key: 'data',
							value: {
								oRepresentationType: oRepresentation,
								icon: oRepresentation.picture
							}
						})]
					});
					oAllChartList.addItem(oItem);
				});
			} else {
				var sDescriptionText = sortDescription !== undefined ? oCoreApi.getTextNotHtmlEncoded("sortBy") + ": " + sortDescription : "";
				var oItem = new StandardListItem({
					description: sDescriptionText,
					icon: oRepresentation.picture,
					title: oCoreApi.getTextNotHtmlEncoded(oRepresentation.label),
					customData: [new CustomData({
						key: 'data',
						value: {
							oRepresentationType: oRepresentation,
							icon: oRepresentation.picture
						}
					})]
				});
				oAllChartList.addItem(oItem);
			}
		}
		if (!oController.byId("idAllChartPopover")) {
			var oShowAllChartPopover = new Popover({
				id: oController.createId("idAllChartPopover"),
				placement: PlacementType.Bottom,
				showHeader: false,
				content: [oAllChartList],
				afterClose: function () {
					oShowAllChartPopover.destroy();
				}
			});
		}
		oController.byId("idAllChartPopover").openBy(oControlReference);
	}

	function _setVisibleOfPropertyCountText(oController, bIsVisible) {
		oController.byId("idReset").setVisible(bIsVisible);
		oController.byId("idSelPropertyAndCount").setVisible(bIsVisible);
		oController.byId("idSelectedText").setVisible(bIsVisible);
	}
	/**
	 *@class stepContainer
	 *@name  stepContainer
	 *@memberOf sap.apf.ui.reuse.controller
	 *@description controller of view.stepContainer
	 */
	return BaseController.extend("sap.apf.ui.reuse.controller.stepContainer", {
		/**
		 *@this {sap.apf.ui.reuse.controller.stepContainer}
		 */
		onInit: function () {
			var oController = this;
			oCoreApi = oController.getView().getViewData().oCoreApi;
			oUiApi = oController.getView().getViewData().uiApi;
			oActiveStep = oCoreApi.getActiveStep();
			this.initialText = new Label({
				id: this.createId("idInitialText")
			}).addStyleClass('initialText');
			this.initialText.setText(oCoreApi.getTextNotHtmlEncoded('initialText'));
		},
		onAfterRendering: function () {
			var oController = this;
			jQuery(window).resize(function () {
				var offsetHeightForFilter = 90; // height of footer and facet filter needs to be adjusted in page size
				oCoreApi.getSmartFilterBarConfigurationAsPromise().done(function (smartFilterBarConfiguration) {
					if (smartFilterBarConfiguration) {
						offsetHeightForFilter = 165; // height of footer and smart filter bar needs to be adjusted in page size
					}
					var windowHeight = jQuery(window).height() - offsetHeightForFilter;
					jQuery('.layoutView').css({
						"height": windowHeight
					});
					oController.drawStepContent();
				});
			});
			// remaining code from getInitialStep:
			jQuery(oUiApi.getStepContainer().getDomRef()).hide();
			if (jQuery("#" + this.initialText.getId()).length === 0 && oCoreApi.getSteps().length === 0) {
				jQuery('#' + oUiApi.getStepContainer().getId()).parent().append(sap.ui.getCore().getRenderManager().getHTML(this.initialText));
			} else if (oCoreApi.getSteps().length > 0) {
				jQuery(oUiApi.getStepContainer().getDomRef()).show();
			}
			if (oUiApi.getAnalysisPath().getController().isOpenPath) {
				jQuery(".initialText").remove();
			}
		},
		getCurrentRepresentation: function () {
			var representationInstance = oActiveStep.getSelectedRepresentation();
			if (_isToggleInstance()) {
				representationInstance = oActiveStep.getSelectedRepresentation().toggleInstance;
			}
			return representationInstance;
		},
		handlePressSelectedPropertyCountLink: function () {
			var oController = this;
			oController.oCoreApi = oCoreApi;
			// eslint-disable-next-line new-cap
			var selectionDisplayDialog = new sap.ui.jsfragment("idSelectionDisplayFragment", "sap.apf.ui.reuse.fragment.selectionDisplay",
				oController);
			selectionDisplayDialog.open();
		},
		handleToggleDisplay: function () {
			var oController = this;
			oController.oCoreApi = oCoreApi;
			var oRepresentation = oController.getCurrentRepresentation();
			var oSwitchDisplayButton = oController.byId("idToggleDisplayButton");
			if (oRepresentation.measures !== undefined) {
				var sFormatString = oRepresentation.getFormatStringForMeasure(oRepresentation.measures[0]);
				if (oRepresentation.type === "PieChart") {
					oRepresentation.chart.setVizProperties({
						plotArea: {
							dataLabel: {
								visible: oSwitchDisplayButton.getPressed(),
								type: "percentage"
							}
						}
					});
				} else {
					oRepresentation.chart.setVizProperties({
						plotArea: {
							dataLabel: {
								visible: oSwitchDisplayButton.getPressed(),
								formatString: sFormatString
							}
						}
					});
				}
				return oRepresentation.chart.getVizProperties().plotArea.dataLabel.visible;
			}
			var visible = oRepresentation.chartPlotArea.plotArea.dataLabel.visible;
			visible = oSwitchDisplayButton.getPressed();
			return visible;
		},
		handlePressResetButton: function () {
			var oController = this;
			if (_isToggleInstance()) {
				oController.getCurrentRepresentation().removeAllSelection();
			}
			oController.getCurrentRepresentation().removeAllSelection();
			_setVisibleOfPropertyCountText(oController, false);
		},
		createToggleRepresentationInstance: function (oRepresentation, orderby) {
			var toggleInstance = {};

			function addAdditionalFields(param) {
				var dimensions = param.dimensions;
				var metadata = oRepresentation.getMetaData();
				param.isAlternateRepresentation = true;
				if (metadata === undefined) {
					return param;
				}
				var i, newField;
				for (i = 0; i < dimensions.length; i++) {
					var bSapTextExists = metadata.getPropertyMetadata(dimensions[i].fieldName).hasOwnProperty('text');
					if (bSapTextExists && dimensions[i].labelDisplayOption === CoreConstants.representationMetadata.labelDisplayOptions.KEY_AND_TEXT) {
						newField = {};
						newField.fieldName = metadata.getPropertyMetadata(dimensions[i].fieldName).text;
						param.dimensions.splice(i + 1, 0, newField); //add the text column for the dimension along with key column
					} else if (bSapTextExists && dimensions[i].labelDisplayOption === CoreConstants.representationMetadata.labelDisplayOptions.TEXT) {
						newField = {};
						newField.fieldName = metadata.getPropertyMetadata(dimensions[i].fieldName).text;
						param.dimensions.splice(i, 1, newField); // replace the key column with text column of the dimension
					}
				}
				return param;
			}
			var parameter = jQuery.extend(true, {}, oRepresentation.getParameter());
			delete parameter.alternateRepresentationTypeId;
			delete parameter.alternateRepresentationType;
			parameter = addAdditionalFields(parameter);
			if (orderby) {
				parameter.orderby = orderby;
			}
			// Using the APF Core method to create alternate representation instance
			toggleInstance = oCoreApi.createRepresentation(oRepresentation.getParameter().alternateRepresentationType.constructor, parameter);
			var data = oRepresentation.getData(),
				metadata = oRepresentation.getMetaData();
			if (data !== undefined && metadata !== undefined) {
				toggleInstance.setData(data, metadata);
			}
			return toggleInstance;
		},
		handlePressAlternateRepIcon: function () {
			var oController = this;
			var currentRepresentation = oActiveStep.getSelectedRepresentation();
			currentRepresentation.bIsAlternateView = true;
			if (_isToggleInstance()) {
				currentRepresentation.toggleInstance = oController.createToggleRepresentationInstance(currentRepresentation);
			}
			bRepresentationChanged = true;
			oController.getView().getViewData().uiApi.selectionChanged(true);
		},
		handlePressChartIcon: function (oEvent) {
			var oController = this;
			var currentRepresentation = oActiveStep.getSelectedRepresentation();
			var activeStepIndex = oCoreApi.getSteps().indexOf(oActiveStep);
			var oControlReference = null;
			if (oActiveStep.getRepresentationInfo().length > 1) {
				oControlReference = oEvent.getParameter("controlReference");
				_drawPopOverContent(oController, oControlReference);
			} else {
				currentRepresentation.bIsAlternateView = false;
				bRepresentationChanged = true;
				oUiApi.getAnalysisPath().getCarousel().getStepView(activeStepIndex).getController().drawThumbnailContent(true);
				oController.drawStepContent();
			}
		},
		handleSelectionChartSwitchIcon: function (oEvent) {
			var oController = this;
			oController.byId("idAllChartPopover").close();
			var oSelectedItem = oEvent.getParameter("listItem").getCustomData()[0].getValue();
			var activeStepIndex = oCoreApi.getSteps().indexOf(oActiveStep);
			var previousSelectedRepresentation = oActiveStep.getSelectedRepresentationInfo().representationId;
			var currentSelectedRepresentation = oSelectedItem.oRepresentationType.representationId;
			if (previousSelectedRepresentation === currentSelectedRepresentation && oActiveStep.getSelectedRepresentation().bIsAlternateView ===
				false) {
				return;
			}
			bRepresentationChanged = true;
			oActiveStep.getSelectedRepresentation().bIsAlternateView = false;
			oActiveStep.setSelectedRepresentation(oSelectedItem.oRepresentationType.representationId);
			oUiApi.getAnalysisPath().getController().refresh(oSelectedItem.nActiveStepIndex);
			oCoreApi.updatePath(oUiApi.getAnalysisPath().getController().callBackForUpdatePath.bind(oUiApi.getAnalysisPath().getController()));
			oUiApi.getAnalysisPath().getCarousel().getStepView(activeStepIndex).getController().drawThumbnailContent(true);
		},
		drawStepContent: function (bStepUpdated) {
			var oController = this,
				bIsActiveStepChanged = false;
			var oPreviousActiveStep = oActiveStep;
			oActiveStep = oCoreApi.getActiveStep();
			if (oPreviousActiveStep !== oActiveStep) {
				bIsActiveStepChanged = true;
			}
			var nActiveStepIndex = oCoreApi.getSteps().indexOf(oActiveStep);
			var oStep = oUiApi.getAnalysisPath().getCarousel().getStepView(nActiveStepIndex);
			if (oStep === undefined) {
				return;
			}
			var bThumbnailRefreshing = oStep.oThumbnailChartLayout.isBusy();
			if (bThumbnailRefreshing) {
				oController.byId("idStepLayout").setBusy(true);
			}
			if (bStepUpdated || bRepresentationChanged || bIsActiveStepChanged) {
				_drawChartContainer(oController);
			} else {
				_setChartToolbarContent(oController);
			}
			bRepresentationChanged = false;
			oController.byId("idStepLayout").setBusy(false);
		}
	});
}, true /* GLOBAL_EXPORT */ );