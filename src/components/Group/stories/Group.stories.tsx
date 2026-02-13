import type { Meta } from "@storybook/react-vite";

import { MOVIES_ENTRIES, MY_NOTEBOOK } from "@/__fixtures__/entries";
import { Providers } from "@/stories/decorators";

import GroupMeta, { type GroupStory, type Story } from "./meta";

const meta = {
	...GroupMeta,
	title: "Design System/Group",
	tags: ["internal"],
  args: {
    ...GroupMeta.args,
		entries: MOVIES_ENTRIES,
    groupKey: "",
    groupSpacing: 20,
    cardSize: 148,
    groupColorProperty: "note.color",
    groupIconProperty: "note.icon",
  },
	decorators: [
		(Story) => (
			<div
				style={{
					padding: "40px",
				}}
			>
				<Story />
			</div>
		),
		Providers,
	],
} satisfies Meta<typeof GroupStory>;

export default meta;

export const FullExample: Story = {
	name: "Full Example",
	args: {
    groupKey: `[[${MY_NOTEBOOK.file.basename}]]`,
    groupCounterPosition: "inside",
    groupShape: "notebook",
    groupBorder: "dashed",
    groupSpacing: 20,
    cardSize: 148,
	},
};

export const Default: Story = {
	name: "Default",
};
