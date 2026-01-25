
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { aBasesEntryGroup } from "@/__mocks__";
import {
  type NamespacedTranslationKey,
  translate,
} from "@/lib/i18n";
import {
	createViewRenderer,
	Providers,
	ViewWrapper,
} from "@/stories/decorators";

import RADAR_CHART_VIEW from ".";
import {
	DEFAULT_RADAR_CONFIG,
	FULL_RADAR_CONFIG,
	RADAR_PROPERTIES,
} from "./__fixtures__/configs";
import {
	GROUPED_RADAR_ENTRIES,
	RADAR_CHART_ENTRIES,
} from "./__fixtures__/entries";
import RadarChartView, { type RadarChartConfig } from "./RadarChartView";

const View = createViewRenderer<RadarChartConfig>(RadarChartView);

const t = (key: NamespacedTranslationKey<"radarChart">) =>
  translate("en", "radarChart", key);

const meta = {
	title: "Views/Radar Chart",
	component: View,
	tags: ["autodocs", "status:testing"],
	decorators: [Providers, ViewWrapper],
	parameters: {
		layout: "fullscreen",
		docs: {
			icon: RADAR_CHART_VIEW.icon,
			subtitle:
				"Compare groups of entries across multiple numeric properties using overlapping radar/spider charts with aggregation functions.",
			description: {
				component: `### Features

- **Group Comparison**: Display multiple groups as overlapping polygons for easy comparison.
- **Aggregation Functions**: Reduce values within groups using average, median, sum, max, or min.
- **Color Schemes**: Choose from a variety of color palettes or use the default theme colors.
- **Configurable**: Adjust min/max values, fill opacity, legends, and axis labels.

### Configuration`,
			},
		},
    extraNotes: [
      {
        title: 'Tips on configuring the view',
        description: 'To achieve the best results, you should normalize the values of the properties using formulas before exposing them to the view. Then include the formulas in your properties list instead of the actual properties.',
      }
    ],
	},
	argTypes: {
		aggregationFunction: {
			control: "select",
			name: t("options.data.aggregationFunction.title"),
			description: "Function to aggregate values within each group.",
			options: ["average", "median", "sum", "max", "min"],
			table: {
				category: t("options.data.title"),
				defaultValue: { summary: "average" },
			},
		},
		minValue: {
			control: { type: "range", min: 0, max: 100, step: 1 },
			name: t("options.valueRange.minValue.title"),
			description: "Minimum value for the radar axis.",
			table: {
				category: t("options.valueRange.title"),
				defaultValue: { summary: "0" },
			},
		},
		maxValue: {
			control: { type: "range", min: 0, max: 1000, step: 10 },
			name: t("options.valueRange.maxValue.title"),
			description: "Maximum value for the radar axis.",
			table: {
				category: t("options.valueRange.title"),
				defaultValue: { summary: "100" },
			},
		},
		showAxisLabels: {
			control: "boolean",
			name: t("options.display.showAxisLabels.title"),
			description: "Show or hide the property names on the radar axes.",
			table: {
				category: t("options.display.title"),
				defaultValue: { summary: "true" },
			},
		},
    showAxisTicks: {
      control: "boolean",
      name: t("options.display.showAxisTicks.title"),
      description: "Show or hide the axis ticks.",
      table: {
        category: t("options.display.title"),
        defaultValue: { summary: "true" },
      },
    },
		showLegend: {
			control: "boolean",
			name: t("options.display.showLegend.title"),
			description: "Show or hide the legend displaying group names.",
			table: {
				category: t("options.display.title"),
				defaultValue: { summary: "true" },
			},
		},
		legendPosition: {
			control: "select",
			name: t("options.display.legendPosition.title"),
			description: "Position of the legend relative to the chart.",
			options: ["top", "bottom", "left", "right"],
			table: {
				category: t("options.display.title"),
				defaultValue: { summary: "bottom" },
			},
		},
		colorScheme: {
			control: "select",
			name: t("options.appearance.colorScheme.title"),
			description: "Color palette for the radar polygons.",
			options: [
				"primary",
				"red",
				"orange",
				"yellow",
				"green",
				"cyan",
				"blue",
				"purple",
				"magenta",
        "semaphor",
        "rainbow",
			],
			table: {
				category: t("options.appearance.title"),
				defaultValue: { summary: "primary" },
			},
		},
		customColors: {
			control: "text",
			name: t("options.appearance.customColors.title"),
			description:
				"Comma-separated hex colors to override color scheme (e.g., '#3b82f6, #22c55e, #f59e0b').",
			table: {
				category: t("options.appearance.title"),
			},
		},
		fillOpacity: {
			control: { type: "range", min: 0, max: 1, step: 0.05 },
			name: t("options.appearance.fillOpacity.title"),
			description: "Opacity of the filled area inside each radar polygon.",
			table: {
				category: t("options.appearance.title"),
				defaultValue: { summary: "0.3" },
			},
		},
    // Internals
		data: {
			table: {
				disable: true,
			},
		},
		groupedData: {
			table: {
				disable: true,
			},
		},
		properties: {
			table: {
				disable: true,
			},
		},
		onEntryClick: {
			table: {
				disable: true,
			},
		},
		onEntryHover: {
			table: {
				disable: true,
			},
		},
	},
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FullExample: Story = {
	args: {
		data: RADAR_CHART_ENTRIES,
		groupedData: GROUPED_RADAR_ENTRIES,
		properties: RADAR_PROPERTIES,
		onEntryClick: fn(),
		...FULL_RADAR_CONFIG,
	},
};

export const Default: Story = {
	parameters: {
		docs: {
			description: {
				story:
					"By default, the radar chart displays all listed properties with the average aggregation function.",
			},
		},
	},
	args: {
		data: RADAR_CHART_ENTRIES,
		groupedData: [aBasesEntryGroup("", RADAR_CHART_ENTRIES)],
		properties: RADAR_PROPERTIES,
		onEntryClick: fn(),
		...DEFAULT_RADAR_CONFIG,
	},
};

export const Groups: Story = {
	parameters: {
		docs: {
			description: {
				story: `Use the builtin bases grouping system to create multiple groups and visualize them in the same chart.

\`\`\`yml
groupBy:
  property: formula.WeekNumber
  direction: ASC
\`\`\`
`,
			},
		},
	},
	args: {
		data: RADAR_CHART_ENTRIES,
		groupedData: GROUPED_RADAR_ENTRIES,
		properties: RADAR_PROPERTIES,
		onEntryClick: fn(),
		...DEFAULT_RADAR_CONFIG,
	},
};

export const ColorSchemes: Story = {
	parameters: {
		docs: {
			description: {
				story: `Apply different color schemes for different occasions or contexts.

\`\`\`yml
colorScheme: green
\`\`\`
`,
			},
		},
	},
	args: {
		data: RADAR_CHART_ENTRIES,
		groupedData: [aBasesEntryGroup("", RADAR_CHART_ENTRIES)],
		properties: RADAR_PROPERTIES,
		onEntryClick: fn(),
		...DEFAULT_RADAR_CONFIG,
		colorScheme: "green",
	},
};

export const AggregationFunctions: Story = {
	parameters: {
		docs: {
			description: {
				story: `Change the aggregation function and explore different ways to visualize your data.

\`\`\`yml
aggregationFunction: average | median | sum | max | min
\`\`\`
`,
			},
		},
	},
	args: {
		data: RADAR_CHART_ENTRIES,
		groupedData: [aBasesEntryGroup("", RADAR_CHART_ENTRIES)],
		properties: RADAR_PROPERTIES,
		onEntryClick: fn(),
		...DEFAULT_RADAR_CONFIG,
		aggregationFunction: "sum",
    colorScheme: "contrast",
	},
};

export const NoLabels: Story = {
	parameters: {
		docs: {
			description: {
				story: `Hide axis labels for a cleaner, minimal look. Increase fill opacity for more prominent visualization.

\`\`\`yml
showAxisLabels: false
showAxisTicks: false
showLegend: false
fillOpacity: 0.6
\`\`\`
`,
			},
		},
	},
	args: {
		data: RADAR_CHART_ENTRIES,
		groupedData: GROUPED_RADAR_ENTRIES,
		properties: RADAR_PROPERTIES,
		onEntryClick: fn(),
		...DEFAULT_RADAR_CONFIG,
		showAxisLabels: false,
		showLegend: false,
		showAxisTicks: false,
    fillOpacity: 0.6
	},
};

export const CustomColors: Story = {
	parameters: {
		docs: {
			description: {
				story: `Make it yours with your own color palette using comma-separated hex colors.

\`\`\`yml
customColors: "#3b82f6, #22c55e, #f59e0b"
\`\`\`
`,
			},
		},
	},
	args: {
		data: RADAR_CHART_ENTRIES,
		groupedData: GROUPED_RADAR_ENTRIES,
		properties: RADAR_PROPERTIES,
		onEntryClick: fn(),
		...DEFAULT_RADAR_CONFIG,
		customColors: "#3b82f6, #22c55e, #f59e0b",
	},
};
