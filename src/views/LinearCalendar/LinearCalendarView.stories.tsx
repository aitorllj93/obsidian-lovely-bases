import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { PLANS_ENTRIES } from "@/__fixtures__/entries";
import { aBasesEntryGroup } from "@/__mocks__";
import { type NamespacedTranslationKey, translate } from "@/lib/i18n";
import {
  createViewRenderer,
  Providers,
  ViewWrapper,
} from "@/stories/decorators";

import LINEAR_CALENDAR_VIEW from ".";

import {
  ALT_VISUALIZATIONS_BASE_CONFIG,
  COLORS_ICONS_BASE_CONFIG,
  DEFAULT_BASE_CONFIG,
  FULL_BASE_CONFIG,
} from "./__fixtures__/configs";

import LinearCalendarView, {
  type LinearCalendarConfig,
} from "./LinearCalendarView";

const View = createViewRenderer<LinearCalendarConfig>(LinearCalendarView);

const t = (key: NamespacedTranslationKey<'linearCalendar'>) => translate("en", 'linearCalendar', key);


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
    startDateProperty: {
      control: "text",
      name: t("options.data.startDateProperty.title"),
      description: "The property used for the event's start date (required).",
      table: {
        category: t("options.data.title"),
      },
    },
    endDateProperty: {
      control: "text",
      name: t("options.data.endDateProperty.title"),
      description:
        "The property used for the event's end date (optional, defaults to start date).",
      table: {
        category: t("options.data.title"),
      },
    },
    titleProperty: {
      control: "text",
      name: t("options.data.titleProperty.title"),
      description: "The property used for the event's title (optional, defaults to file.basename).",
      table: {
        category: t("options.data.title"),
      },
    },
    date: {
      control: "text",
      name: t("options.dateRange.referenceDate.title"),
      description:
        "The date around which the calendar centers (optional, defaults to today).",
      table: {
        category: t("options.dateRange.title"),
        defaultValue: { summary: "today" },
      },
    },
    focus: {
      control: "select",
      options: ["full", "half", "quarter"],
      name: t("options.dateRange.focus.title"),
      description: "The time span to display ('full', 'half', or 'quarter').",
      table: {
        category: t("options.dateRange.title"),
        defaultValue: { summary: "full" },
      },
    },
    colorProperty: {
      control: "text",
      name: t("options.appearance.colorProperty.title"),
      description: "The property used for the event's color (optional, defaults to note.color).",
      table: {
        category: t("options.appearance.title"),
      },
    },
    iconProperty: {
      control: "text",
      name: t("options.appearance.iconProperty.title"),
      description: "The property used for the event's icon (optional, defaults to note.icon).",
      table: {
        category: t("options.appearance.title"),
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
    data: PLANS_ENTRIES,
    groupedData: [aBasesEntryGroup('', PLANS_ENTRIES)],
    onEntryClick: fn(),
    ...FULL_BASE_CONFIG,
  },
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "By default, the linear calendar displays the data for the active year. You can change that by changing the `date` property.",
      },
    }
  },
  args: {
    data: PLANS_ENTRIES,
    groupedData: [aBasesEntryGroup('', PLANS_ENTRIES)],
    onEntryClick: fn(),
    ...DEFAULT_BASE_CONFIG,
  },
};

export const AltVisualizations: Story = {
  parameters: {
    docs: {
      description: {
        story: `You can display quarter of year or half of year by changing the \`focus\` property.

\`\`\`yml
focus: "half"
\`\`\`
`,
      },
    }
  },
  args: {
    data: PLANS_ENTRIES,
    groupedData: [aBasesEntryGroup('', PLANS_ENTRIES)],
    onEntryClick: fn(),
    ...ALT_VISUALIZATIONS_BASE_CONFIG,
  },
};


export const ColorsAndIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: `Enable colors and icons by setting the \`colorProperty\` and \`iconProperty\` properties and including the right values in your data.

\`\`\`yml
colorProperty: "note.color"
iconProperty: "note.icon"
\`\`\`
`,
      },
    },
  },
  args: {
    data: PLANS_ENTRIES,
    groupedData: [aBasesEntryGroup('', PLANS_ENTRIES)],
    onEntryClick: fn(),
    ...COLORS_ICONS_BASE_CONFIG,
  },
};
