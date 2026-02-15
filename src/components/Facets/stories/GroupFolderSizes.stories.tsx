import type { Meta } from "@storybook/react-vite";

import { MOVIES_ENTRIES } from "@/__fixtures__/entries";
import { WithFolderShape, WithImage, WithPolaroidLayout, WithSize2XL, WithSize2XS, WithSize3XL, WithSize3XS, WithSize4XL, WithSize4XS, WithSize5XL, WithSize5XS, WithSize6XL, WithSize6XS, WithSize7XL, WithSize7XS, WithSize8XS, WithSize9XS, WithSizeLG, WithSizeMD, WithSizeSM, WithSizeXL, WithSizeXS, WithSquareImage } from "@/__fixtures__/facets/configs";
import { Providers } from "@/stories/decorators";

import GroupMeta, { type GroupStory, type Story } from "./meta";

const meta = {
	...GroupMeta,
	title: "Design System/Group/Folder/Sizes",
	tags: ["internal"],
  args: {
    ...GroupMeta.args,
    files: MOVIES_ENTRIES,
    title: "My Folder",
    icon: "folder",
    showCounter: true,
    color: "#6F6E69",
    ...WithFolderShape,
    ...WithImage,
    ...WithSquareImage,
    ...WithPolaroidLayout,
  },
	decorators: [
		Providers,
	],
} satisfies Meta<typeof GroupStory>;

export default meta;

export const NineXS: Story = {
  name: "9XS",
  args: {
    ...WithSize9XS,
    contentMarkdownMaxLength: 20,
    contentShowMarkdown: false,
    properties: ["note.author"],
  }
};

export const EightXS: Story = {
  name: "8XS",
  args: {
    ...WithSize8XS,
    contentMarkdownMaxLength: 35,
  }
};

export const SevenXS: Story = {
  name: "7XS",
  args: {
    ...WithSize7XS,
  }
};

export const SixXS: Story = {
  name: "6XS",
  args: {
    ...WithSize6XS,
  }
};

export const FiveXS: Story = {
  name: "5XS",
  args: {
    ...WithSize5XS,
  }
};

export const FourXS: Story = {
  name: "4XS",
  args: {
    ...WithSize4XS,
  }
};

export const ThreeXS: Story = {
  name: "3XS",
  args: {
    ...WithSize3XS,
  }
};

export const TwoXS: Story = {
  name: "2XS",
  args: {
    ...WithSize2XS,
  }
};

export const XS: Story = {
  name: "XS",
  args: {
    ...WithSizeXS,
  }
};

export const SM: Story = {
  name: "SM",
  args: {
    ...WithSizeSM,
  }
};

export const MD: Story = {
  name: "MD",
  args: {
    ...WithSizeMD,
  }
};

export const LG: Story = {
  name: "LG",
  args: {
    ...WithSizeLG,
  }
};

export const XL: Story = {
  name: "XL",
  args: {
    ...WithSizeXL,
  }
};

export const TwoXL: Story = {
  name: "2XL",
  args: {
    ...WithSize2XL,
  }
};

export const ThreeXL: Story = {
  name: "3XL",
  args: {
    ...WithSize3XL,
  }
};

export const FourXL: Story = {
  name: "4XL",
  args: {
    ...WithSize4XL,
  }
};

export const FiveXL: Story = {
  name: "5XL",
  args: {
    ...WithSize5XL,
  }
};

export const SixXL: Story = {
  name: "6XL",
  args: {
    ...WithSize6XL,
  }
};

export const SevenXL: Story = {
  name: "7XL",
  args: {
    ...WithSize7XL,
  }
};
