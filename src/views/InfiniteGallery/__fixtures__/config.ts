import { DEFAULT_CONTENT_MAX_LENGTH, DEFAULT_IMAGE_ASPECT_RATIO, DEFAULT_IMAGE_FIT, DEFAULT_LAYOUT, DEFAULT_OVERLAY_CONTENT_VISIBILITY, DEFAULT_REVERSE_CONTENT, DEFAULT_SHAPE, DEFAULT_SHOW_CONTENT, DEFAULT_SHOW_PROPERTY_TITLES, DEFAULT_SHOW_TITLE, DEFAULT_TILT } from "@/components/Card/config/constants";
import type { InfiniteGalleryConfig } from "../InfiniteGalleryView";

export const DEFAULT_BASE_CONFIG: InfiniteGalleryConfig = {
  layout: DEFAULT_LAYOUT,
  shape: DEFAULT_SHAPE,
  cardSize: 250,
  imageAspectRatio: DEFAULT_IMAGE_ASPECT_RATIO,
  imageFit: DEFAULT_IMAGE_FIT,
  imageProperty: "note.cover",
  reverseContent: DEFAULT_REVERSE_CONTENT,
  showTitle: DEFAULT_SHOW_TITLE,
  showPropertyTitles: DEFAULT_SHOW_PROPERTY_TITLES,
  showContent: DEFAULT_SHOW_CONTENT,
  contentMaxLength: DEFAULT_CONTENT_MAX_LENGTH,
  properties: [],
  hoverProperty: undefined,
  hoverStyle: "none",
  overlayContentVisibility: DEFAULT_OVERLAY_CONTENT_VISIBILITY,
  badgeProperty: undefined,
  badgeIcon: undefined,
  badgeColor: undefined,
  tilt: DEFAULT_TILT,
  masonry: false,
  linkProperty: undefined,
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
