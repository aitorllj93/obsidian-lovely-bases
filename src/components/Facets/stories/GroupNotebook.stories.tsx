import type { Meta } from "@storybook/react-vite";

import { MOVIES_ENTRIES } from "@/__fixtures__/entries";
import {
  WithBorderDashed,
  WithInnerCounter,
  WithNotebookShape,
  WithSize2XSAndSpacing,
} from "@/__fixtures__/facets/configs";
import { Providers } from "@/stories/decorators";

import GroupMeta, { type GroupStory, type Story } from "./meta";

const meta = {
  ...GroupMeta,
  title: "Design System/Group/Notebook",
  tags: ["internal"],
  args: {
    ...GroupMeta.args,
    files: MOVIES_ENTRIES,
    ...WithNotebookShape,
  },
  decorators: [
    Providers,
  ],
} satisfies Meta<typeof GroupStory>;

export default meta;

export const FullExample: Story = {
  name: "Full Example",
  args: {
    title: 'My Notebook',
    color: "#6F6E69",
    icon: "notebook",
    showCounter: true,
    ...WithInnerCounter,
    ...WithNotebookShape,
    ...WithBorderDashed,
  },
};

export const Default: Story = {
  name: "Default",
};
