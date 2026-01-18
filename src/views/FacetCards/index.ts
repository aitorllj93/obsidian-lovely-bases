
import {
  DEFAULT_CARD_SIZE,
  DEFAULT_CONTENT_MAX_LENGTH,
  DEFAULT_IMAGE_ASPECT_RATIO,
  DEFAULT_IMAGE_FIT,
  DEFAULT_LAYOUT,
  DEFAULT_OVERLAY_CONTENT_VISIBILITY,
  DEFAULT_REVERSE_CONTENT,
  DEFAULT_SHAPE,
  DEFAULT_SHOW_CONTENT,
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
            overlay: "Overlay",
            polaroid: "Polaroid",
          },
        },
        {
          type: "dropdown",
          displayName: "Content Visibility",
          key: "overlayContentVisibility",
          default: DEFAULT_OVERLAY_CONTENT_VISIBILITY,
          options: {
            always: "Always Visible",
            hover: "Show on Hover",
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
        {
          type: "toggle",
          displayName: "Show Note Content",
          key: "showContent",
          default: DEFAULT_SHOW_CONTENT,
        },
        {
          type: "slider",
          displayName: "Content Max Length",
          key: "contentMaxLength",
          min: 0,
          max: 1000,
          step: 10,
          default: DEFAULT_CONTENT_MAX_LENGTH,
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
    {
      type: "group",
      displayName: "Badge",
      items: [
        {
          type: "property",
          displayName: "Badge Property",
          key: "badgeProperty",
        },
        {
          type: "text",
          displayName: "Badge Icon",
          key: "badgeIcon",
          placeholder: "star, heart, check...",
        },
        {
          type: "text",
          displayName: "Badge Color",
          key: "badgeColor",
          placeholder: "#D0A215",
        },
      ],
    },
  ],
};

export default FACET_CARDS_VIEW;
