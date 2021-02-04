

sap.ui.define([
    "webapp/controller/BaseController",
    "sap/ui/model/json/JSONModel",
], function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("webapp.controller.Home", {

        onInit: function () {
            console.log('This is the home page ')
            var oLeaveModel = new JSONModel(sap.ui.require.toUrl("webapp/leaves.json"))
            sap.ui.getCore().setModel(oLeaveModel,'olm')
        },
        goToCreateItemPage : function(){
            this.getRouter().navTo("nCreate",{},false)
        },
        goToProfilePage : function(){
            this.getRouter().navTo("nProfile",{},false)
        }


    });

});