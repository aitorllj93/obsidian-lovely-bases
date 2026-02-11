import type { Meta } from "@storybook/react-vite";

import { MOVIES_ENTRIES, MY_NOTEBOOK } from "@/__fixtures__/entries";
import { HANDWRITTEN_FONTS } from "@/__fixtures__/typographies";
import { OVERLAY_ON_HOVER_LAYOUT_CONFIG as CARD_OVERLAY_ON_HOVER_LAYOUT_CONFIG } from "@/components/Card/__fixtures__/configs";
import { CONTAINER_WIDTHS } from "@/lib/sizes";
import { Providers } from "@/stories/decorators";

import GroupMeta, { type GroupStory, type Story } from "./meta";

const meta = {
	...GroupMeta,
	title: "Design System/Group/Notebook/Sizes",
	tags: ["internal"],
  args: {
    ...GroupMeta.args,
		entries: MOVIES_ENTRIES,
    groupKey: `[${MY_NOTEBOOK.file.basename}]`,
    groupShape: "notebook",
    titleFont: HANDWRITTEN_FONTS,
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

export const NineXS: Story = {
  name: "9XS",
  args: {
    ...CARD_OVERLAY_ON_HOVER_LAYOUT_CONFIG,
    titleFont: HANDWRITTEN_FONTS,
    contentMaxLength: 20,
    properties: ["note.author"],
    showContent: false,
    showPropertyTitles: false,
    cardSize: CONTAINER_WIDTHS['9XS'],
  } as unknown as Story["args"],
};

export const EightXS: Story = {
  name: "8XS",
  args: {
    ...CARD_OVERLAY_ON_HOVER_LAYOUT_CONFIG,
    titleFont: HANDWRITTEN_FONTS,
    contentMaxLength: 35,
    properties: [],
    showContent: true,
    showPropertyTitles: false,
    cardSize: CONTAINER_WIDTHS['8XS'],
  } as unknown as Story["args"],
};

export const SevenXS: Story = {
  name: "7XS",
  args: {
    ...CARD_OVERLAY_ON_HOVER_LAYOUT_CONFIG,
    titleFont: HANDWRITTEN_FONTS,
    contentMaxLength: 50,
    cardSize: CONTAINER_WIDTHS['7XS'],
  } as unknown as Story["args"],
};

export const SixXS: Story = {
  name: "6XS",
  args: {
    ...CARD_OVERLAY_ON_HOVER_LAYOUT_CONFIG,
    titleFont: HANDWRITTEN_FONTS,
    contentMaxLength: 50,
    cardSize: CONTAINER_WIDTHS['6XS'],
  } as unknown as Story["args"],
};

export const FiveXS: Story = {
  name: "5XS",
  args: {
    ...CARD_OVERLAY_ON_HOVER_LAYOUT_CONFIG,
    titleFont: HANDWRITTEN_FONTS,
    contentMaxLength: 50,
    cardSize: CONTAINER_WIDTHS['5XS'],
  } as unknown as Story["args"],
};

export const FourXS: Story = {
  name: "4XS",
  args: {
    ...CARD_OVERLAY_ON_HOVER_LAYOUT_CONFIG,
    titleFont: HANDWRITTEN_FONTS,
    contentMaxLength: 50,
    cardSize: CONTAINER_WIDTHS['4XS'],
  } as unknown as Story["args"],
};

export const ThreeXS: Story = {
  name: "3XS",
  args: {
    ...CARD_OVERLAY_ON_HOVER_LAYOUT_CONFIG,
    titleFont: HANDWRITTEN_FONTS,
    contentMaxLength: 50,
    cardSize: CONTAINER_WIDTHS['3XS'],
  } as unknown as Story["args"],
};

export const TwoXS: Story = {
  name: "2XS",
  args: {
    ...CARD_OVERLAY_ON_HOVER_LAYOUT_CONFIG,
    titleFont: HANDWRITTEN_FONTS,
    contentMaxLength: 50,
    cardSize: CONTAINER_WIDTHS['2XS'],
  } as unknown as Story["args"],
};

export const XS: Story = {
  name: "XS",
  args: {
    ...CARD_OVERLAY_ON_HOVER_LAYOUT_CONFIG,
    titleFont: HANDWRITTEN_FONTS,
    contentMaxLength: 50,
    cardSize: CONTAINER_WIDTHS.XS,
  } as unknown as Story["args"],
};

export const SM: Story = {
  name: "SM",
  args: {
    ...CARD_OVERLAY_ON_HOVER_LAYOUT_CONFIG,
    titleFont: HANDWRITTEN_FONTS,
    contentMaxLength: 50,
    cardSize: CONTAINER_WIDTHS.SM,
  } as unknown as Story["args"],
};

export const MD: Story = {
  name: "MD",
  args: {
    ...CARD_OVERLAY_ON_HOVER_LAYOUT_CONFIG,
    titleFont: HANDWRITTEN_FONTS,
    contentMaxLength: 50,
    cardSize: CONTAINER_WIDTHS.MD,
  } as unknown as Story["args"],
};

export const LG: Story = {
  name: "LG",
  args: {
    ...CARD_OVERLAY_ON_HOVER_LAYOUT_CONFIG,
    titleFont: HANDWRITTEN_FONTS,
    contentMaxLength: 50,
    cardSize: CONTAINER_WIDTHS.LG,
  } as unknown as Story["args"],
};

export const XL: Story = {
  name: "XL",
  args: {
    ...CARD_OVERLAY_ON_HOVER_LAYOUT_CONFIG,
    titleFont: HANDWRITTEN_FONTS,
    contentMaxLength: 50,
    cardSize: CONTAINER_WIDTHS.XL,
  } as unknown as Story["args"],
};

export const TwoXL: Story = {
  name: "2XL",
  args: {
    ...CARD_OVERLAY_ON_HOVER_LAYOUT_CONFIG,
    titleFont: HANDWRITTEN_FONTS,
    contentMaxLength: 50,
    cardSize: CONTAINER_WIDTHS['2XL'],
  } as unknown as Story["args"],
};

export const ThreeXL: Story = {
  name: "3XL",
  args: {
    ...CARD_OVERLAY_ON_HOVER_LAYOUT_CONFIG,
    titleFont: HANDWRITTEN_FONTS,
    contentMaxLength: 50,
    cardSize: CONTAINER_WIDTHS['3XL'],
  } as unknown as Story["args"],
};

export const FourXL: Story = {
  name: "4XL",
  args: {
    ...CARD_OVERLAY_ON_HOVER_LAYOUT_CONFIG,
    titleFont: HANDWRITTEN_FONTS,
    contentMaxLength: 50,
    cardSize: CONTAINER_WIDTHS['4XL'],
  } as unknown as Story["args"],
};

export const FiveXL: Story = {
  name: "5XL",
  args: {
    ...CARD_OVERLAY_ON_HOVER_LAYOUT_CONFIG,
    titleFont: HANDWRITTEN_FONTS,
    contentMaxLength: 50,
    cardSize: CONTAINER_WIDTHS['5XL'],
  } as unknown as Story["args"],
};

export const SixXL: Story = {
  name: "6XL",
  args: {
    ...CARD_OVERLAY_ON_HOVER_LAYOUT_CONFIG,
    titleFont: HANDWRITTEN_FONTS,
    contentMaxLength: 50,
    cardSize: CONTAINER_WIDTHS['6XL'],
  } as unknown as Story["args"],
};

export const SevenXL: Story = {
  name: "7XL",
  args: {
    ...CARD_OVERLAY_ON_HOVER_LAYOUT_CONFIG,
    titleFont: HANDWRITTEN_FONTS,
    contentMaxLength: 50,
    cardSize: CONTAINER_WIDTHS['7XL'],
  } as unknown as Story["args"],
};
