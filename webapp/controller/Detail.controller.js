sap.ui.define([
    "webapp/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
], function (BaseController, JSONModel, Fragment) {
    "use strict";

    return BaseController.extend("webapp.controller.Detail", {

        onInit: function () {

            var oController = this
            oController.getRouter().getRoute("nDetail").attachPatternMatched(function () {
                var aHash = window.location.hash.split("/")
                console.log(aHash[2])
                var hashDataModel = {
                    "hashValue": aHash
                }
                var ohashModel = new JSONModel(hashDataModel)
                this.getView().setModel(ohashModel, "ohml")
                oController._onRouteMatched()
            }, oController)


        },
        _onRouteMatched: function (oEvent) {

            var oModel = this.getView().getModel('transferModel')
            var temp = {
                "demoModel": [
                    oModel.getData()
                ]
            }
            var oNewModel = new JSONModel(temp)
            this.getView().setModel(oNewModel, "dummyData")
            // console.log(oModel.getData())
        },
        backToHome: function () {
            this.getRouter().navTo("nBackToHome", {}, false)
        },
        calulateDateDifference: function (start_date, end_date) {

            var startDate = new Date(start_date)
            var endDate = new Date(end_date)
            var timeDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
            return timeDiff

        },
        addElement : function(){
            this.getRouter().navTo("nCreate",{},false)
        }
        ,
        editContextToggle: function (oEvent) {
            var oView = this.getView();
            // console.log(oView.getModel("dummyData"))
            var path = oEvent.getSource().getBindingContext("dummyData").getPath();
            // console.log(path)

            // create dialog lazily
            if (!this.byId("openDialog")) {
                // load asynchronous XML fragment
                Fragment.load({
                    id: oView.getId(),
                    name: "webapp.view.edit",
                    controller: this
                }).then(function (oDialog) {
                    // connect dialog to the root view 
                    //of this component (models, lifecycle)
                    oView.addDependent(oDialog);
                    oDialog.bindElement({
                        path: path,
                        model: "dummyData"
                    });
                    oDialog.open();
                });
            }
        },
        closeDialog: function () {
            this.byId("openDialog").destroy();
        },
        updateDialog: function () {
            console.log(this.getView().byId("approverTextId").getText())
            let Approver = this.getView().byId("approverTextId").getText()
            let casualLeave_id = this.getView().byId("casualLeave_id").getText()
            let sickLeave_id = this.getView().byId("sickLeave_id").getText()
            let TotalDates = this.getView().byId("TotalDates").getText()
            let halfDays = this.getView().byId("halfDays").getText()
            let leave_type_id = this.getView().byId("leave_type_id").getValue()
            let Status_id = this.getView().byId("Status_id").getValue()
            let leaveCancelReason = this.getView().byId("leaveCancelReason").getValue()
            let start_date = this.getView().byId("start_date").getValue()
            let end_date = this.getView().byId("end_date").getValue()
            let Reason = this.getView().byId("Reason").getValue()

            // update the casual and sick leave as well 
            const diffDate = this.calulateDateDifference(start_date, end_date)
            if (leave_type_id == 'sick leave'){
                sickLeave_id -= diffDate

            }else{
                casualLeave_id -= diffDate
            }


            // console.log(this.getView().getModel("dummyData").getProperty("/demoModel").pop())

            // try to display the constructer model / ahasModel data here
            let indexToBeDeteled = this.getView().getModel("ohml").getProperty("/hashValue")
            indexToBeDeteled = parseInt(indexToBeDeteled[2])
            console.log(indexToBeDeteled)
            let data = {
                "leave_type": leave_type_id,
                "start_date": start_date,
                "end_date": end_date,
                "TotalDates": TotalDates,
                "halfDays": halfDays,
                "Reason": Reason,
                "Approver": Approver,
                "Status": Status_id,
                "leaveCancelReason": leaveCancelReason,
                "casualLeave": casualLeave_id,
                "sickLeave": sickLeave_id
            }
            this.getView().getModel("oml").getProperty("/data").splice(indexToBeDeteled, 1, data)

            this.getView().getModel("oml").refresh()
            this.getView().getModel("dummyData").getProperty("/demoModel").pop()
            this.getView().getModel("dummyData").getProperty("/demoModel").push(
                {
                    "leave_type": leave_type_id,
                    "start_date": start_date,
                    "end_date": end_date,
                    "TotalDates": TotalDates,
                    "halfDays": halfDays,
                    "Reason": Reason,
                    "Approver": Approver,
                    "Status": Status_id,
                    "leaveCancelReason": leaveCancelReason,
                    "casualLeave": casualLeave_id,
                    "sickLeave": sickLeave_id
                }
            )
            this.getView().getModel("dummyData").refresh()


            // after click in the update the dialog will be destroyed
            this.closeDialog()

        },


        // formater 
        leaveStatusFormater: function (leaveStatus) {
            if (leaveStatus == 'true') {
                return "green"
            }
            else if (leaveStatus == 'false') {
                return "red"
            }
            else {
                return "orange"
            }
        },
        leaveTypeFormatter: function (leaveType) {
            if (leaveType === 'sick leave') {
                return "red"
            }
            else {
                return "green"
            }
        }




    });

});