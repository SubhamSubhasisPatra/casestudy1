// sap.ui.define([
// 	"sap/ui/core/UIComponent",
// 	"sap/ui/Device",
// ], function (UIComponent, Device, models) {
// 	"use strict";

// 	return UIComponent.extend("casestudy.webapp.Component", {

// 		metadata: {
// 			manifest: "json"
// 		},

// 		/**
// 		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
// 		 * @public
// 		 * @override
// 		 */

// 		init: function () {
// 			// call the base component's init function
// 			UIComponent.prototype.init.apply(this, arguments);

// 			// enable routing
// 			// this.getRouter().initialize();

// 			// set the device model
// 			// this.setModel(models.createDeviceModel(), "device");
// 		}
// 	});
// });

sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/resource/ResourceModel"
], function (UIComponent, JSONModel, ResourceModel) {
	"use strict";
	return UIComponent.extend("webapp.Component", {
		metadata: {
			manifest: "json"
		},
		init: function () {
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);


			// set i18 file
			let i18Model = new ResourceModel({
				bundleName: "webapp.i18n.i18n",
				supportedLocales: [""],
				fallbackLocale: ""
			})
			this.setModel(i18Model, "i18n")

			// set products demo model on this sample
			var oProductsModel = new JSONModel(sap.ui.require.toUrl("webapp/leaves.json"))
			this.setModel(oProductsModel, 'oml')
			// console.log(oProductsModel)



			// enable routing
			this.getRouter().initialize();

			// set the device model
			// this.setModel(models.createDeviceModel(), "device");
		},
		// editContextToggle: function (oEvent) {
		// 	var oView = this.getView();
		// 	var path = oEvent.getSource().getBindingContext("dummyData").getPath();
		// 	// create dialog lazily
		// 	if (!this.byId("openDialog")) {
		// 		// load asynchronous XML fragment
		// 		Fragment.load({
		// 			id: oView.getId(),
		// 			name: "webapp.view.inputdialog",
		// 			controller: this
		// 		}).then(function (oDialog) {
		// 			// connect dialog to the root view 
		// 			//of this component (models, lifecycle)
		// 			oView.addDependent(oDialog);
		// 			oDialog.bindElement({
		// 				path: path,
		// 				model: "dummyData"
		// 			});
		// 			oDialog.open();
		// 		});
		// 	}
		// },
		editContextToggle : function(){
			window.alert('clicked')
		}
	});
});