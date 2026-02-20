import type { Meta } from "@storybook/react-vite";

import { MOVIES_ENTRIES } from "@/__fixtures__/entries";
import { With3x2Ratio, WithBadge, WithBadgeColor, WithBadgeIcon, WithImage, WithOverlayLayout, WithSize3XS } from "@/__fixtures__/facets/configs";
import { FACETS_CONFIG_DEFAULTS } from "@/components/Facets/config";
import { Providers } from "@/stories/decorators";

import type Notebook from "..";

import NotebookMeta, { type Story } from "./meta";

const meta = {
	...NotebookMeta,
	title: "Design System/Group/Notebook/Pages",
	tags: ["internal"],
  args: {
    facetsConfig: {
      ...FACETS_CONFIG_DEFAULTS,
      ...WithSize3XS,
      ...WithImage,
      ...With3x2Ratio,
      ...WithOverlayLayout,
      ...WithBadge,
      ...WithBadgeColor,
      ...WithBadgeIcon,
    },
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
} satisfies Meta<typeof Notebook>;

export default meta;

export const RuledPages: Story = {
	name: "Ruled Pattern",
	args: {
		files: MOVIES_ENTRIES.slice(0, 5),
    pageStyle: "ruled",
	},
};

export const DottedPages: Story = {
	name: "Dotted Pattern",
	args: {
		files: MOVIES_ENTRIES.slice(0, 5),
    pageStyle: "dotted",
	},
};

export const SquaredPages: Story = {
	name: "Squared Pattern",
	args: {
		files: MOVIES_ENTRIES.slice(0, 5),
    pageStyle: "squared",
	},
};

export const PadContent: Story = {
	name: "Pad Content",
	args: {
		files: MOVIES_ENTRIES.slice(0, 5),
    pageStyle: "plain",
    padContent: true,
	},
};
