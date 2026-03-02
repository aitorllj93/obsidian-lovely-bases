import type { Meta, StoryObj } from "@storybook/react-vite";
import iconNodes from "lucide-static/icon-nodes.json";
import type { BasesEntry, BasesViewConfig } from "obsidian";
import type { MouseEventHandler } from "react";

import { MOVIES_ENTRIES } from "@/__fixtures__/entries";
import { aBasesViewConfig } from "@/__mocks__/aBasesViewConfig";
import  { FACETS_CONFIG_DEFAULTS,  type FacetsConfig } from "@/components/Facets/config";
import { getTitle } from "@/lib/properties";
import Providers from "@/stories/decorators/Providers";

import Notebook from "../";
import type { File, PageStyle } from "../types";

const DEFAULT_CONFIG = aBasesViewConfig({});

type StoryProps = {
	width?: number;
	icon?: string;
  color?: string;
  title?: string;
  showCounter?: boolean;
	files: BasesEntry[];
	onClick?: MouseEventHandler<HTMLDivElement>;
	facetsConfig?: FacetsConfig;
	config?: BasesViewConfig;
  pageStyle?: PageStyle;
  padContent?: boolean;
};

export const NotebookStory = ({
	width,
	icon,
  title,
  showCounter = false,
	files,
	color,
	onClick,
	facetsConfig = FACETS_CONFIG_DEFAULTS,
	config = DEFAULT_CONFIG,
	pageStyle = "plain",
  padContent = false,
}: StoryProps) => {
	return (
		<Notebook
			width={width}
			icon={icon}
      title={title}
      showCounter={showCounter}
			files={files}
			color={color}
			onClick={onClick}
			facetsConfig={facetsConfig}
			config={config}
      pageStyle={pageStyle}
      padContent={padContent}
		/>
	);
};

const entriesToFiles = (entries: BasesEntry[]): File[] =>
	entries.map((entry) => ({
		id: entry.file.path,
		entry,
		file: entry.file,
		image: entry.getValue("formula.image")?.toString() ?? "",
		title: getTitle(entry),
		onClick: () => console.log(`Clicked file: ${getTitle(entry)}`),
	}));

export const createMockFiles = (count: number): File[] =>
	entriesToFiles(MOVIES_ENTRIES.slice(0, count));

export const DEFAULT_NOTEBOOK_CARD_CONFIG = FACETS_CONFIG_DEFAULTS;

export const meta = {
	title: "Design System/Notebook",
	component: NotebookStory,
	parameters: {
		layout: "centered",
	},
	tags: ["internal"],
	argTypes: {
		width: {
			control: { type: "range", min: 64, max: 512, step: 16 },
			name: "Width",
			description:
				"Width of the folder in pixels. Height is calculated automatically using 4:3 aspect ratio.",
			table: {
				category: "Size",
				defaultValue: { summary: "128" },
			},
		},
		icon: {
			control: "select",
			name: "Folder Icon",
			description: "Lucide icon displayed on the folder front.",
			options: [null, ...Object.keys(iconNodes)],
			table: {
				category: "Content",
			},
		},
		title: {
			control: "text",
			name: "Title",
			description: "Title of the notebook.",
			table: {
				category: "Content",
			},
		},
		color: {
			control: {
        type: "color",
      },
			name: "Color",
			description:
				"Color of the notebook.",
			table: {
				category: "Appearance",
				defaultValue: { summary: "Primary Color" },
			},
		},
		files: {
			table: {
				disable: true,
			},
		},
		onClick: {
			table: {
				disable: true,
			},
		},
	},
	decorators: [Providers],
} satisfies Meta<typeof NotebookStory>;

export default meta;

export type Story = StoryObj<typeof meta>;
