import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";

import InfiniteGalleryView from "./InfiniteGalleryView";

const INFINITE_GALLERY_ID = "infinite-gallery";

const INFINITE_GALLERY_VIEW: BaseViewDef = {
	id: INFINITE_GALLERY_ID,
	name: "Infinite Gallery",
	icon: "lucide-infinity",
	factory: (controller, containerEl) =>
		new ReactBasesView(INFINITE_GALLERY_ID, InfiniteGalleryView, controller, containerEl),
  options: () => [
    {
      type: "dropdown",
      displayName: "Layout",
      key: "layout",
      default: "masonry",
      options: {
        default: "Default",
        masonry: "Masonry",
        polaroid: "Polaroid",
      },
    },
    {
      type: "slider",
      displayName: "Card size",
      min: 50,
      max: 800,
      key: "cardSize",
      default: 100,
    },
    {
      type: "property",
      displayName: "Image property",
      key: "imageProperty",
    },
    {
      type: "dropdown",
      displayName: "Image fit",
      key: "imageFit",
      default: "cover",
      options: {
        cover: "Cover",
        contain: "Contain",
      },
    },
    {
      type: "slider",
      displayName: "Aspect ratio",
      min: 0.25,
      max: 2.5,
      key: "aspectRatio",
      default: 1.5,
      step: 0.05,
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
        // TODO: Enable this once Obsidian's webview supports it
        // squircle: 'Squircle',
      },
    },
  ],
};

export default INFINITE_GALLERY_VIEW;
