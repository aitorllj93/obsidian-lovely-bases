
import {
  DEFAULT_CARD_SIZE,
  DEFAULT_IMAGE_ASPECT_RATIO,
  DEFAULT_IMAGE_FIT,
  DEFAULT_LAYOUT,
  DEFAULT_REVERSE_CONTENT,
  DEFAULT_SHAPE,
  DEFAULT_SHOW_PROPERTY_TITLES,
  DEFAULT_SHOW_TITLE,
} from "@/components/Card/config/constants";

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
      type: "group",
      displayName: "Layout & Display",
      items: [
        {
          type: "dropdown",
          displayName: "Layout",
          key: "layout",
          default: DEFAULT_LAYOUT,
          options: {
            horizontal: "Horizontal",
            vertical: "Vertical",
          },
        },
        {
          type: "dropdown",
          displayName: "Shape",
          key: "shape",
          default: DEFAULT_SHAPE,
          options: {
            square: "Square",
            circle: "Circle",
            rounded: "Rounded",
          },
        },
        {
          type: "slider",
          displayName: "Card Size",
          min: 50,
          max: 800,
          key: "cardSize",
          default: DEFAULT_CARD_SIZE,
          step: 10,
        },
        {
          type: "toggle",
          displayName: "Reverse Content",
          key: "reverseContent",
          default: DEFAULT_REVERSE_CONTENT,
        },
      ],
    },
    {
      type: "group",
      displayName: "Image",
      items: [
        {
          type: "property",
          displayName: "Image Property",
          key: "imageProperty",
        },
        {
          type: "slider",
          displayName: "Image Aspect Ratio",
          min: 0.25,
          max: 2.5,
          key: "imageAspectRatio",
          default: DEFAULT_IMAGE_ASPECT_RATIO,
          step: 0.05,
        },
        {
          type: "dropdown",
          displayName: "Image Fit",
          key: "imageFit",
          default: DEFAULT_IMAGE_FIT,
          options: {
            cover: "Cover",
            contain: "Contain",
          },
        },
      ],
    },
    {
      type: "group",
      displayName: "Content",
      items: [
        {
          type: "toggle",
          displayName: "Show Title",
          key: "showTitle",
          default: DEFAULT_SHOW_TITLE,
        },
        {
          type: "toggle",
          displayName: "Show Property Titles",
          key: "showPropertyTitles",
          default: DEFAULT_SHOW_PROPERTY_TITLES,
        },
      ],
    },
    {
      type: "group",
      displayName: "Hover Effects",
      items: [
        {
          type: "property",
          displayName: "Hover Property",
          key: "hoverProperty",
          default: "",
        },
        {
          type: "dropdown",
          displayName: "Hover Style",
          key: "hoverStyle",
          default: "none",
          options: {
            none: "None",
            overlay: "Overlay",
            tooltip: "Tooltip",
          },
        },
      ],
    },
  ],
};

export default FACET_CARDS_VIEW;
