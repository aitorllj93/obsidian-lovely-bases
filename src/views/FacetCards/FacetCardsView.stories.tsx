import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import {
	VIRTUAL_SCROLL_APPLICATION_ENTRIES,
	VIRTUAL_SCROLL_ARTICLES_ENTRIES,
	VIRTUAL_SCROLL_BOOKS_ENTRIES,
	VIRTUAL_SCROLL_MOVIES_ENTRIES,
	VIRTUAL_SCROLL_PERSON_ENTRIES,
  VIRTUAL_SCROLL_PHOTOS_ENTRIES,
} from "@/__fixtures__/entries";
import CardMeta from '@/components/Card/stories/meta';
import {
	createViewRenderer,
	Providers,
	ScrollViewWrapper,
} from "@/stories/decorators";

import FACET_CARDS_VIEW from ".";
import {
  CIRCLE_SHAPE_CONFIG,
	DEFAULT_CONFIG,
	FULL_CONFIG,
	HORIZONTAL_LAYOUT_CONFIG,
  OVERLAY_LAYOUT_CONFIG,
  POLAROID_LAYOUT_CONFIG,
  ROUNDED_SHAPE_CONFIG,
} from "./__fixtures__/configs";
import FacetCardsView, { type FacetCardsConfig } from "./FacetCardsView";

const View = createViewRenderer<FacetCardsConfig>(FacetCardsView);

const meta = {
	title: "Views/Facet Cards",
	component: View,
	tags: ["autodocs", "status:testing"],
	decorators: [Providers, ScrollViewWrapper],
	parameters: {
		layout: "fullscreen",
		docs: {
			icon: FACET_CARDS_VIEW.icon,
			subtitle:
				"A structured, property-rich card view that gives you more control over how your note data is displayed. Perfect for databases, catalogs, or property-heavy notes.",
			description: {
				component: `### Features

- **Flexible Layouts**: Choose between **Vertical** (image on top), **Horizontal** (image on the side) or **Overlay** (content in an overlay) layouts.
- **Rich Media Integration**: Display images from any note property with precise control over aspect ratio and fit.
- **Property-Focused**: Dedicated space for displaying multiple note properties with optional labels.
- **Interactive Effects**: Enhance your cards with hover-activated overlays for extra information.
- **Highly Responsive**: Automatically scales and adapts to any screen size while maintaining performance.

### Configuration`,
			},
		},
	},
	argTypes: {
    ...CardMeta.argTypes,
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
		onEntryHover: {
			table: {
				disable: true,
			},
		},
  }
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FullExample: Story = {
	args: {
		data: VIRTUAL_SCROLL_ARTICLES_ENTRIES,
		onEntryClick: fn(),
		...FULL_CONFIG,
	},
};

export const Default: Story = {
	parameters: {
		docs: {
			description: {
				story:
					"By default, the view displays cards in a vertical layout with square shape, showing titles and property labels.",
			},
		},
	},
	args: {
		data: VIRTUAL_SCROLL_BOOKS_ENTRIES,
		onEntryClick: fn(),
		...DEFAULT_CONFIG,
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
		data: VIRTUAL_SCROLL_ARTICLES_ENTRIES,
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
		data: VIRTUAL_SCROLL_MOVIES_ENTRIES,
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
		data: VIRTUAL_SCROLL_PHOTOS_ENTRIES,
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
\`\`\`
`,
			},
		},
	},
	args: {
		data: VIRTUAL_SCROLL_PERSON_ENTRIES,
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
		data: VIRTUAL_SCROLL_APPLICATION_ENTRIES,
		onEntryClick: fn(),
		...ROUNDED_SHAPE_CONFIG,
	},
};
