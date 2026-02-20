import type { Meta } from "@storybook/react-vite";

import {
  ARTICLE_ENTRIES,
  BOOK_ENTRIES,
  MOVIES_ENTRIES,
  PHOTOS_ENTRIES,
} from "@/__fixtures__/entries";
import {
  With3x2Ratio,
  With4x5Ratio,
  WithBadge,
  WithBadgeColor,
  WithBadgeIcon,
  WithContentReversed,
  WithContentVisibilityOnHover,
  WithHorizontalLayout,
  WithHover,
  WithHoverOverlay,
  WithImage,
  WithMarkdownContent,
  WithOverlayLayout,
  WithoutPropertyTitles,
  WithPolaroidLayout,
  WithSize2XS,
  WithSize3XS,
  WithSquareImage,
  WithVerticalLayout,
} from "@/__fixtures__/facets/configs";
import { Providers } from "@/stories/decorators";

import type Card from "../index";

import CardMeta, { type Story } from "./meta";

const meta = {
  ...CardMeta,
  title: "Design System/Card/Layouts",
  tags: ["internal"],
  decorators: [
    Providers,
    (Story) => (
      <div
        style={{
          maxWidth: "340px",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;

export const Default: Story = {
  args: {
    entry: ARTICLE_ENTRIES[0],
    properties: ["note.author", "note.published", "note.excerpt"],
  },
};

export const Vertical: Story = {
  args: {
    ...WithSize3XS,
    ...WithImage,
    ...With4x5Ratio,
    ...WithVerticalLayout,
    ...WithoutPropertyTitles,
    ...WithBadge,
    ...WithBadgeColor,
    ...WithBadgeIcon,
    entry: ARTICLE_ENTRIES[0],
    properties: ["note.author", "note.published", "note.excerpt"],
  },
};

export const Horizontal: Story = {
  args: {
    ...WithSize2XS,
    ...WithImage,
    ...With4x5Ratio,
    ...WithHorizontalLayout,
    ...WithContentReversed,
    ...WithoutPropertyTitles,
    ...WithMarkdownContent,
    ...WithBadge,
    ...WithBadgeColor,
    ...WithBadgeIcon,
    ...WithHover,
    ...WithHoverOverlay,
    entry: ARTICLE_ENTRIES[0],
    properties: ["note.author", "note.published"],
  },
};

export const Overlay: Story = {
  args: {
    ...WithSize3XS,
    ...WithImage,
    ...With3x2Ratio,
    ...WithOverlayLayout,
    ...WithBadge,
    ...WithBadgeColor,
    ...WithBadgeIcon,
    ...WithoutPropertyTitles,
    entry: BOOK_ENTRIES[0],
    properties: ["note.author"]
  },
};

export const OverlayOnHover: Story = {
  args: {
    ...Overlay.args,
    ...WithContentVisibilityOnHover,
    ...WithMarkdownContent,
    entry: MOVIES_ENTRIES[0],
    properties: [],
  },
};

export const Polaroid: Story = {
  args: {
    ...WithSize3XS,
    ...WithImage,
    ...WithSquareImage,
    ...WithPolaroidLayout,
    entry: PHOTOS_ENTRIES[0],
  },
};
