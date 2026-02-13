import type { Meta } from "@storybook/react-vite";

import { MOVIES_ENTRIES, MY_NOTEBOOK } from "@/__fixtures__/entries";
import { HANDWRITTEN_FONTS } from "@/__fixtures__/typographies";
import { OVERLAY_ON_HOVER_LAYOUT_CONFIG } from "@/components/Card/__fixtures__/configs";
import { CONTAINER_WIDTHS } from "@/lib/sizes";
import { Providers } from "@/stories/decorators";

import GroupMeta, { type GroupStory, type Story } from "./meta";

const meta = {
	...GroupMeta,
	title: "Design System/Group/Notebook/Sizes",
	tags: ["internal"],
  args: {
    ...GroupMeta.args,
    ...OVERLAY_ON_HOVER_LAYOUT_CONFIG,
		entries: MOVIES_ENTRIES,
    groupKey: `[[${MY_NOTEBOOK.file.basename}]]`,
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
    contentMaxLength: 20,
    properties: ["note.author"],
    showContent: false,
    cardSize: CONTAINER_WIDTHS['9XS'] + 40,
  }
};

export const EightXS: Story = {
  name: "8XS",
  args: {
    contentMaxLength: 35,
    cardSize: CONTAINER_WIDTHS['8XS'] + 40,
  }
};

export const SevenXS: Story = {
  name: "7XS",
  args: {
    cardSize: CONTAINER_WIDTHS['7XS'] + 40,
  }
};

export const SixXS: Story = {
  name: "6XS",
  args: {
    cardSize: CONTAINER_WIDTHS['6XS'] + 40,
  }
};

export const FiveXS: Story = {
  name: "5XS",
  args: {
    cardSize: CONTAINER_WIDTHS['5XS'] + 40,
  }
};

export const FourXS: Story = {
  name: "4XS",
  args: {
    cardSize: CONTAINER_WIDTHS['4XS'] + 40,
  }
};

export const ThreeXS: Story = {
  name: "3XS",
  args: {
    cardSize: CONTAINER_WIDTHS['3XS'] + 40,
  }
};

export const TwoXS: Story = {
  name: "2XS",
  args: {
    cardSize: CONTAINER_WIDTHS['2XS'] + 40,
  }
};

export const XS: Story = {
  name: "XS",
  args: {
    cardSize: CONTAINER_WIDTHS.XS + 40,
  }
};

export const SM: Story = {
  name: "SM",
  args: {
    cardSize: CONTAINER_WIDTHS.SM + 40,
  }
};

export const MD: Story = {
  name: "MD",
  args: {
    cardSize: CONTAINER_WIDTHS.MD + 40,
  }
};

export const LG: Story = {
  name: "LG",
  args: {
    cardSize: CONTAINER_WIDTHS.LG + 40,
  }
};

export const XL: Story = {
  name: "XL",
  args: {
    cardSize: CONTAINER_WIDTHS.XL + 40,
  }
};

export const TwoXL: Story = {
  name: "2XL",
  args: {
    cardSize: CONTAINER_WIDTHS['2XL'] + 40,
  }
};

export const ThreeXL: Story = {
  name: "3XL",
  args: {
    cardSize: CONTAINER_WIDTHS['3XL'] + 40,
  }
};

export const FourXL: Story = {
  name: "4XL",
  args: {
    cardSize: CONTAINER_WIDTHS['4XL'] + 40,
  }
};

export const FiveXL: Story = {
  name: "5XL",
  args: {
    cardSize: CONTAINER_WIDTHS['5XL'] + 40,
  }
};

export const SixXL: Story = {
  name: "6XL",
  args: {
    cardSize: CONTAINER_WIDTHS['6XL'] + 40,
  }
};

export const SevenXL: Story = {
  name: "7XL",
  args: {
    cardSize: CONTAINER_WIDTHS['7XL'] + 40,
  }
};
