


import type { Meta } from "@storybook/react-vite";

import { MARKDOWN_ENTRY } from "@/__fixtures__/entries/markdown";
import { Providers } from "@/stories/decorators";

import type Card from "..";

import CardMeta, { type Story } from "./meta";
import { WithMarkdownContent } from "@/__fixtures__/facets/configs";

const meta = {
  ...CardMeta,
  title: "Design System/Card/Content/Markdown",
  tags: ["internal"],
  decorators: [Providers],
  parameters: {
    layout: "centered",
  },
  args: {
    ...CardMeta.args,
    entry: MARKDOWN_ENTRY,
    ...WithMarkdownContent,
    contentMarkdownMaxLength: 0,
  },
} satisfies Meta<typeof Card>;

export default meta;

export const Default: Story = {
};

export const Skeleton: Story = {
  parameters: {
    obsidian: {
      markdown: false,
    }
  }
};
