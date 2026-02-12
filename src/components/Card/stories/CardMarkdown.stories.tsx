


import type { Meta, StoryObj } from "@storybook/react-vite";

import { MARKDOWN_ENTRY } from "@/__fixtures__/entries/markdown";
import { aBasesViewConfig } from "@/__mocks__";
import { Providers } from "@/stories/decorators";

import { DEFAULTS } from "../constants";
import Card from "../index";

const meta = {
  title: "Design System/Card/Content/Markdown",
  component: Card,
  tags: ["internal"],
  decorators: [Providers],
  parameters: {
    layout: "centered",
  },
  args: {
    ...DEFAULTS,
    config: aBasesViewConfig(),
    entry: MARKDOWN_ENTRY,
    showContent: true,
    contentMaxLength: 0,
  },
} satisfies Meta<typeof Card>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
};

export const Skeleton: Story = {
  parameters: {
    obsidian: {
      markdown: false,
    }
  }
};

export default meta;
