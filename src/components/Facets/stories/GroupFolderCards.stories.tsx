import type { Meta } from "@storybook/react-vite";

import {
  APPLICATION_ENTRIES,
  ARTICLE_ENTRIES,
  BOOK_ENTRIES,
  MOVIES_ENTRIES,
  PERSON_ENTRIES,
  PHOTOS_ENTRIES
} from "@/__fixtures__/entries";
import {
  With3x2Ratio,
  With4x5Ratio,
  WithBadge,
  WithBadgeColor,
  WithBadgeIcon,
  WithCircleShape,
  WithContentReversed,
  WithFolderShape,
  WithHorizontalLayout,
  WithHover,
  WithHoverOverlay,
  WithImage,
  WithMarkdownContent,
  WithoutGap,
  WithoutPropertyTitles,
  WithoutTitle,
  WithOverlayLayout,
  WithPolaroidLayout,
  WithRoundedShape,
  WithSize3XS,
  WithSquareImage,
  WithVerticalLayout
} from "@/__fixtures__/facets/configs";
import { Providers } from "@/stories/decorators";

import GroupMeta, { type GroupStory, type Story } from "./meta";

const meta = {
  ...GroupMeta,
  title: "Design System/Group/Folder/Cards",
  tags: ["internal"],
  args: {
    ...GroupMeta.args,
    files: MOVIES_ENTRIES,
    ...WithFolderShape,
    showCounter: true,
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
    ...WithSize3XS,
    ...WithImage,
    ...With3x2Ratio,
    ...WithVerticalLayout,
    ...WithoutPropertyTitles,
    ...WithBadge,
    ...WithBadgeColor,
    ...WithBadgeIcon,
    files: BOOK_ENTRIES,
    title: 'Books',
    color: "#205ea6",
    icon: 'library-big',
    properties: ['note.author'],
  },
};

export const HorizontalCards: Story = {
  name: "Horizontal Layout",
  args: {
    ...WithSize3XS,
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
    title: 'Articles',
    color: "#24837b",
    icon: 'newspaper',
    files: ARTICLE_ENTRIES,
    properties: ["note.author", "note.published"],
  },
};

export const OverlayCards: Story = {
  name: "Overlay Layout",
  args: {
    ...WithSize3XS,
    ...WithImage,
    ...With3x2Ratio,
    ...WithOverlayLayout,
    ...WithBadge,
    ...WithBadgeColor,
    ...WithBadgeIcon,
    ...WithoutPropertyTitles,
    files: MOVIES_ENTRIES,
    title: 'Movies',
    color: "#af3029",
    icon: 'film',
    properties: ["note.author"],
  },
};

export const PolaroidCards: Story = {
  name: "Polaroid Layout",
  args: {
    ...WithSize3XS,
    ...WithImage,
    ...WithSquareImage,
    ...WithPolaroidLayout,
    files: PHOTOS_ENTRIES,
    title: 'Photos',
    color: "#66800b",
    icon: 'camera',
  },
};

export const CircleCards: Story = {
  name: "Circle Shape",
  args: {
    ...WithSize3XS,
    ...WithoutGap,
    ...WithVerticalLayout,
    ...WithCircleShape,
    ...WithImage,
    ...WithSquareImage,
    ...WithoutTitle,
    title: 'Contacts',
    color: "#5e409d",
    icon: 'user',
    files: PERSON_ENTRIES,
  },
};

export const RoundedCards: Story = {
  name: "Rounded Shape",
  args: {
    ...WithSize3XS,
    ...WithoutGap,
    ...WithVerticalLayout,
    ...WithRoundedShape,
    ...WithImage,
    ...WithSquareImage,
    ...WithoutTitle,
    title: "Applications",
    color: "#ad8301",
    icon: "layers",
    files: APPLICATION_ENTRIES,
  },
};
