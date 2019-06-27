sap.ui.define([
    "sap/ui/core/Control",
    "sap/m/Input",
    "sap/m/Button",
    "sap/m/HBox"
], function (Control, Input, Button, HBox) {
    "use strict"
    return Control.extend("app.modules.mainmodule.control.QuantityInput", {
        metadata: {
            properties: {
                value: {
                    type: "string"
                }
            },
            aggregations: {
                _HBox: {
                    type: "sap.m.HBox",
                    multiple: false,
                    visibility: "hidden"
                },
                _input: {
                    type: "sap.m.Input",
                    multiple: false,
                    visibility: "hidden"
                },
                _buttonMinus: {
                    type: "sap.m.Button",
                    multiple: false,
                    visibility: "hidden"
                },
                _buttonPlus: {
                    type: "sap.m.Button",
                    multiple: false,
                    visibility: "hidden"
                }
            },
            events: {
                change: {
                    parameters: {
                        value: {
                            type: "int"
                        }
                    }
                }
            }
        },
        init: function () {
            var that = this;
            this.setAggregation("_HBox", new HBox({
                width: "8em",
                items: [
                    new Input({
                        value: that.getValue(),
                        liveChange: this._onInputChange.bind(this)
                    }), new Button({
                        text: "",
                        icon: "sap-icon://less",
                        press: this._onButtonMinusPress
                    }).addStyleClass("sapUiSmallMarginBegin"),
                    new Button({
                        text: "",
                        icon: "sap-icon://add",
                        press: this._onButtonPlusPress
                    })
                ]

            }))
        },
        _onInputChange: function (oEvent) {
            
            var nValue = Number(oEvent.getParameter("value"));
            if (parseInt(nValue, 10) != nValue) {
                this.setProperty("value", parseInt(nValue, 10), false);
            } else {this.setProperty("value", String(parseInt(nValue, 10)), false);}
        },
        _onButtonMinusPress: function () {
            var nCurrent = this.getParent().getItems()[0].getProperty("value");
            this.getParent().getItems()[0].setProperty("value", nCurrent - 1);
        },
        _onButtonPlusPress: function () {
            var nCurrent = this.getParent().getItems()[0].getProperty("value");
            this.getParent().getItems()[0].setProperty("value", nCurrent + 1);
        },
        renderer: function (oRM, oControl) {
            oRM.write("<div");
            oRM.writeControlData(oControl);
            oRM.writeClasses();
            oRM.write(">");
            oRM.renderControl(oControl.getAggregation("_HBox"));
            oRM.write("</div>");
        }
    })
})