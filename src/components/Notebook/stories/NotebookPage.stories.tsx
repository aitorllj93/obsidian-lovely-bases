import type { Meta, StoryObj } from "@storybook/react-vite";
import type { BasesEntry } from "obsidian";

import {
  APPLICATION_ENTRIES,
  ARTICLE_ENTRIES,
  BOOK_ENTRIES,
  MOVIES_ENTRIES,
  PERSON_ENTRIES,
  PHOTOS_ENTRIES,
} from "@/__fixtures__/entries";

import {
  With3x2Ratio,
  With4x5Ratio,
  WithBadge,
  WithBadgeColor,
  WithBadgeIcon,
  WithCircleShape,
  WithContentReversed,
  WithHorizontalLayout,
  WithHover,
  WithHoverOverlay,
  WithImage,
  WithMarkdownContent,
  WithOverlayLayout,
  WithoutGap,
  WithoutPropertyTitles,
  WithoutTitle,
  WithPolaroidLayout,
  WithRoundedShape,
  WithSize2XS,
  WithSize3XS,
  WithSize3XSAndSpacing,
  WithSquareImage,
  WithVerticalLayout,
} from "@/__fixtures__/facets/configs";

import { aBasesViewConfig } from "@/__mocks__";
import {
  FACETS_CONFIG_DEFAULTS,
  type FacetsConfigInput,
} from "@/components/Facets/config";
import { Providers } from "@/stories/decorators";
import { WithVariants } from "@/stories/decorators/WithVariants";

import { getNotebookColors } from "../helpers/get-notebook-colors";
import NotebookPage from "../NotebookPage";
import type { NotebookColors, PageStyle } from "../types";

type NotebookStoryProps = {
  entry?: BasesEntry;
  facetsConfig: FacetsConfigInput;
  padContent?: boolean;
  pageStyle?: PageStyle;
  colors?: NotebookColors;
};

const VIEW_CONFIG = aBasesViewConfig({});

const NotebookStory = ({ facetsConfig, ...props }: NotebookStoryProps) => {
  const width = 128;
  const height = width / (7 / 10);

  return (
    <div className="relative" style={{ width, height }}>
      <NotebookPage
        entry={MOVIES_ENTRIES[0]}
        config={VIEW_CONFIG}
        padContent={true}
        pageStyle="plain"
        notebookWidth={width}
        notebookHeight={height}
        isPageHovered={true}
        colors={getNotebookColors()}
        delay={0}
        isVisible={true}
        index={0}
        facetsConfig={{
          ...FACETS_CONFIG_DEFAULTS,
          ...facetsConfig,
        }}
        {...props}
      />
    </div>
  );
};

const NotebookVariants = WithVariants(NotebookStory, [
  {
    padContent: false,
  },
  {
    pageStyle: "plain",
  },
  {
    pageStyle: "ruled",
  },
  {
    pageStyle: "squared",
  },
  {
    pageStyle: "dotted",
  },
]);

const meta = {
  title: "Design System/Group/Notebook/Pages/Cards",
  component: NotebookVariants,
  parameters: {
    layout: "centered",
  },
  tags: ["internal"],
  decorators: [
    Providers,
    (Story) => (
      <div style={{ padding: "40px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NotebookVariants>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  name: "Vertical layout",
  args: {
    entry: BOOK_ENTRIES[0],
    facetsConfig: {
      ...WithSize3XS,
      ...WithImage,
      ...With4x5Ratio,
      ...WithVerticalLayout,
      ...WithoutPropertyTitles,
      ...WithBadge,
      ...WithBadgeColor,
      ...WithBadgeIcon,
      properties: ["note.author", "note.published", "note.excerpt"],
    },
    colors: getNotebookColors(),
  },
};

export const Horizontal: Story = {
  name: "Horizontal layout",
  args: {
    entry: ARTICLE_ENTRIES[0],
    facetsConfig: {
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
      properties: ["note.author", "note.published"],
    },
    colors: getNotebookColors(),
  },
};

export const Overlay: Story = {
  name: "Overlay layout",
  args: {
    entry: MOVIES_ENTRIES[0],
    facetsConfig: {
      ...WithSize3XS,
      ...WithImage,
      ...With3x2Ratio,
      ...WithOverlayLayout,
      ...WithBadge,
      ...WithBadgeColor,
      ...WithBadgeIcon,
    },
    colors: getNotebookColors(),
  },
};

export const Polaroid: Story = {
  name: "Polaroid layout",
  args: {
    entry: PHOTOS_ENTRIES[0],
    facetsConfig: {
      ...WithSize3XS,
      ...WithImage,
      ...WithSquareImage,
      ...WithPolaroidLayout,
    },
    colors: getNotebookColors(),
  },
};

export const Circle: Story = {
  name: "Circle shape",
  args: {
    entry: PERSON_ENTRIES[0],
    facetsConfig: {
      ...WithSize3XSAndSpacing,
      ...WithoutGap,
      ...WithVerticalLayout,
      ...WithCircleShape,
      ...WithImage,
      ...WithSquareImage,
      ...WithoutTitle,
    },
    colors: getNotebookColors(),
  },
};

export const Rounded: Story = {
  name: "Rounded shape",
  args: {
    entry: APPLICATION_ENTRIES[0],
    facetsConfig: {
      ...WithSize3XSAndSpacing,
      ...WithoutGap,
      ...WithVerticalLayout,
      ...WithRoundedShape,
      ...WithImage,
      ...WithSquareImage,
      ...WithoutTitle,
    },
    colors: getNotebookColors(),
  },
};
