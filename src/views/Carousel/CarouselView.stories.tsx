import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import {
  APPLICATION_ENTRIES,
  ARTICLE_ENTRIES,
  BOOK_ENTRIES,
  MOVIES_ENTRIES,
  MOVIES_ENTRIES_GROUPED,
  PERSON_ENTRIES,
  PHOTOS_ENTRIES,
} from "@/__fixtures__/entries";

import {
  With3x2Ratio,
  With4x5Ratio,
  WithActiveItemBackground,
  WithBadge,
  WithBadgeColor,
  WithBadgeIcon,
  WithCircleShape,
  WithContentReversed,
  WithGroupSubtitle,
  WithGroupTitle,
  WithHorizontalLayout,
  WithHover,
  WithHoverOverlay,
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
  WithVerticalLayout,
  WithVideo,
  With16x9ActiveRatio,
  WithLayoutContent,
  WithLightGradientBackground,
  WithNoActiveEffect,
} from "@/__fixtures__/facets/configs";
import { FACETS_CONFIG_DEFAULTS } from "@/components/Facets/config";
import { FACETS_CONFIG_ARG_TYPES } from "@/components/Facets/config/stories.argTypes";

import {
  createViewRenderer,
  Providers,
  ViewWrapper,
} from "@/stories/decorators";

import CAROUSEL_VIEW from ".";

import CarouselView, { type CarouselConfig } from "./CarouselView";

const View = createViewRenderer<CarouselConfig>(CarouselView);

const meta = {
  title: "Views/Carousel",
  component: View,
  tags: ["autodocs", "status:ready"],
  decorators: [ViewWrapper, Providers],
  parameters: {
    layout: "fullscreen",
    docs: {
      def: CAROUSEL_VIEW,
      icon: CAROUSEL_VIEW.icon,
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
    data: BOOK_ENTRIES,
    onEntryClick: fn(),
    ...FACETS_CONFIG_DEFAULTS,
    properties: [],
    ...WithImage,
  },
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FullExample: Story = {
  args: {
    groupedData: MOVIES_ENTRIES_GROUPED,
    ...WithSize3XS,
    ...WithVideo,
    ...With3x2Ratio,
    ...WithOverlayLayout,
    ...WithBadge,
    ...WithBadgeColor,
    ...WithBadgeIcon,
    ...WithoutPropertyTitles,
    ...WithGroupTitle,
    ...WithInferPropertiesFromFirstItem,
    ...With16x9ActiveRatio,
    ...WithLayoutContent,
    ...WithMarkdownContent,
    ...WithNoActiveEffect,
    ...WithActiveItemBackground,
    ...WithLightGradientBackground,
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
    data: ARTICLE_ENTRIES,
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
    data: MOVIES_ENTRIES,
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
    data: PHOTOS_ENTRIES,
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
    data: PERSON_ENTRIES,
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
    data: APPLICATION_ENTRIES,
    ...WithSize3XSAndSpacing,
    ...WithoutGap,
    ...WithVerticalLayout,
    ...WithRoundedShape,
    ...WithImage,
    ...WithSquareImage,
    ...WithoutTitle,
  },
};

// === HEADER STORIES ===

export const TitleAndSubtitle: Story = {
  parameters: {
    docs: {
      description: {
        story: `Add groups titles and subtitles to provide context for the carousel section.

\`\`\`yml
groupTitleProperty: "note.sectionTitle"
groupSubtitleProperty: "note.sectionSubtitle"
\`\`\`
`,
      },
    },
  },
  args: {
    data: ARTICLE_ENTRIES,
    onEntryClick: fn(),
    ...WithGroupTitle,
    ...WithGroupSubtitle,
  },
};
