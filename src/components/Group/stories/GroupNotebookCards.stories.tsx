import type { Meta } from "@storybook/react-vite";

import { APPLICATION_ENTRIES, ARTICLE_ENTRIES, BOOK_ENTRIES, MOVIES_ENTRIES, MY_APPLICATIONS, MY_ARTICLES, MY_BOOKS, MY_CONTACTS, MY_MOVIES, MY_PHOTOS, PERSON_ENTRIES, PHOTOS_ENTRIES } from "@/__fixtures__/entries";
import { FULL_CONFIG as CARD_FULL_CONFIG, OVERLAY_ON_HOVER_LAYOUT_CONFIG as CARD_OVERLAY_ON_HOVER_LAYOUT_CONFIG, CIRCLE_SHAPE_CONFIG, POLAROID_LAYOUT_CONFIG, ROUNDED_SHAPE_CONFIG } from "@/components/Card/__fixtures__/configs";
import { DEFAULTS as CARD_DEFAULTS } from "@/components/Card/constants";
import { Providers } from "@/stories/decorators";

import GroupMeta, { type GroupStory, type Story } from "./meta";

const meta = {
	...GroupMeta,
	title: "Design System/Group/Notebook/Cards",
	tags: ["internal"],
  args: {
    ...GroupMeta.args,
    groupShape: "notebook",
    groupColorProperty: "note.color",
    groupIconProperty: "note.icon",
  },
	decorators: [
		Providers,
		(Story) => (
			<div
				style={{
					padding: "40px",
				}}
			>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof GroupStory>;

export default meta;

export const VerticalCards: Story = {
	name: "Vertical Layout",
	args: {
    ...CARD_DEFAULTS,
    groupKey: `[${MY_BOOKS.file.basename}]`,
		entries: BOOK_ENTRIES,
    imageAspectRatio: 1.10,
    imageProperty: "formula.image",
    cardSize: 128,
	},
};

export const HorizontalCards: Story = {
	name: "Horizontal Layout",
	args: {
    ...CARD_FULL_CONFIG,
    groupKey: `[${MY_ARTICLES.file.basename}]`,
		entries: ARTICLE_ENTRIES,
    hoverProperty: undefined,
    cardSize: 128,
	},
};

export const OverlayCards: Story = {
	name: "Overlay Layout",
	args: {
    ...CARD_OVERLAY_ON_HOVER_LAYOUT_CONFIG,
    groupKey: `[${MY_MOVIES.file.basename}]`,
		entries: MOVIES_ENTRIES,
    cardSize: 128,
	},
};

export const PolaroidCards: Story = {
	name: "Polaroid Layout",
	args: {
    ...POLAROID_LAYOUT_CONFIG,
    groupKey: `[${MY_PHOTOS.file.basename}]`,
    entries: PHOTOS_ENTRIES,
    cardSize: 128,
	},
};

export const CircleCards: Story = {
	name: "Circle Shape",
	args: {
    ...CIRCLE_SHAPE_CONFIG,
    groupKey: `[${MY_CONTACTS.file.basename}]`,
		entries: PERSON_ENTRIES,
    cardSize: 128,
	},
};


export const RoundedCards: Story = {
	name: "Rounded Shape",
	args: {
    ...ROUNDED_SHAPE_CONFIG,
    groupKey: `[${MY_APPLICATIONS.file.basename}]`,
		entries: APPLICATION_ENTRIES,
    cardSize: 128,
	},
};
