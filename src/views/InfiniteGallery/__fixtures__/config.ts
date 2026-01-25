
import { DEFAULTS } from "@/components/Card/constants";

import type { InfiniteGalleryConfig } from "../InfiniteGalleryView";

export const DEFAULT_BASE_CONFIG: InfiniteGalleryConfig = {
  ...DEFAULTS,
  cardSize: 250,
  imageProperty: "note.cover",
  properties: [],
  masonry: false,
};

export const FULL_BASE_CONFIG: InfiniteGalleryConfig = {
	...DEFAULT_BASE_CONFIG,
	cardSize: 300,
	imageAspectRatio: 0.5,
	imageFit: "cover",
	layout: "horizontal",
  reverseContent: true,
	shape: "square",
	masonry: true,
  properties: [
    'note.author',
  ],
  showContent: true,
  contentMaxLength: 50,
  tilt: "alternating",
  linkProperty: undefined,
} satisfies Partial<InfiniteGalleryConfig>;

export const POLAROID_BASE_CONFIG: InfiniteGalleryConfig = {
  ...DEFAULT_BASE_CONFIG,
  layout: "polaroid",
  masonry: true,
  tilt: "alternating",
  cardSize: 200,
  imageAspectRatio: 1,
  imageProperty: "note.banner",
  showTitle: true,
  showPropertyTitles: false,
  properties: [],
  linkProperty: undefined,
};

export const MASONRY_BASE_CONFIG: InfiniteGalleryConfig = {
  ...DEFAULT_BASE_CONFIG,
  masonry: true,
  linkProperty: undefined,
};
