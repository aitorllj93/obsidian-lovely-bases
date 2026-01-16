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
      type: "group",
      displayName: "Header",
      items: [
        {
          type: "text",
          displayName: "Title",
          key: "title",
          default: "",
        },
        {
          type: "text",
          displayName: "Subtitle",
          key: "subtitle",
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
  ],
}

export default CAROUSEL_VIEW;
