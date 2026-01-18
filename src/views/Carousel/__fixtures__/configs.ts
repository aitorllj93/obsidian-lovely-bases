


import type { CarouselConfig } from "@/views/Carousel/CarouselView";

export const DEFAULT_CONFIG: CarouselConfig = {
	layout: "vertical",
	shape: "square",
	cardSize: 400,
	imageProperty: "note.cover",
	imageAspectRatio: 1.5,
	imageFit: "cover",
	showTitle: true,
	showPropertyTitles: true,
	showContent: false,
	contentMaxLength: 200,
	properties: [
    'note.author',
  ],
	reverseContent: false,
	hoverProperty: undefined,
	hoverStyle: "none",
	overlayContentVisibility: "always",
	badgeProperty: undefined,
	badgeIcon: undefined,
	badgeColor: undefined,
} satisfies Partial<CarouselConfig>;

export const FULL_CONFIG: CarouselConfig = {
	...DEFAULT_CONFIG,
	layout: "horizontal",
	shape: "square",
	cardSize: 400,
	imageProperty: "note.banner",
	imageAspectRatio: 0.85,
	imageFit: "cover",
	showTitle: true,
	showPropertyTitles: false,
	properties: ["note.author", "note.published", "note.excerpt"],
	reverseContent: true,
	hoverProperty: "note.url",
	hoverStyle: "overlay",
} satisfies Partial<CarouselConfig>;

export const HORIZONTAL_LAYOUT_CONFIG: CarouselConfig = {
  ...DEFAULT_CONFIG,
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
}

export const OVERLAY_LAYOUT_CONFIG: CarouselConfig = {
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
}

export const CIRCLE_SHAPE_CONFIG: CarouselConfig = {
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
}


export const ROUNDED_SHAPE_CONFIG: CarouselConfig = {
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
}

export const POLAROID_LAYOUT_CONFIG: CarouselConfig = {
  ...DEFAULT_CONFIG,
  layout: 'polaroid',
  cardSize: 280,
  imageAspectRatio: 1,
  showTitle: true,
  showPropertyTitles: false,
  properties: [],
}

export const WITH_TITLE_SUBTITLE_CONFIG: CarouselConfig = {
	...HORIZONTAL_LAYOUT_CONFIG,
  imageProperty: 'note.banner',
	title: "Featured Collection",
	subtitle: "A curated selection of highlights",
} satisfies Partial<CarouselConfig>;
