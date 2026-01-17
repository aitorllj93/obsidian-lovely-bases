
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { aBasesEntryGroup } from "@/__mocks__";
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
			name: "Aggregation Function",
			description: "Function to aggregate values within each group.",
			options: ["average", "median", "sum", "max", "min"],
			table: {
				category: "Data",
				defaultValue: { summary: "average" },
			},
		},
		minValue: {
			control: { type: "range", min: 0, max: 100, step: 1 },
			name: "Min Value",
			description: "Minimum value for the radar axis.",
			table: {
				category: "Value Range",
				defaultValue: { summary: "0" },
			},
		},
		maxValue: {
			control: { type: "range", min: 0, max: 1000, step: 10 },
			name: "Max Value",
			description: "Maximum value for the radar axis.",
			table: {
				category: "Value Range",
				defaultValue: { summary: "100" },
			},
		},
		colorScheme: {
			control: "select",
			name: "Color Scheme",
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
				category: "Appearance",
				defaultValue: { summary: "primary" },
			},
		},
		customColors: {
			control: "text",
			name: "Custom Colors",
			description:
				"Comma-separated hex colors to override color scheme (e.g., '#3b82f6, #22c55e, #f59e0b').",
			table: {
				category: "Appearance",
			},
		},
		fillOpacity: {
			control: { type: "range", min: 0, max: 1, step: 0.05 },
			name: "Fill Opacity",
			description: "Opacity of the filled area inside each radar polygon.",
			table: {
				category: "Appearance",
				defaultValue: { summary: "0.3" },
			},
		},
		showAxisLabels: {
			control: "boolean",
			name: "Show Axis Labels",
			description: "Show or hide the property names on the radar axes.",
			table: {
				category: "Appearance",
				defaultValue: { summary: "true" },
			},
		},
    showAxisTicks: {
      control: "boolean",
      name: "Show Axis Ticks",
      description: "Show or hide the axis ticks.",
      table: {
        category: "Appearance",
        defaultValue: { summary: "true" },
      },
    },
		showLegend: {
			control: "boolean",
			name: "Show Legend",
			description: "Show or hide the legend displaying group names.",
			table: {
				category: "Appearance",
				defaultValue: { summary: "true" },
			},
		},
		legendPosition: {
			control: "select",
			name: "Legend Position",
			description: "Position of the legend relative to the chart.",
			options: ["top", "bottom", "left", "right"],
			table: {
				category: "Appearance",
				defaultValue: { summary: "bottom" },
			},
		},
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
				story: `Apply different color schemes to see the different ways to visualize the data.

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
				story: `Use different aggregation functions to see the different ways to aggregate the values.

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
				story: `Define your own color palette using comma-separated hex colors. Custom colors override the color scheme.

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
