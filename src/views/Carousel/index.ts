import {
  DEFAULT_CONTENT_MAX_LENGTH,
  DEFAULT_OVERLAY_CONTENT_VISIBILITY,
  DEFAULT_SHOW_CONTENT,
} from "@/components/Card/config/constants";
import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";

import CarouselView from "./CarouselView";

const CAROUSEL_ID = 'carousel';

const CAROUSEL_VIEW: BaseViewDef = {
  id: CAROUSEL_ID,
  name: "Carousel",
  icon: "lucide-gallery-horizontal",
  factory: (controller, containerEl) =>
    new ReactBasesView(CAROUSEL_ID, CarouselView, controller, containerEl),

  options: () => [
    {
      type: "property",
      displayName: "Link Property",
      key: "linkProperty",
      default: "",
    },
    {
      type: "group",
      displayName: "Grouping",
      items: [
        {
          type: "property",
          displayName: "Title Property",
          key: "groupTitleProperty",
          default: "",
        },
        {
          type: "property",
          displayName: "Subtitle Property",
          key: "groupSubtitleProperty",
          default: "",
        },
      ],
    },
    {
      type: "group",
      displayName: "Display",
      items: [
        {
          type: "dropdown",
          displayName: "Layout",
          key: "layout",
          default: "vertical",
          options: {
            horizontal: "Horizontal",
            vertical: "Vertical",
            overlay: "Overlay",
            polaroid: "Polaroid",
          },
        },
        {
          type: "dropdown",
          shouldHide: (config) => config.get("layout") !== "overlay",
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
          default: "square",
          options: {
            square: "Square",
            circle: "Circle",
            rounded: "Rounded",
          },
        },
        {
          type: "slider",
          displayName: "Card Size",
          key: "cardSize",
          min: 50,
          max: 800,
          default: 400,
          step: 10,
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
          displayName: "Image Aspect Ratio",
          key: "imageAspectRatio",
          min: 0.25,
          max: 2.5,
          step: 0.05,
          default: 1.5,
        },
        {
          type: "toggle",
          displayName: "Reverse Image and Content",
          key: "reverseContent",
          default: false,
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
          default: true,
        },
        {
          type: "toggle",
          displayName: "Show Property Titles",
          key: "showPropertyTitles",
          default: true,
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
          default: "overlay",
          options: {
            overlay: "Overlay",
            tooltip: "Tooltip",
            none: "None",
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
}

export default CAROUSEL_VIEW;
