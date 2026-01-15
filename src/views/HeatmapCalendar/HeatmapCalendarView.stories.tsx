import type { Meta, StoryObj } from "@storybook/react-vite";

import { GROUPED_OCCURRENCES, OCCURRENCES } from "@/__fixtures__/entries";
import {
  createViewRenderer,
  Providers,
  ViewWrapper,
} from "@/stories/decorators";

import HEATMAP_CALENDAR_VIEW from ".";

import { SEMAPHOR_HEATMAP_BASE_CONFIG } from "./__fixtures__/configs/heatmap";

import HeatmapCalendarView, {
  type HeatmapCalendarConfig,
} from "./HeatmapCalendarView";

const View = createViewRenderer<HeatmapCalendarConfig>(HeatmapCalendarView);

const meta = {
  title: "Views/Heatmap Calendar",
  tags: ["autodocs"],
  component: View,
  decorators: [Providers, ViewWrapper],
  parameters: {
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
    date: {
      control: "text",
      name: "Reference Date",
      description:
        "The date used as the end point for the calendar display (optional, defaults to today).",
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
  },
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Semaphor: Story = {
  args: {
    data: OCCURRENCES,
    groupedData: GROUPED_OCCURRENCES,
    ...SEMAPHOR_HEATMAP_BASE_CONFIG,
  },
};
