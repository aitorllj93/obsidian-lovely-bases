import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { MOVIES_ENTRIES, VIRTUAL_SCROLL_MOVIES_ENTRIES, PHOTOS_ENTRIES, VIRTUAL_SCROLL_PHOTOS_ENTRIES } from "@/__fixtures__/entries";
import { aBasesEntryGroup } from "@/__mocks__";
import {
	createViewRenderer,
	Providers,
	ScrollViewWrapper,
} from "@/stories/decorators";

import INFINITE_GALLERY_VIEW from ".";
import {
	DEFAULT_BASE_CONFIG,
	FULL_BASE_CONFIG,
	MASONRY_BASE_CONFIG,
	POLAROID_BASE_CONFIG,
} from "./__fixtures__/config";
import InfiniteGalleryView, {
	type InfiniteGalleryConfig,
} from "./InfiniteGalleryView";

const View = createViewRenderer<InfiniteGalleryConfig>(InfiniteGalleryView);

const meta = {
	title: "Views/Infinite Gallery",
	component: View,
	tags: ["autodocs", "desktop-only"],
	decorators: [Providers, ScrollViewWrapper],
	parameters: {
    layout: 'fullscreen',
    extraNotes: [
      {
        title: 'Performance issues on mobile devices',
        description: 'The view may freeze or crash on some mobile devices even with small datasets (<100 items). Use this view only in desktop devices unless you know what you are doing.',
      }
    ],
		docs: {
			icon: INFINITE_GALLERY_VIEW.icon,
			subtitle:
				"An immersive, infinite virtualized grid for exploring your notes visually, perfect for browsing large collections of images or media-rich content.",
			description: {
				component: `### Features

- **Infinite Virtual Grid**: Seamlessly navigate through any number of notes without performance lag.
- **Momentum Drag & Scroll**: Fluid, natural-feeling navigation with momentum and smooth wheel support.
- **Artistic Layouts**:
  - **Horizontal**: Image and content side by side.
  - **Vertical**: Image and content stacked vertically.
  - **Overlay**: Content overlays the image.
  - **Polaroid**: A classic photo-album aesthetic with borders and playful rotations.
- **Geometric Shapes**: Custom card shapes including **Square**, **Circle** and **Rounded**.
- **Rich Content**: Display titles, properties, and note content with customizable visibility.

### Configuration`,
			},
		},
	},
	argTypes: {
		// Layout & Display
		layout: {
			control: "select",
			options: ["horizontal", "vertical", "overlay", "polaroid"],
			name: "Layout",
			description: "The layout style of the gallery.",
			table: {
				category: "Layout & Display",
			},
		},
		overlayContentVisibility: {
			control: "select",
			options: ["always", "hover"],
			name: "Overlay Content Visibility",
			description: "When to show overlay content.",
			table: {
				category: "Layout & Display",
			},
		},
		shape: {
			control: "select",
			options: ["square", "circle", "rounded"],
			name: "Shape",
			description: "The shape of the cards.",
			table: {
				category: "Layout & Display",
			},
		},
		cardSize: {
			control: { type: "range", min: 50, max: 800, step: 10 },
			name: "Card Size",
			description: "The size of the cards in the grid.",
			table: {
				category: "Layout & Display",
			},
		},
		reverseContent: {
			control: "boolean",
			name: "Reverse Content",
			description: "Reverse the order of image and content.",
			table: {
				category: "Layout & Display",
			},
		},
		masonry: {
			control: "boolean",
			name: "Masonry Layout",
			description: "Enable masonry-style staggered layout.",
			table: {
				category: "Layout & Display",
			},
		},
		tilt: {
			control: "select",
			options: ["none", "alternating"],
			name: "Card Tilt",
			description: "Apply rotation to cards for a playful effect.",
			table: {
				category: "Layout & Display",
			},
		},
		// Image
		imageProperty: {
			control: "text",
			name: "Image Property",
			description: "The property that contains the image to display on the cards.",
			table: {
				category: "Image",
			},
		},
		imageAspectRatio: {
			control: { type: "range", min: 0.25, max: 2.5, step: 0.05 },
			name: "Image Aspect Ratio",
			description: "The aspect ratio of the image cards.",
			table: {
				category: "Image",
			},
		},
		imageFit: {
			control: "select",
			options: ["cover", "contain"],
			name: "Image Fit",
			description: "How the image should fit within the card.",
			table: {
				category: "Image",
			},
		},
		// Content
		showTitle: {
			control: "boolean",
			name: "Show Title",
			description: "Display the entry title.",
			table: {
				category: "Content",
			},
		},
		showPropertyTitles: {
			control: "boolean",
			name: "Show Property Titles",
			description: "Display property titles.",
			table: {
				category: "Content",
			},
		},
		showContent: {
			control: "boolean",
			name: "Show Note Content",
			description: "Display note content.",
			table: {
				category: "Content",
			},
		},
		contentMaxLength: {
			control: { type: "range", min: 0, max: 1000, step: 10 },
			name: "Content Max Length",
			description: "Maximum length of content to display.",
			table: {
				category: "Content",
			},
		},
		// Hover Effects
		hoverProperty: {
			control: "text",
			name: "Hover Property",
			description: "Property to display on hover.",
			table: {
				category: "Hover Effects",
			},
		},
		hoverStyle: {
			control: "select",
			options: ["none", "overlay", "tooltip"],
			name: "Hover Style",
			description: "Style of hover effect.",
			table: {
				category: "Hover Effects",
			},
		},
		// Badge
		badgeProperty: {
			control: "text",
			name: "Badge Property",
			description: "Property to display as badge.",
			table: {
				category: "Badge",
			},
		},
		badgeIcon: {
			control: "text",
			name: "Badge Icon",
			description: "Icon for the badge.",
			table: {
				category: "Badge",
			},
		},
		badgeColor: {
			control: "color",
			name: "Badge Color",
			description: "Color for the badge.",
			table: {
				category: "Badge",
			},
		},
		// Internal props (disabled)
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
		properties: {
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
		data: VIRTUAL_SCROLL_MOVIES_ENTRIES,
		groupedData: [aBasesEntryGroup("", MOVIES_ENTRIES)],
		onEntryClick: fn(),
		...FULL_BASE_CONFIG,
	},
};

export const Default: Story = {
	parameters: {
		docs: {
			description: {
				story:
					"By default, the infinite gallery displays entries in a vertical layout with square cards.",
			},
		},
	},
	args: {
		data: VIRTUAL_SCROLL_MOVIES_ENTRIES,
		groupedData: [aBasesEntryGroup("", MOVIES_ENTRIES)],
		onEntryClick: fn(),
		...DEFAULT_BASE_CONFIG,
	},
};

// === LAYOUT STORIES ===

export const Masonry: Story = {
	parameters: {
		docs: {
			description: {
				story: `Display entries in a dynamic masonry layout with staggered rows.

\`\`\`yml
masonry: true
\`\`\`
`,
			},
		},
	},
	args: {
		data: VIRTUAL_SCROLL_MOVIES_ENTRIES,
		groupedData: [aBasesEntryGroup("", MOVIES_ENTRIES)],
		onEntryClick: fn(),
		...MASONRY_BASE_CONFIG,
	},
};

export const Polaroid: Story = {
	parameters: {
		docs: {
			description: {
				story: `Display entries with a classic photo-album aesthetic, featuring borders and playful rotations by using the polaroid layout with alternating tilt.

\`\`\`yml
layout: polaroid
tilt: alternating
masonry: true
\`\`\`
`,
			},
		},
	},
	args: {
		data: VIRTUAL_SCROLL_PHOTOS_ENTRIES,
		groupedData: [aBasesEntryGroup("", PHOTOS_ENTRIES)],
		onEntryClick: fn(),
		...POLAROID_BASE_CONFIG,
	},
};
