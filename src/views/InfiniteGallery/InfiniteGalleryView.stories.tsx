import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { MOVIES_ENTRIES, PHOTOS_ENTRIES, VIRTUAL_SCROLL_BOOKS_ENTRIES, VIRTUAL_SCROLL_MOVIES_ENTRIES, VIRTUAL_SCROLL_PHOTOS_ENTRIES } from "@/__fixtures__/entries";
import { aBasesEntryGroup } from "@/__mocks__";
import CardMeta from '@/components/Card/stories/meta';
import { type NamespacedTranslationKey, translate } from "@/lib/i18n";
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

const t = (key: NamespacedTranslationKey<'infiniteGallery'>) => translate("en", 'infiniteGallery', key);
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
		masonry: {
			control: "boolean",
			name: t("options.grid.masonry.title"),
			description: "Enable masonry-style staggered layout.",
			table: {
				category: t("options.grid.title"),
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
		data: VIRTUAL_SCROLL_BOOKS_ENTRIES,
		groupedData: [aBasesEntryGroup("", VIRTUAL_SCROLL_BOOKS_ENTRIES)],
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
