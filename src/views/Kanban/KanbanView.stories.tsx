import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { TASK_ENTRIES_GROUPED } from "@/__fixtures__/entries";

import {
  With3x2Ratio,
  With4x5Ratio,
  WithBadge,
  WithBadgeColor,
  WithBadgeIcon,
  WithCircleShape,
  WithContentReversed,
  WithGroupColor,
  WithGroupIcon,
  WithGroupTitle,
  WithHorizontalLayout,
  WithHover,
  WithHoverOverlay,
  WithIcon,
  WithImage,
  WithInferPropertiesFromFirstItem,
  WithMarkdownContent,
  WithOverlayLayout,
  WithoutGap,
  WithoutPropertyTitles,
  WithoutTitle,
  WithPolaroidLayout,
  WithRoundedShape,
  WithSize2XS,
  WithSize3XS,
  WithSize3XSAndSpacing,
  WithSquareImage,
  WithStaticBackground,
  WithVerticalLayout,
} from "@/__fixtures__/facets/configs";
import { FACETS_CONFIG_DEFAULTS } from "@/components/Facets/config";
import { FACETS_CONFIG_ARG_TYPES } from "@/components/Facets/config/stories.argTypes";

import {
  createViewRenderer,
  Providers,
  ViewWrapper,
} from "@/stories/decorators";

import KANBAN_VIEW from ".";

import KanbanView, { type KanbanConfig } from "./KanbanView";

const View = createViewRenderer<KanbanConfig>(KanbanView);

const meta = {
  title: "Views/Kanban",
  component: View,
  tags: ["autodocs", "status:ready"],
  decorators: [ViewWrapper, Providers],
  parameters: {
    layout: "fullscreen",
    docs: {
      def: KANBAN_VIEW,
      subtitle:
        "A dynamic, horizontal scrolling experience that showcases your notes in a continuous flow. Perfect for highlight reels, featured notes, or visual storytelling.",
      description: {
        component: `### Features

- **Horizontal Sliding**: Fluid, touch-friendly scrolling through your note collection.
- **Smart Navigation**: Intuitive arrows and momentum support for easy browsing.
- **Title & Context**: Dedicated space for a section title and subtitle to provide context.
- **Rich Card Support**: Leverages the full power of the Facet Cards system for content display.
- **Entrance Animations**: Staggered motion effects as the carousel enters the view.

### Configuration`,
      },
    },
  },
  argTypes: {
    ...FACETS_CONFIG_ARG_TYPES,
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
    onEntryHover: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    onEntryClick: fn(),
    ...FACETS_CONFIG_DEFAULTS,
    properties: [],
    groupedData: TASK_ENTRIES_GROUPED,
    groupBy: {
      property: "note.status",
      direction: "ASC",
    },
    ...WithInferPropertiesFromFirstItem,
    ...WithGroupTitle,
  },
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FullExample: Story = {
  args: {
    ...WithSize2XS,
    ...WithImage,
    ...With4x5Ratio,
    ...WithHorizontalLayout,
    ...WithContentReversed,
    ...WithoutPropertyTitles,
    ...WithMarkdownContent,
    ...WithHover,
    ...WithHoverOverlay,
    ...WithStaticBackground,
    ...WithIcon,
    ...WithGroupIcon,
    ...WithGroupColor,
  },
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "By default, the carousel displays cards in a vertical layout with basic configuration.",
      },
    },
  },
};

// === LAYOUT STORIES ===

export const HorizontalLayout: Story = {
  parameters: {
    docs: {
      description: {
        story: `Horizontal layout displays the image on the side of the card content.

\`\`\`yml
cardLayout: horizontal
\`\`\`
`,
      },
    },
  },
  args: {
    ...WithSize2XS,
    ...WithImage,
    ...With4x5Ratio,
    ...WithHorizontalLayout,
    ...WithContentReversed,
    ...WithoutPropertyTitles,
    ...WithMarkdownContent,
    ...WithBadge,
    ...WithBadgeColor,
    ...WithBadgeIcon,
    ...WithHover,
    ...WithHoverOverlay,
  },
};

export const OverlayLayout: Story = {
  parameters: {
    docs: {
      description: {
        story: `Overlay layout displays the content in an overlay. Additionally, you can configure the overlay content visibility to always show or only show when hovering.

\`\`\`yml
cardLayout: overlay
contentVisibility: hover | always
badgeProperty: note.rating
badgeIconProperty: star
badgeColorProperty: "#D0A215"
\`\`\`
`,
      },
    },
  },
  args: {
    ...WithSize3XS,
    ...WithImage,
    ...With3x2Ratio,
    ...WithOverlayLayout,
    ...WithBadge,
    ...WithBadgeColor,
    ...WithBadgeIcon,
    ...WithoutPropertyTitles,
  },
};

export const PolaroidLayout: Story = {
  parameters: {
    docs: {
      description: {
        story: `Polaroid layout displays cards with a classic photo-album aesthetic, featuring white borders and a larger bottom margin.

\`\`\`yml
cardLayout: polaroid
\`\`\`
`,
      },
    },
  },
  args: {
    ...WithSize3XS,
    ...WithImage,
    ...WithSquareImage,
    ...WithPolaroidLayout,
  },
};

// === SHAPE STORIES ===

export const CircleShape: Story = {
  parameters: {
    docs: {
      description: {
        story: `Circle shape creates rounded cards perfect for profile images or avatars.

\`\`\`yml
cardShape: circle
mediaAspectRatio: 1
\`\`\`
`,
      },
    },
  },
  args: {
    ...WithSize3XSAndSpacing,
    ...WithoutGap,
    ...WithVerticalLayout,
    ...WithCircleShape,
    ...WithImage,
    ...WithSquareImage,
    ...WithoutTitle,
  },
};

export const RoundedShape: Story = {
  parameters: {
    docs: {
      description: {
        story: `Rounded shape provides a softer, more modern appearance.

\`\`\`yml
cardShape: rounded
\`\`\`
`,
      },
    },
  },
  args: {
    ...WithSize3XSAndSpacing,
    ...WithoutGap,
    ...WithVerticalLayout,
    ...WithRoundedShape,
    ...WithImage,
    ...WithSquareImage,
    ...WithoutTitle,
  },
};
