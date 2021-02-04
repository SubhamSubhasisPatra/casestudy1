sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    'use strict';
    return Controller.extend("webapp.controller.BaseController", {
        onInit : function(){

        },
        getRouter: function () {
            // return this.getOwnerComponent().getRouter();
            return  sap.ui.core.UIComponent.getRouterFor(this)
        }
    })

});


