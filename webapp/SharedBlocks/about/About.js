sap.ui.define(["sap/ui/core/library", 'sap/uxap/BlockBase'], function (coreLibrary, BlockBase) {
	"use strict";

	var ViewType = coreLibrary.mvc.ViewType;

	var AboutBlock = BlockBase.extend("webapp.SharedBlocks.about.About", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "webapp.SharedBlocks.about.About",
					type: ViewType.XML
				},
				Expanded: {
					viewName: "webapp.SharedBlocks.about.About",
					type: ViewType.XML
				}
			}
		}
	});
	return AboutBlock;
});
