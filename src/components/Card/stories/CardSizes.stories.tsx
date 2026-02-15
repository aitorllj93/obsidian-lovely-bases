import type { Meta, StoryObj } from "@storybook/react-vite";

import { ARTICLE_ENTRIES } from "@/__fixtures__/entries";
import {
  WithMarkdownContent,
  WithoutMarkdownContent,
  WithoutPropertyTitles,
  WithSize2XL,
  WithSize2XS,
  WithSize3XL,
  WithSize3XS,
  WithSize4XL,
  WithSize4XS,
  WithSize5XL,
  WithSize5XS,
  WithSize6XL,
  WithSize6XS,
  WithSize7XL,
  WithSize7XS,
  WithSize8XS,
  WithSize9XS,
  WithSizeLG,
  WithSizeMD,
  WithSizeSM,
  WithSizeXL,
  WithSizeXS
} from "@/__fixtures__/facets/configs";
import { aBasesViewConfig } from "@/__mocks__";
import { Providers } from "@/stories/decorators";
import { WithVariants } from "@/stories/decorators/WithVariants";

import Card from "..";

import * as Layouts from "./CardLayout.stories";
import CardMeta from "./meta";

const CardLayoutVariants = WithVariants(Card, [
  {
    ...CardMeta.args,
    ...Layouts.Vertical.args,
  },
  {
    ...CardMeta.args,
    ...Layouts.Horizontal.args,
  },
  {
    ...CardMeta.args,
    ...Layouts.Overlay.args,
  },
  {
    ...CardMeta.args,
    ...Layouts.Polaroid.args,
  },
]);

const meta = {
  ...CardMeta,
  title: "Design System/Card/Sizes",
  component: CardLayoutVariants,
  args: {
    entry: ARTICLE_ENTRIES[0],
    config: aBasesViewConfig(),
    cardAdaptToSize: true,
  },
  tags: ["internal"],
  decorators: [Providers],
} satisfies Meta<typeof CardLayoutVariants>;

type Story = StoryObj<typeof meta>;

export default meta;

export const NineXS: Story = {
  name: "9XS",
  args: {
    ...WithSize9XS,
    ...WithoutPropertyTitles,
    ...WithoutMarkdownContent,
    properties: ["note.author"],
  },
};

export const EightXS: Story = {
  name: "8XS",
  args: {
    ...WithSize8XS,
    ...WithMarkdownContent,
    contentMarkdownMaxLength: 35,
    contentMarkdownMaxHeight: 35,
    properties: [],
  },
};

export const SevenXS: Story = {
  name: "7XS",
  args: {
    ...WithSize7XS,
    contentMarkdownMaxLength: 35,
    contentMarkdownMaxHeight: 35,
  } as unknown as Story["args"],
};

export const SixXS: Story = {
  name: "6XS",
  args: {
    ...WithSize6XS,
    contentMarkdownMaxLength: 50,
    contentMarkdownMaxHeight: 50,
  },
};

export const FiveXS: Story = {
  name: "5XS",
  args: {
    ...WithSize5XS,
    contentMarkdownMaxLength: 50,
    contentMarkdownMaxHeight: 50,
  },
};

export const FourXS: Story = {
  name: "4XS",
  args: {
    ...WithSize4XS,
    contentMarkdownMaxLength: 50,
    contentMarkdownMaxHeight: 50,
  },
};

export const ThreeXS: Story = {
  name: "3XS",
  args: {
    ...WithSize3XS,
    contentMarkdownMaxLength: 50,
  },
};

export const TwoXS: Story = {
  name: "2XS",
  args: {
    ...WithSize2XS,
    contentMarkdownMaxLength: 50,
  },
};

export const XS: Story = {
  name: "XS",
  args: {
    ...WithSizeXS,
    contentMarkdownMaxLength: 50,
  },
};

export const SM: Story = {
  name: "SM",
  args: {
    ...WithSizeSM,
    contentMarkdownMaxLength: 50,
  },
};

export const MD: Story = {
  name: "MD",
  args: {
    ...WithSizeMD,
    contentMarkdownMaxLength: 50,
  },
};

export const LG: Story = {
  name: "LG",
  args: {
    ...WithSizeLG,
  },
};

export const XL: Story = {
  name: "XL",
  args: {
    ...WithSizeXL,
  },
};

export const TwoXL: Story = {
  name: "2XL",
  args: {
    ...WithSize2XL,
  },
};

export const ThreeXL: Story = {
  name: "3XL",
  args: {
    ...WithSize3XL,
  },
};

export const FourXL: Story = {
  name: "4XL",
  args: {
    ...WithSize4XL,
  },
};

export const FiveXL: Story = {
  name: "5XL",
  args: {
    ...WithSize5XL,
  },
};

export const SixXL: Story = {
  name: "6XL",
  args: {
    ...WithSize6XL,
  },
};

export const SevenXL: Story = {
  name: "7XL",
  args: {
    ...WithSize7XL,
  },
};
