
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { GROUPED_OCCURRENCES, OCCURRENCES } from "@/__fixtures__/entries";
import { aBasesEntryGroup } from "@/__mocks__";
import { type NamespacedTranslationKey, translate } from "@/lib/i18n";
import {
  createViewRenderer,
  Providers,
  ViewWrapper,
} from "@/stories/decorators";

import HEATMAP_CALENDAR_VIEW from ".";
import {
  BOOLEAN_TRACKING_CONFIG,
  CUSTOM_COLORS_CONFIG,
  DEFAULT_HEATMAP_BASE_CONFIG,
  FULL_HEATMAP_BASE_CONFIG,
  MONTH_GRID_CONFIG,
  REVERSE_COLORS_HEATMAP_BASE_CONFIG,
  THIRTEEN_WEEKS_HEATMAP_BASE_CONFIG,
  VERTICAL_LAYOUT_CONFIG
} from "./__fixtures__/configs/heatmap";
import HeatmapCalendarView, {
  type HeatmapCalendarConfig,
} from "./HeatmapCalendarView";

const t = (key: NamespacedTranslationKey<"heatmapCalendar">) =>
  translate("en", "heatmapCalendar", key);

const View = createViewRenderer<HeatmapCalendarConfig>(HeatmapCalendarView);

const meta = {
  title: "Views/Heatmap Calendar",
  tags: ["autodocs", "status:testing"],
  component: View,
  decorators: [Providers, ViewWrapper],
  parameters: {
    layout: 'fullscreen',
    docs: {
      icon: HEATMAP_CALENDAR_VIEW.icon,
      subtitle:
        "A GitHub-style activity tracker that visualizes the frequency of notes or events over time, perfect for habit tracking or monitoring daily productivity.",
      description: {
        component: `### Features

- **Activity Visualization**: A grid-based heatmap showing activity levels through color intensity across the year.
- **Automatic Grouping**: Supports displaying data grouped by different categories.
- **Multiple Color Schemes**: Choose from variety of palettes including **Red**, **Green**, **Blue**, **Purple**, and more.
- **Interactive**: Click on any cell to immediately open the associated note.

### Configuration`,
      },
    },
  },
  argTypes: {
    // Data Properties
    dateProperty: {
      control: "text",
      name: t("options.data.dateProperty.title"),
      description:
        "The property used to determine the date of the entry (required).",
      table: {
        category: t("options.data.title"),
      },
    },
    trackProperty: {
      control: "text",
      name: t("options.data.trackProperty.title"),
      description:
        "The property used to calculate the intensity of the heatmap (required).",
      table: {
        category: t("options.data.title"),
      },
    },
    trackType: {
      control: "select",
      name: t("options.data.trackType.title"),
      description: "How to interpret the tracked property value.",
      options: ["number", "boolean", "text", "list"],
      table: {
        category: t("options.data.title"),
      },
    },
    // Date Range
    startDate: {
      control: "text",
      name: t("options.dateRange.startDate.title"),
      description:
        "The start date for the calendar display (format: YYYY-MM-DD).",
      table: {
        category: t("options.dateRange.title"),
        defaultValue: { summary: '1 year ago' },
      },
    },
    endDate: {
      control: "text",
      name: t("options.dateRange.endDate.title"),
      description:
        "The end date for the calendar display (format: YYYY-MM-DD).",
      table: {
        category: t("options.dateRange.title"),
        defaultValue: { summary: 'today' },
      },
    },
    // Display
    layout: {
      control: "select",
      name: t("options.display.layout.title"),
      description: "Orientation of the heatmap grid.",
      options: ["horizontal", "vertical"],
      table: {
        category: t("options.display.title"),
        defaultValue: { summary: "horizontal" },
      },
    },
    viewMode: {
      control: "select",
      name: t("options.display.viewMode.title"),
      description: "Display style: week grid (GitHub) or month grid (calendar).",
      options: ["week-grid", "month-grid"],
      table: {
        category: t("options.display.title"),
        defaultValue: { summary: "week-grid" },
      },
    },
    showDayLabels: {
      control: "boolean",
      name: t("options.display.showDayLabels.title"),
      table: {
        category: t("options.display.title"),
        defaultValue: { summary: "true" },
      },
    },
    showMonthLabels: {
      control: "boolean",
      name: t("options.display.showMonthLabels.title"),
      table: {
        category: t("options.display.title"),
        defaultValue: { summary: "true" },
      },
    },
    showYearLabels: {
      control: "boolean",
      name: t("options.display.showYearLabels.title"),
      table: {
        category: t("options.display.title"),
        defaultValue: { summary: "false" },
      },
    },
    showLegend: {
      control: "boolean",
      name: t("options.display.showLegend.title"),
      table: {
        category: t("options.display.title"),
        defaultValue: { summary: "true" },
      },
    },
    // Value Range
    minValue: {
      control: "number",
      name: t("options.valueRange.minValue.title"),
      description: "Minimum value for the color scale.",
      table: {
        category: t("options.valueRange.title"),
      },
    },
    maxValue: {
      control: "number",
      name: t("options.valueRange.maxValue.title"),
      description: "Maximum value for the color scale.",
      table: {
        category: t("options.valueRange.title"),
      },
    },
    // Appearance
    colorScheme: {
      control: "select",
      name: t("options.appearance.colorScheme.title"),
      description:
        "The color palette for the cells (e.g., 'primary', 'green', 'red').",
      options: [
        "primary",
        "semaphor",
        "red",
        "orange",
        "yellow",
        "green",
        "cyan",
        "blue",
        "purple",
        "magenta",
      ],
      table: {
        category: t("options.appearance.title"),
        defaultValue: { summary: "primary" },
      },
    },
    reverseColors: {
      control: "boolean",
      name: t("options.appearance.reverseColors.title"),
      description: "Reverse the color scale to accentuate lowest values.",
      table: {
        category: t("options.appearance.title"),
        defaultValue: { summary: "false" },
      },
    },
    customColors: {
      control: "object",
      name: t("options.appearance.customColors.title"),
      description: "Array of hex colors for custom color scale.",
      table: {
        category: t("options.appearance.title"),
      },
    },
    overflowColor: {
      control: "text",
      name: t("options.appearance.overflowColor.title"),
      description: "Color to show when value exceeds max.",
      table: {
        category: t("options.appearance.title"),
      },
    },
    // Internal props (disabled)
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
    onEntryClick: {
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
    data: OCCURRENCES,
    groupedData: [aBasesEntryGroup('', GROUPED_OCCURRENCES[1].entries)],
    onEntryClick: fn(),
    ...FULL_HEATMAP_BASE_CONFIG,
  },
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "By default, the heatmap calendar displays the data for the last year",
      },
    }
  },
  args: {
    data: OCCURRENCES,
    groupedData: [aBasesEntryGroup('', GROUPED_OCCURRENCES[0].entries)],
    onEntryClick: fn(),
    ...DEFAULT_HEATMAP_BASE_CONFIG,
  },
};

export const CustomDuration: Story = {
  parameters: {
    docs: {
      description: {
        story: `You can display a shorter period of time by specifying the start and end dates.

\`\`\`yml
startDate: ${globalThis.moment(THIRTEEN_WEEKS_HEATMAP_BASE_CONFIG.startDate).format('YYYY-MM-DD')}
endDate: ${globalThis.moment(THIRTEEN_WEEKS_HEATMAP_BASE_CONFIG.endDate).format('YYYY-MM-DD')}
\`\`\`
`,
      },
    }
  },
  args: {
    data: OCCURRENCES,
    groupedData: [aBasesEntryGroup('', GROUPED_OCCURRENCES[0].entries)],
    onEntryClick: fn(),
    ...THIRTEEN_WEEKS_HEATMAP_BASE_CONFIG,
  },
};

export const ReverseColors: Story = {
  parameters: {
    docs: {
      description: {
        story: `Reverse the colors to accentuate the lowest values.

\`\`\`yml
reverseColors: true
\`\`\`
`,
      },
    }
  },
  args: {
    data: OCCURRENCES,
    groupedData: [aBasesEntryGroup('', GROUPED_OCCURRENCES[0].entries)],
    onEntryClick: fn(),
    ...REVERSE_COLORS_HEATMAP_BASE_CONFIG,
  },
};

// === LAYOUT STORIES ===

export const VerticalLayout: Story = {
  parameters: {
    docs: {
      description: {
        story: `Display the heatmap in vertical orientation, with weeks as rows.

\`\`\`yml
layout: vertical
\`\`\`
`,
      },
    },
  },
  args: {
    data: OCCURRENCES,
    groupedData: [aBasesEntryGroup('', GROUPED_OCCURRENCES[0].entries)],
    onEntryClick: fn(),
    ...VERTICAL_LAYOUT_CONFIG,
  },
};

export const MonthGridView: Story = {
  parameters: {
    docs: {
      description: {
        story: `Traditional calendar month view with days arranged in a 7-column grid.

\`\`\`yml
viewMode: month-grid
\`\`\`
`,
      },
    },
  },
  args: {
    data: OCCURRENCES,
    groupedData: [aBasesEntryGroup('', GROUPED_OCCURRENCES[0].entries)],
    onEntryClick: fn(),
    ...MONTH_GRID_CONFIG,
  },
};

export const TypeTracking: Story = {
  parameters: {
    docs: {
      description: {
        story: `Track \`boolean\` (checkbox), \`string\` (length) and \`list\` (item count) properties.

\`\`\`yml
trackType: boolean
\`\`\`
`,
      },
    },
  },
  args: {
    data: OCCURRENCES,
    groupedData: [aBasesEntryGroup('', OCCURRENCES)],
    onEntryClick: fn(),
    ...BOOLEAN_TRACKING_CONFIG,
  },
};

export const CustomColorSwatch: Story = {
  parameters: {
    docs: {
      description: {
        story: `Define your own color palette. Missing colors are interpolated automatically.

\`\`\`yml
customColors:
  - "#ebedf0"
  - "#c6e48b"
  - "#196127"
overflowColor: "#ff4444"
\`\`\`
`,
      },
    },
  },
  args: {
    data: OCCURRENCES,
    groupedData: [aBasesEntryGroup('', GROUPED_OCCURRENCES[0].entries)],
    onEntryClick: fn(),
    ...CUSTOM_COLORS_CONFIG,
  },
};
