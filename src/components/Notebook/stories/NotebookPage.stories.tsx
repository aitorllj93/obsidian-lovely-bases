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
import { aBasesViewConfig } from "@/__mocks__";
import {
  CIRCLE_SHAPE_CONFIG,
  HORIZONTAL_LAYOUT_CONFIG,
  OVERLAY_ON_HOVER_LAYOUT_CONFIG,
  POLAROID_LAYOUT_CONFIG,
  ROUNDED_SHAPE_CONFIG,
  VERTICAL_LAYOUT_CONFIG,
} from "@/components/Card/__fixtures__/configs";
import type { CardConfig } from "@/components/Card/types";
import { Providers } from "@/stories/decorators";
import { WithVariants } from "@/stories/decorators/WithVariants";

import { getNotebookColors } from "../helpers/get-notebook-colors";
import NotebookPage from "../NotebookPage";
import type { NotebookColors, PageStyle } from "../types";

type NotebookStoryProps = {
  entry: BasesEntry;
  cardConfig: CardConfig;
  padContent?: boolean;
  pageStyle: PageStyle;
  colors: NotebookColors;
};

const VIEW_CONFIG = aBasesViewConfig({});

const NotebookStory = (props: NotebookStoryProps) => {
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
      {...props}
    />
  </div>
);
}

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
    cardConfig: VERTICAL_LAYOUT_CONFIG,
    colors: getNotebookColors(),
  },
};


export const Horizontal: Story = {
  name: "Horizontal layout",
  args: {
    entry: ARTICLE_ENTRIES[0],
    cardConfig: HORIZONTAL_LAYOUT_CONFIG,
    colors: getNotebookColors(),
  },
};

export const Overlay: Story = {
  name: "Overlay layout",
  args: {
    entry: MOVIES_ENTRIES[0],
    cardConfig: OVERLAY_ON_HOVER_LAYOUT_CONFIG,
    colors: getNotebookColors(),
  },
};

export const Polaroid: Story = {
  name: "Polaroid layout",
  args: {
    entry: PHOTOS_ENTRIES[0],
    cardConfig: POLAROID_LAYOUT_CONFIG,
    colors: getNotebookColors(),
  },
};

export const Circle: Story = {
  name: "Circle shape",
  args: {
    entry: PERSON_ENTRIES[0],
    cardConfig: CIRCLE_SHAPE_CONFIG,
    colors: getNotebookColors(),
  },
};

export const Rounded: Story = {
  name: "Rounded shape",
  args: {
    entry: APPLICATION_ENTRIES[0],
    cardConfig: ROUNDED_SHAPE_CONFIG,
    colors: getNotebookColors(),
  },
};
