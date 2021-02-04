
sap.ui.define([
    "webapp/controller/BaseController",
], function (BaseController) {
    "use strict";

    return BaseController.extend("webapp.controller.Profile", {

        onInit: function () {
            console.log('This is the Profile page ')
        },
        backToHome : function(){
            this.getRouter().navTo("nBackToHome",{},false)
        }


    });

});