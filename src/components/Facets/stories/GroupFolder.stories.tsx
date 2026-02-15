import type { Meta } from "@storybook/react-vite";

import { MOVIES_ENTRIES } from "@/__fixtures__/entries";
import {
  WithBorderDashed,
  WithFolderShape,
  WithInnerCounter
} from "@/__fixtures__/facets/configs";
import { Providers } from "@/stories/decorators";

import GroupMeta, { type GroupStory, type Story } from "./meta";

const meta = {
  ...GroupMeta,
  title: "Design System/Group/Folder",
  tags: ["internal"],
  args: {
    ...GroupMeta.args,
    files: MOVIES_ENTRIES,
    ...WithFolderShape,
  },
  decorators: [
    Providers,
  ],
} satisfies Meta<typeof GroupStory>;

export default meta;

export const FullExample: Story = {
  name: "Full Example",
  args: {
    title: "My Folder",
    color: "#6F6E69",
    showCounter: true,
    ...WithInnerCounter,
    ...WithBorderDashed,
  },
};

export const Default: Story = {
  name: "Default",
};
