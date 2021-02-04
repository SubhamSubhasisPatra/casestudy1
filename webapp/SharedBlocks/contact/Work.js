sap.ui.define(["sap/ui/core/library", 'sap/uxap/BlockBase'], function (coreLibrary, BlockBase) {
	"use strict";

	var ViewType = coreLibrary.mvc.ViewType;

	var ContactBlock = BlockBase.extend("webapp.SharedBlocks.contact.Work", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "webapp.SharedBlocks.contact.Work",
					type: ViewType.XML
				},
				Expanded: {
					viewName: "webapp.SharedBlocks.contact.Work",
					type: ViewType.XML
				}
			}
		}
	});
	return ContactBlock;
});
