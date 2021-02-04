
sap.ui.define([
    "webapp/controller/BaseController",
], function (BaseController) {
    "use strict";

    return BaseController.extend("webapp.controller.CreateItem", {

        onInit: function () {
            console.log('This is the Create Item page ')
        },
        backToHome : function(){
            this.getRouter().navTo("nBackToHome",{},false)
        },
        dataSave : function(){
            var leave_type = this.getView().byId("leave_type_id").getValue()
            var approverName = this.getView().byId("ApproverName_id").getValue();
            var leaveCancelReason = this.getView().byId("leaveCancelReason_id").getValue();
            var casualLeave = this.getView().byId("casualLeave_id").getValue();
            var sickLeave = this.getView().byId("sickLeave_id").getValue();
            var statusId = this.getView().byId("Status_id").getValue();
            var reason = this.getView().byId("Reason_id").getValue();
            var halfDay = this.getView().byId("halfDays_id").getValue();
            var totalLeaves = this.getView().byId("TotalDates_id").getValue();
            var startDate = this.getView().byId("start_date_id").getValue(); 
            var endDate = this.getView().byId("end_date_id").getValue();

            this.getView().getModel("oml").getProperty("/data").push(
                {
                    "leave_type": leave_type,
                    "start_date": startDate,
                    "end_date": endDate,
                    "TotalDates": totalLeaves,
                    "halfDays": halfDay,
                    "Reason": reason,
                    "Approver": approverName,
                    "Status": statusId,
                    "leaveCancelReason": leaveCancelReason,
                    "casualLeave": casualLeave,
                    "sickLeave": sickLeave
                }
            )
            this.getView().getModel("oml").refresh()
            console.log(this.getView().getModel("oml").getData())
            // console.log(approverName,leaveCanelReason,casualLeave,sickLeave)
            this.getRouter().navTo("nBackToHome", {}, false)
        }


    });

});