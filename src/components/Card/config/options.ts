import type { GroupOption } from "obsidian";

import {
  DEFAULT_LAYOUT,
  DEFAULT_IMAGE_ASPECT_RATIO,
  DEFAULT_IMAGE_FIT,
  DEFAULT_REVERSE_CONTENT,
  DEFAULT_SHOW_PROPERTY_TITLES,
  DEFAULT_SHOW_TITLE,
} from "./constants";

export const CARD_CONFIG_OPTIONS: GroupOption["items"] = [
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
    type: "property",
    displayName: "Image Property",
    key: "imageProperty",
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
  {
    type: "slider",
    displayName: "Image aspect ratio",
    min: 0.25,
    max: 2.5,
    key: "imageAspectRatio",
    default: DEFAULT_IMAGE_ASPECT_RATIO,
    step: 0.05,
  },
    {
      type: "toggle",
      displayName: "Reverse Image and Content",
      key: "reverseContent",
      default: DEFAULT_REVERSE_CONTENT,
    },
    {
      type: "toggle",
      displayName: "Show Property Titles",
      key: "showPropertyTitles",
      default: DEFAULT_SHOW_PROPERTY_TITLES,
    },
    {
      type: "toggle",
      displayName: "Show Title",
      key: "showTitle",
      default: DEFAULT_SHOW_TITLE,
    },
    {
      type: "property",
      displayName: "Hover Property",
      key: "hoverProperty",
      default: "",
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
]
