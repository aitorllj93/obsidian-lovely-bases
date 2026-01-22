
import { DEFAULTS } from "@/components/Card/constants";
import type { CarouselConfig } from "@/views/Carousel/CarouselView";


export const DEFAULT_CONFIG: CarouselConfig = {
  /** Grouping */
  groupTitleProperty: undefined,
  groupSubtitleProperty: undefined,
  /* Layout & Display */
  layout: "vertical",
  overlayContentVisibility: "always",
  cardSize: 400,
  shape: "square",
  tilt: "none",
  /* Image */
  imageProperty: undefined,
  imageAspectRatio: 1.5,
  imageFit: "cover",
  reverseContent: false,
  /* Content */
  showTitle: true,
  showPropertyTitles: true,
  showContent: false,
  contentMaxLength: 200,
  /* Badges */
  badgeProperty: undefined,
  badgeIcon: undefined,
  badgeColor: undefined,
  /* Interactivity */
  linkProperty: undefined,
  hoverStyle: "none",
  hoverProperty: null,
  /* Internal */
  properties: [],
} satisfies Partial<CarouselConfig>;

export const FULL_CONFIG: CarouselConfig = {
  /** Grouping */
  groupTitleProperty: 'note.sectionTitle',
  groupSubtitleProperty: 'note.sectionSubtitle',
  /* Layout & Display */
  layout: 'overlay',
  overlayContentVisibility: 'hover',
  cardSize: 200,
  shape: "square",
  tilt: "none",
  /* Image */
  imageProperty: 'note.cover',
  imageAspectRatio: 1.5,
  imageFit: "cover",
  reverseContent: false,
  /* Content */
  showTitle: true,
  showPropertyTitles: true,
  showContent: true,
  contentMaxLength: 200,
  /* Badges */
  badgeProperty: 'note.rating',
  badgeIcon: 'star',
  badgeColor: '#D0A215',
  /* Interactivity */
  linkProperty: 'note.link',
  hoverStyle: "none",
  hoverProperty: null,
  /* Internal */
  properties: [],
} satisfies Partial<CarouselConfig>;

export const HORIZONTAL_LAYOUT_CONFIG: CarouselConfig = {
  ...DEFAULTS,
  layout: 'horizontal',
  shape: 'square',
  hoverProperty: 'note.url',
  hoverStyle: 'overlay',
  properties: [
    'note.author',
    'note.published',
    'note.excerpt',
  ],
  imageProperty: 'note.banner',
  imageAspectRatio: 0.85,
  cardSize: 400,
  imageFit: 'cover',
  reverseContent: false,
  showPropertyTitles: false,
  showTitle: true,
  badgeProperty: undefined,
  badgeIcon: undefined,
  badgeColor: undefined,
  tilt: "none",
}

export const OVERLAY_LAYOUT_CONFIG: CarouselConfig = {
  ...DEFAULTS,
  layout: 'overlay',
  shape: 'square',
  hoverProperty: undefined,
  hoverStyle: 'none',
  properties: [],
  imageProperty: 'note.cover',
  imageAspectRatio: 1.5,
  cardSize: 340,
  imageFit: 'cover',
  reverseContent: false,
  showPropertyTitles: false,
  showTitle: true,
  showContent: true,
  contentMaxLength: 200,
  overlayContentVisibility: 'always',
  badgeProperty: 'note.rating',
  badgeIcon: 'star',
  badgeColor: '#D0A215',
  tilt: "none",
  linkProperty: undefined,
}

export const CIRCLE_SHAPE_CONFIG: CarouselConfig = {
  ...DEFAULTS,
  layout: 'vertical',
  shape: 'circle',
  hoverProperty: undefined,
  hoverStyle: 'none',
  properties: [],
  imageProperty: 'note.cover',
  imageAspectRatio: 1,
  cardSize: 340,
  imageFit: 'cover',
  reverseContent: false,
  showPropertyTitles: false,
  showTitle: false,
  showContent: false,
  contentMaxLength: 200,
  overlayContentVisibility: 'always',
  badgeProperty: undefined,
  badgeIcon: undefined,
  badgeColor: undefined,
  tilt: "none",
  linkProperty: undefined,
}


export const ROUNDED_SHAPE_CONFIG: CarouselConfig = {
  ...DEFAULTS,
  layout: 'overlay',
  shape: 'rounded',
  hoverProperty: undefined,
  hoverStyle: 'none',
  properties: [],
  imageProperty: 'note.cover',
  imageAspectRatio: 1,
  cardSize: 340,
  imageFit: 'cover',
  reverseContent: false,
  showPropertyTitles: false,
  showTitle: true,
  showContent: false,
  contentMaxLength: 200,
  overlayContentVisibility: 'hover',
  badgeProperty: undefined,
  badgeIcon: undefined,
  badgeColor: undefined,
  tilt: "none",
  linkProperty: undefined,
}

export const POLAROID_LAYOUT_CONFIG: CarouselConfig = {
  ...DEFAULTS,
  layout: 'polaroid',
  cardSize: 280,
  imageProperty: 'note.banner',
  imageAspectRatio: 1,
  showTitle: true,
  showPropertyTitles: false,
  properties: [],
  tilt: "none",
}

export const WITH_TITLE_SUBTITLE_CONFIG: CarouselConfig = {
	...HORIZONTAL_LAYOUT_CONFIG,
  imageProperty: 'note.banner',
	groupTitleProperty: "note.sectionTitle",
	groupSubtitleProperty: "note.sectionSubtitle",
  tilt: "none",
} satisfies Partial<CarouselConfig>;
