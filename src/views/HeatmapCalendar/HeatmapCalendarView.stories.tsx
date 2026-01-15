import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { GROUPED_OCCURRENCES, OCCURRENCES } from "@/__fixtures__/entries";
import {
  createViewRenderer,
  Providers,
  ViewWrapper,
} from "@/stories/decorators";
import HEATMAP_CALENDAR_VIEW from ".";
import {
  DEFAULT_HEATMAP_BASE_CONFIG,
  FULL_HEATMAP_BASE_CONFIG,
  REVERSE_COLORS_HEATMAP_BASE_CONFIG,
  THIRTEEN_WEEKS_HEATMAP_BASE_CONFIG,
} from "./__fixtures__/configs/heatmap";
import HeatmapCalendarView, {
  type HeatmapCalendarConfig,
} from "./HeatmapCalendarView";
import { aBasesEntryGroup } from "@/__mocks__";

const View = createViewRenderer<HeatmapCalendarConfig>(HeatmapCalendarView);

const meta = {
  title: "Views/Heatmap Calendar",
  tags: ["autodocs"],
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
    dateProperty: {
      control: "text",
      name: "Date Property",
      description:
        "The property used to determine the date of the entry (required).",
    },
    trackProperty: {
      control: "text",
      name: "Track Property",
      description:
        "The property used to calculate the intensity of the heatmap (required).",
    },
    colorScheme: {
      table: { defaultValue: { summary: "primary" } },
      control: "select",
      name: "Color Scheme",
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
    },
    startDate: {
      control: "text",
      name: "Start Date",
      description:
        "The start date for the calendar display (format: YYYY-MM-DD).",
      table: { defaultValue: { summary: '1 year ago' } },
    },
    endDate: {
      control: "text",
      name: "End Date",
      description:
        "The end date for the calendar display (format: YYYY-MM-DD).",
      table: { defaultValue: { summary: 'today' } },
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
startDate: ${global.moment(THIRTEEN_WEEKS_HEATMAP_BASE_CONFIG.startDate).format('YYYY-MM-DD')}
endDate: ${global.moment(THIRTEEN_WEEKS_HEATMAP_BASE_CONFIG.endDate).format('YYYY-MM-DD')}
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
