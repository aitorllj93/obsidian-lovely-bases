import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { APPLICATION_ENTRIES, ARTICLE_ENTRIES, BOOK_ENTRIES, MOVIES_ENTRIES, PERSON_ENTRIES } from "@/__fixtures__/entries";
import { aBasesEntryGroup } from "@/__mocks__";
import {
	createViewRenderer,
	Providers,
	ViewWrapper,
} from "@/stories/decorators";

import CAROUSEL_VIEW from ".";
import {
	CIRCLE_SHAPE_CONFIG,
	DEFAULT_CONFIG,
	FULL_CONFIG,
	HORIZONTAL_LAYOUT_CONFIG,
	OVERLAY_LAYOUT_CONFIG,
	POLAROID_LAYOUT_CONFIG,
	ROUNDED_SHAPE_CONFIG,
	WITH_TITLE_SUBTITLE_CONFIG,
} from "./__fixtures__/configs";
import CarouselView, { type CarouselConfig } from "./CarouselView";

const View = createViewRenderer<CarouselConfig>(CarouselView);

const meta = {
	title: "Views/Carousel",
	component: View,
	tags: ["autodocs"],
	decorators: [Providers, ViewWrapper],
	parameters: {
		layout: "fullscreen",
		docs: {
			icon: CAROUSEL_VIEW.icon,
			subtitle:
				"A dynamic, horizontal scrolling experience that showcases your notes in a continuous flow. Perfect for highlight reels, featured notes, or visual storytelling.",
			description: {
				component: `### Features

- **Horizontal Sliding**: Fluid, touch-friendly scrolling through your note collection.
- **Smart Navigation**: Intuitive arrows and momentum support for easy browsing.
- **Title & Context**: Dedicated space for a section title and subtitle to provide context.
- **Rich Card Support**: Leverages the full power of the Facet Cards system for content display.
- **Entrance Animations**: Staggered motion effects as the carousel enters the view.

### Configuration`,
			},
		},
	},
	argTypes: {
		// Header
		title: {
			control: "text",
			name: "Title",
			description: "The title displayed at the top of the carousel.",
			table: {
				category: "Header",
			},
		},
		subtitle: {
			control: "text",
			name: "Subtitle",
			description: "The subtitle displayed below the title.",
			table: {
				category: "Header",
			},
		},
		// Display
		layout: {
			control: "select",
			name: "Layout",
			description: "Orientation of the cards in the carousel.",
			options: ["horizontal", "vertical", "overlay", "polaroid"],
			table: {
				category: "Display",
				defaultValue: { summary: "vertical" },
			},
		},
		shape: {
			control: "select",
			name: "Shape",
			description: "The shape of the cards.",
			options: ["square", "circle", "rounded"],
			table: {
				category: "Display",
				defaultValue: { summary: "square" },
			},
		},
		cardSize: {
			control: { type: "range", min: 50, max: 800, step: 10 },
			name: "Card Size",
			description: "The size of the cards in pixels.",
			table: {
				category: "Display",
				defaultValue: { summary: "400" },
			},
		},
		// Image
		imageProperty: {
			control: "text",
			name: "Image Property",
			description:
				"The property that contains the image to display on the cards.",
			table: {
				category: "Image",
				defaultValue: { summary: "note.cover" },
			},
		},
		imageFit: {
			control: "select",
			name: "Image Fit",
			description: "How the image should fit within its container.",
			options: ["cover", "contain"],
			table: {
				category: "Image",
				defaultValue: { summary: "cover" },
			},
		},
		imageAspectRatio: {
			control: { type: "range", min: 0.25, max: 2.5, step: 0.05 },
			name: "Image Aspect Ratio",
			description: "The aspect ratio of the image (width/height).",
			table: {
				category: "Image",
				defaultValue: { summary: "1.5" },
			},
		},
		reverseContent: {
			control: "boolean",
			name: "Reverse Image and Content",
			description: "Whether to reverse the order of image and content.",
			table: {
				category: "Image",
				defaultValue: { summary: "false" },
			},
		},
		// Content
		showTitle: {
			control: "boolean",
			name: "Show Title",
			description: "Whether to show the title on each card.",
			table: {
				category: "Content",
				defaultValue: { summary: "true" },
			},
		},
		showPropertyTitles: {
			control: "boolean",
			name: "Show Property Titles",
			description: "Whether to show the names of the displayed properties.",
			table: {
				category: "Content",
				defaultValue: { summary: "true" },
			},
		},
		hoverProperty: {
			control: "text",
			name: "Hover Property",
			description:
				"The property to display when hovering over a card (optional).",
			table: {
				category: "Content",
			},
		},
		hoverStyle: {
			control: "select",
			name: "Hover Style",
			description: "How to display the hover property.",
			options: ["overlay", "tooltip", "none"],
			table: {
				category: "Content",
				defaultValue: { summary: "overlay" },
			},
		},
		// Badge
		badgeProperty: {
			control: "text",
			name: "Badge Property",
			description: "The property to display as a badge on the card (optional). The badge appears in the top-right corner of the card image.",
			table: {
				category: "Badge",
			},
		},
		badgeIcon: {
			control: "text",
			name: "Badge Icon",
			description: "The Lucide icon name to display alongside the badge text (optional). See https://lucide.dev/icons for available icons.",
			table: {
				category: "Badge",
			},
		},
		badgeColor: {
			control: "color",
			name: "Badge Color",
			description: "The background color of the badge in hex format (e.g., #D0A215). Text color is automatically calculated for contrast.",
			table: {
				category: "Badge",
			},
		},
		// Internal props (disabled)
		properties: {
			table: {
				disable: true,
			},
		},
		data: {
			table: {
				disable: true,
			},
		},
		groupedData: {
			table: {
				disable: true,
			},
		},
		onEntryClick: {
			table: {
				disable: true,
			},
		},
		onEntryHover: {
			table: {
				disable: true,
			},
		},
	},
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FullExample: Story = {
	args: {
		data: ARTICLE_ENTRIES,
		groupedData: [aBasesEntryGroup("", ARTICLE_ENTRIES)],
		onEntryClick: fn(),
		...FULL_CONFIG,
	},
};

export const Default: Story = {
	parameters: {
		docs: {
			description: {
				story:
					"By default, the carousel displays cards in a vertical layout with basic configuration.",
			},
		},
	},
	args: {
		data: BOOK_ENTRIES,
		groupedData: [aBasesEntryGroup("", BOOK_ENTRIES)],
		onEntryClick: fn(),
		...DEFAULT_CONFIG,
    properties: [
      'note.author',
    ]
	},
};

// === LAYOUT STORIES ===

export const HorizontalLayout: Story = {
	parameters: {
		docs: {
			description: {
				story: `Horizontal layout displays the image on the side of the card content.

\`\`\`yml
layout: horizontal
\`\`\`
`,
			},
		},
	},
	args: {
		data: ARTICLE_ENTRIES,
		groupedData: [aBasesEntryGroup("", ARTICLE_ENTRIES)],
		onEntryClick: fn(),
		...HORIZONTAL_LAYOUT_CONFIG,
	},
};

export const OverlayLayout: Story = {
	parameters: {
		docs: {
			description: {
				story: `Overlay layout displays the content in an overlay. Additionally, you can configure the overlay content visibility to always show or only show when hovering.

\`\`\`yml
layout: overlay
overlayContentVisibility: hover | always
badgeProperty: note.rating
badgeIcon: star
badgeColor: #D0A215
\`\`\`
`,
			},
		},
	},
	args: {
		data: MOVIES_ENTRIES,
		groupedData: [aBasesEntryGroup("", MOVIES_ENTRIES)],
		onEntryClick: fn(),
		...OVERLAY_LAYOUT_CONFIG,
	},
};

export const PolaroidLayout: Story = {
	parameters: {
		docs: {
			description: {
				story: `Polaroid layout displays cards with a classic photo-album aesthetic, featuring white borders and a larger bottom margin.

\`\`\`yml
layout: polaroid
\`\`\`
`,
			},
		},
	},
	args: {
		data: MOVIES_ENTRIES,
		groupedData: [aBasesEntryGroup("", MOVIES_ENTRIES)],
		onEntryClick: fn(),
		...POLAROID_LAYOUT_CONFIG,
	},
};

// === SHAPE STORIES ===

export const CircleShape: Story = {
	parameters: {
		docs: {
			description: {
				story: `Circle shape creates rounded cards perfect for profile images or avatars.

\`\`\`yml
shape: circle
imageAspectRatio: 1
\`\`\`
`,
			},
		},
	},
	args: {
		data: PERSON_ENTRIES,
		groupedData: [aBasesEntryGroup("", PERSON_ENTRIES)],
		onEntryClick: fn(),
		...CIRCLE_SHAPE_CONFIG,
	},
};

export const RoundedShape: Story = {
	parameters: {
		docs: {
			description: {
				story: `Rounded shape provides a softer, more modern appearance.

\`\`\`yml
shape: rounded
\`\`\`
`,
			},
		},
	},
	args: {
		data: APPLICATION_ENTRIES,
		groupedData: [aBasesEntryGroup("", APPLICATION_ENTRIES)],
		onEntryClick: fn(),
		...ROUNDED_SHAPE_CONFIG,
	},
};

// === HEADER STORIES ===

export const WithTitleAndSubtitle: Story = {
	parameters: {
		docs: {
			description: {
				story: `Add a title and subtitle to provide context for the carousel section.

\`\`\`yml
title: "Featured Collection"
subtitle: "A curated selection of highlights"
\`\`\`
`,
			},
		},
	},
	args: {
		data: ARTICLE_ENTRIES,
		groupedData: [aBasesEntryGroup("", ARTICLE_ENTRIES)],
		onEntryClick: fn(),
		...WITH_TITLE_SUBTITLE_CONFIG,
	},
};
