import type { Meta, StoryObj } from "@storybook/react-vite";

import { ARTICLE_ENTRIES } from "@/__fixtures__/entries";

import * as Layouts from "./CardLayout.stories";

import CardMeta, { WithVariants } from "./meta";

const AppearancesRenderer = WithVariants([
  {
    ...Layouts.Vertical.args,
  },
  {
    ...Layouts.Horizontal.args,
  },
  {
    ...Layouts.Overlay.args,
  },
  {
    ...Layouts.Polaroid.args,
  },
]);

const meta = {
  ...CardMeta,
  title: "Design System/Card/Appearances",
  component: AppearancesRenderer,
  tags: ["internal"],
} satisfies Meta<typeof AppearancesRenderer>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Colors: Story = {
  name: "Colors - Both",
  args: {
    entry: ARTICLE_ENTRIES[0],
    backgroundColorProperty: "note.color",
    backgroundColorApplyTo: "both",
    cardSize: 340,
    iconProperty: "note.icon",
    imageAspectRatio: 1,
    imageProperty: "note.cover",
  } as unknown as Story["args"],
};

export const BackgroundColors: Story = {
  name: "Colors - Image",
  args: {
    entry: ARTICLE_ENTRIES[0],
    backgroundColorProperty: "note.color",
    backgroundColorApplyTo: "image",
    cardSize: 340,
    iconProperty: "note.icon",
    imageAspectRatio: 1,
    imageProperty: "note.cover",
  } as unknown as Story["args"],
};

export const ContentColors: Story = {
  name: "Colors - Content",
  args: {
    entry: ARTICLE_ENTRIES[0],
    backgroundColorProperty: "note.color",
    backgroundColorApplyTo: "content",
    cardSize: 340,
    iconProperty: "note.icon",
    imageAspectRatio: 1,
    imageProperty: "note.cover",
  } as unknown as Story["args"],
};
