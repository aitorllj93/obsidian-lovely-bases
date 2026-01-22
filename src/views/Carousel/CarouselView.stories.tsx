import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { APPLICATION_ENTRIES, ARTICLE_ENTRIES, BOOK_ENTRIES, MOVIES_ENTRIES, MOVIES_ENTRIES_GROUPED, PERSON_ENTRIES, PHOTOS_ENTRIES } from "@/__fixtures__/entries";

import CardMeta from '@/components/Card/Card.stories';
import { type NamespacedTranslationKey, translate } from "@/lib/i18n";
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

const t = (key: NamespacedTranslationKey<'common'>) => translate("en", 'common', key);
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
		// Grouping
		groupTitleProperty: {
			control: "text",
			name: t("options.grouping.groupTitleProperty.title"),
			description: "The property that contains the title to display at the top of the carousel.",
			table: {
				category: t("options.grouping.title"),
			},
		},
		groupSubtitleProperty: {
			control: "text",
			name: t("options.grouping.groupSubtitleProperty.title"),
			description: "The property that contains the subtitle to display below the title.",
			table: {
				category: t("options.grouping.title"),
			},
		},
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
	},
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FullExample: Story = {
	args: {
		groupedData: MOVIES_ENTRIES_GROUPED,
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
		data: PHOTOS_ENTRIES,
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
		onEntryClick: fn(),
		...ROUNDED_SHAPE_CONFIG,
	},
};

// === HEADER STORIES ===

export const WithTitleAndSubtitle: Story = {
	parameters: {
		docs: {
			description: {
				story: `Add groups titles and subtitles to provide context for the carousel section.

\`\`\`yml
groupTitleProperty: "note.sectionTitle"
groupSubtitleProperty: "note.sectionSubtitle"
\`\`\`
`,
			},
		},
	},
	args: {
		data: ARTICLE_ENTRIES,
		onEntryClick: fn(),
		...WITH_TITLE_SUBTITLE_CONFIG,
	},
};
