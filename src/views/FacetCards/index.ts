import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";

import FacetCardsView from "./FacetCardsView";

const FACET_CARDS_ID = "facet-cards";

const FACET_CARDS_VIEW: BaseViewDef = {
	id: FACET_CARDS_ID,
	name: "Facet Cards",
	icon: "lucide-layout-grid",
	factory: (controller, containerEl) =>
		new ReactBasesView(FACET_CARDS_ID, FacetCardsView, controller, containerEl),
	options: () => [
		{
			type: "dropdown",
			displayName: "Layout",
			key: "layout",
			default: "vertical",
			options: {
				horizontal: "Horizontal",
				vertical: "Vertical",
			},
		},
		{
			type: "slider",
			displayName: "Card size",
			min: 50,
			max: 800,
			key: "cardSize",
			default: 100,
      step: 10
		},
    {
      type: 'group',
      displayName: 'Image',
      items: [
        {
          type: "property",
          displayName: "Image Property",
          key: "imageProperty",
          default: "note.cover",
        },
        {
          type: "dropdown",
          displayName: "Image Fit",
          key: "imageFit",
          default: "cover",
          options: {
            cover: "Cover",
            contain: "Contain",
          },
        },
        {
          type: "slider",
          displayName: "Image aspect ratio",
          min: 0.25,
          max: 2.5,
          key: "imageAspectRatio",
          default: 1.5,
          step: 0.05,
        },
        {
          type: "toggle",
          displayName: "Reverse Image and Content",
          key: "reverseContent",
          default: false,
        },
      ]
    },
    {
      type: 'group',
      displayName: 'Content',
      items: [
        {
          type: "toggle",
          displayName: "Show Property Titles",
          key: "showPropertyTitles",
          default: true,
        },
        {
          type: "toggle",
          displayName: "Show Title",
          key: "showTitle",
          default: true,
        },
        {
          type: "property",
          displayName: "Hover Property",
          key: "hoverProperty",
          default: "",
        },
      ]
    },
		// {
		// 	type: "dropdown",
		// 	displayName: "Hover Style",
		// 	key: "hoverStyle",
		// 	default: "overlay",
		// 	options: {
		// 		overlay: "Overlay (Bottom)",
		// 		tooltip: "Tooltip",
		// 		none: "None",
		// 	},
		// },
	],
};

export default FACET_CARDS_VIEW;
