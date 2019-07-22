sap.ui.define([
    "sap/ui/core/Control",
    "sap/f/Avatar",
    "sap/m/Label",
    "sap/m/VBox"
], function (Control, Avatar, Label, VBox) {
    "use strict"
    return Control.extend("app.modules.mainmodule.control.TileCreated", {
        metadata: {
            properties: {
                text: {
                    type: "string"
                },
                src: {
                    type: "string"
                },
                width: {
                    type: "sap.ui.core.CSSSize",
                    defaultValue: "90px"
                },
                height: {
                    type: "sap.ui.core.CSSSize",
                    defaultValue: "90px"
                },
                avatarSize: {
                    type: "string",
                    defaultValue: "XL"
                }
            },
            aggregations: {
                _VBox: {
                    type: "sap.m.VBox",
                    multiple: false,
                    visibility: "hidden"
                },
                _Label: {
                    type: "sap.m.Label",
                    multiple: false,
                    visibility: "hidden"
                },
                _Avatar: {
                    type: "sap.f.Avatar",
                    multiple: false,
                    visibility: "hidden"
                }
            },
            events: {
                press: {
                    parameters: {
                        value: {
                            type: "string"
                        }
                    }
                }
            }
        },
        init: function (){
            var that = this;
            this.setAggregation("_VBox", new VBox({
                height: that.getProperty("height"),
                width: that.getProperty("width"),
                items: [
                    new Label({
                     text: that.getProperty("text")
                    }),
                    new Avatar({
                        src: "sap-icon://less",
                    }).addStyleClass("sapUiSmallMargin")
                ]
            }))
        },
        onAfterRendering: function(){
            debugger
        },
        _onTileCreatedPress: function (oEvent) {
            console.log("TileCreated");

        },
        renderer: function (oRM, oControl) {
            oRM.write("<div");
            oRM.writeControlData(oControl);
            oRM.writeClasses();
            oRM.write(">");
            oRM.renderControl(oControl.getAggregation("_VBox"));
            oRM.write("</div>");
        }
    })
})