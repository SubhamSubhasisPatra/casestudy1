sap.ui.define([
	"webapp/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
	'sap/m/MessageBox'
], function (BaseController, JSONModel, Filter, FilterOperator, Sorter, MessageBox) {
	"use strict";

	return BaseController.extend("webapp.controller.Master", {
		onInit: function () {
			this.oView = this.getView();
			this._bDescendingSort = false;
			this.oProductsTable = this.oView.byId("leavesTable");
			console.log("Master control")

		},
		onAdd: function () {
			this.getRouter().navTo("nCreate", {}, false)
		},
		goToProfilePage: function () {
			this.getRouter().navTo("nProfile", {}, false)
			// alert("profile page")
		},

		onSearch: function (oEvent) {

			var oTableSearchState = []
			var sQuery = oEvent.getParameter("query");
			console.log(sQuery)

			if (sQuery && sQuery.length > 0) {
				oTableSearchState = [new Filter("Approver", FilterOperator.Contains, sQuery)]
				console.log(oTableSearchState)
			}
			this.getView().byId('leavesTable').getBinding("items").filter(oTableSearchState, "Application");
		},
		onListItemPress: function (oEvent) {

			// for get get the actual path for the data 
			var sPath = oEvent.getSource().getBindingContext("oml").getPath();
			var oModelOrder = this.getOwnerComponent().getModel("oml");
			var oDataSelected = oModelOrder.getProperty(sPath);


			// for expnadabel page
			var oFCL = this.oView.getParent().getParent();
			oFCL.setLayout(sap.f.LayoutType.TwoColumnsMidExpanded);



			//send the data to the details controller 

			var oModel = new JSONModel(oDataSelected)
			// console.log(oModel)
			this.getOwnerComponent().setModel(oModel, "transferModel")

			let indexOfModel = sPath.split("/")[2]

			this.getRouter().navTo("nDetail", {
				"jsonData": oDataSelected,
				"idOfData": indexOfModel
			})
			// this.getRouter().navTo("nDetail", { layout: sap.f.LayoutType.TwoColumnsMidExpanded, indexOfModel: indexOfModel })
		},
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
		onSort: function () {
			this._bDescendingSort = !this._bDescendingSort;
			var oBinding = this.oProductsTable.getBinding("items"),
				oSorter = new Sorter("Approver", this._bDescendingSort);

			oBinding.sort(oSorter);
		}


	});
});