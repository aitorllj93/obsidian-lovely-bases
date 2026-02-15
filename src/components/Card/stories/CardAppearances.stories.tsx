import type { Meta, StoryObj } from "@storybook/react-vite";

import { ARTICLE_ENTRIES } from "@/__fixtures__/entries";
import {
  WithColor,
  WithColorAppliedEverywhere,
  WithColorAppliedToContent,
  WithColorAppliedToImage,
  WithEmptyImage,
  WithIcon,
  WithoutBadge,
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
  title: "Design System/Card/Colors",
  component: CardLayoutVariants,
  args: {
    entry: ARTICLE_ENTRIES[0],
    ...WithoutBadge,
    ...WithEmptyImage,
    ...WithIcon,
    config: aBasesViewConfig(),
  },
  tags: ["internal"],
  decorators: [Providers],
} satisfies Meta<typeof CardLayoutVariants>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Colors: Story = {
  name: "Apply Everywhere",
  args: {
    ...WithColor,
    ...WithColorAppliedEverywhere,
  },
};

export const BackgroundColors: Story = {
  name: "Apply to Image",
  args: {
    ...WithColor,
    ...WithColorAppliedToImage,
  },
};

export const ContentColors: Story = {
  name: "Apply to Content",
  args: {
    ...WithColor,
    ...WithColorAppliedToContent,
  },
};
