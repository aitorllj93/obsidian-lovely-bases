import type { Meta, StoryObj } from "@storybook/react-vite";

import { PLANS_ENTRIES } from "@/__fixtures__/entries";
import {
  createViewRenderer,
  Providers,
  ViewWrapper,
} from "@/stories/decorators";

import LINEAR_CALENDAR_VIEW from ".";

import {
  DEFAULT_BASE_CONFIG,
  FULL_BASE_CONFIG,
  HALF_BASE_CONFIG,
  QUARTER_BASE_CONFIG,
} from "./__fixtures__/configs";

import LinearCalendarView, {
  type LinearCalendarConfig,
} from "./LinearCalendarView";
import { aBasesEntryGroup } from "@/__mocks__";
import { fn } from "storybook/test";

const View = createViewRenderer<LinearCalendarConfig>(LinearCalendarView);

const meta = {
  title: "Views/Linear Calendar",
  component: View,
  tags: ["autodocs"],
  decorators: [Providers, ViewWrapper],
  parameters: {
    layout: 'fullscreen',
    docs: {
      icon: LINEAR_CALENDAR_VIEW.icon,
      subtitle:
        "A sleek, horizontal timeline view that displays your notes as events across a calendar, perfect for visualizing schedules, projects, or journals.",
      description: {
        component: `
### Features

- **Adjustable Focus**: Switch between **Full**, **Half** (6 months), and **Quarter** (3 months) views.
- **Event Visualization**: Notes are displayed as bars spanning from their start to end dates.
- **Auto-Stacking**: Overlapping events are automatically stacked vertically for clear visibility.
- **Color Coding**: Automatically uses the \`note.color\` property to style the event bars.
- **Interactive**: Click on any event bar to immediately open the associated note.

### Configuration`,
      },
    },
  },
  argTypes: {
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
    onEntryHover: {
      table: {
        disable: true,
      },
    },
    focus: {
      control: "select",
      options: ["full", "half", "quarter"],
      name: "Focus",
      description: "The time span to display ('full', 'half', or 'quarter').",
      table: { defaultValue: { summary: "full" } },
    },
    startDateProperty: {
      control: "text",
      name: "Start Date Property",
      description: "The property used for the event's start date (required).",
    },
    endDateProperty: {
      control: "text",
      name: "End Date Property",
      description:
        "The property used for the event's end date (optional, defaults to start date).",
    },
    colorProperty: {
      control: "text",
      name: "Color Property",
      description: "The property used for the event's color (optional, defaults to note.color).",
    },
    iconProperty: {
      control: "text",
      name: "Icon Property",
      description: "The property used for the event's icon (optional, defaults to note.icon).",
    },
    date: {
      control: "text",
      name: "Reference Date",
      description:
        "The date around which the calendar centers (optional, defaults to today).",
    },
  },
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Full: Story = {
  args: {
    data: PLANS_ENTRIES,
    groupedData: [aBasesEntryGroup('', PLANS_ENTRIES)],
    onEntryClick: fn(),
    ...FULL_BASE_CONFIG,
  },
};

export const Default: Story = {
  args: {
    data: PLANS_ENTRIES,
    groupedData: [aBasesEntryGroup('', PLANS_ENTRIES)],
    onEntryClick: fn(),
    ...DEFAULT_BASE_CONFIG,
  },
};

export const HalfYear: Story = {
  args: {
    data: PLANS_ENTRIES,
    groupedData: [aBasesEntryGroup('', PLANS_ENTRIES)],
    onEntryClick: fn(),
    ...HALF_BASE_CONFIG,
  },
};

export const QuarterOfYear: Story = {
  args: {
    data: PLANS_ENTRIES,
    groupedData: [aBasesEntryGroup('', PLANS_ENTRIES)],
    onEntryClick: fn(),
    ...QUARTER_BASE_CONFIG,
  },
};
