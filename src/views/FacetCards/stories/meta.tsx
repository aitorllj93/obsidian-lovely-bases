import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import {
  GROUPED_ENTRIES,
  VIRTUAL_SCROLL_APPLICATION_ENTRIES,
  VIRTUAL_SCROLL_ARTICLES_ENTRIES,
  VIRTUAL_SCROLL_BOOKS_ENTRIES,
  VIRTUAL_SCROLL_MOVIES_ENTRIES,
  VIRTUAL_SCROLL_PERSON_ENTRIES,
  VIRTUAL_SCROLL_PHOTOS_ENTRIES,
} from "@/__fixtures__/entries";
import {
  With3x2Ratio,
  With4x5Ratio,
  WithBadge,
  WithBadgeColor,
  WithBadgeIcon,
  WithBorderDashed,
  WithCircleShape,
  WithColor,
  WithContentReversed,
  WithContentVisibilityOnHover,
  WithCustomBadgeFont,
  WithCustomContentFont,
  WithCustomTitleFont,
  WithGroupColor,
  WithGroupIcon,
  WithHorizontalLayout,
  WithHover,
  WithHoverOverlay,
  WithIcon,
  WithImage,
  WithInferPropertiesFromLinkedNotes,
  WithMarkdownContent,
  WithNotebookShape,
  WithOverlayLayout,
  WithoutGap,
  WithoutPropertyTitles,
  WithoutTitle,
  WithPolaroidLayout,
  WithRoundedShape,
  WithSize2XS,
  WithSize3XS,
  WithSize3XSAndSpacing,
  WithSize6XSAndSpacing,
  WithSquareImage,
  WithTiltedActiveEffect,
  WithUngroupedItemsInline,
  WithVerticalLayout,
} from "@/__fixtures__/facets/configs";
import { FACETS_CONFIG_DEFAULTS } from "@/components/Facets/config";
import { FACETS_CONFIG_ARG_TYPES } from "@/components/Facets/config/stories.argTypes";
import {
  createViewRenderer,
  Providers,
  ViewWrapper,
} from "@/stories/decorators";

import FACET_CARDS_VIEW from "..";
import FacetCardsView, { type FacetCardsConfig } from "../FacetCardsView";

export const View = createViewRenderer<FacetCardsConfig>(FacetCardsView);

export const meta = {
  title: "Views/Grid",
  component: View,
  tags: ["autodocs", "status:ready"],
  decorators: [ViewWrapper, Providers],
  parameters: {
    layout: "fullscreen",
    docs: {
      def: FACET_CARDS_VIEW,
      subtitle:
        "A structured, property-rich card view that gives you more control over how your note data is displayed. Perfect for databases, catalogs, or property-heavy notes.",
      description: {
        component: `### Features

- **Flexible Layouts**: Choose between **Vertical** (image on top), **Horizontal** (image on the side) or **Overlay** (content in an overlay) layouts.
- **Rich Media Integration**: Display images from any note property with precise control over aspect ratio and fit.
- **Property-Focused**: Dedicated space for displaying multiple note properties with optional labels.
- **Interactive Effects**: Enhance your cards with hover-activated overlays for extra information.
- **Highly Responsive**: Automatically scales and adapts to any screen size while maintaining performance.

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
    data: VIRTUAL_SCROLL_ARTICLES_ENTRIES,
    onEntryClick: fn(),
    ...FACETS_CONFIG_DEFAULTS,
  },
} satisfies Meta<typeof View>;

export default meta;

export type FacetCardsViewStory = StoryObj<typeof meta>;

export const FullExample: FacetCardsViewStory = {
  args: {
    ...WithSize6XSAndSpacing,
    ...WithBorderDashed,
    ...WithNotebookShape,
    ...WithUngroupedItemsInline,
    ...WithImage,
    ...WithSquareImage,
    ...WithPolaroidLayout,
    ...WithoutPropertyTitles,
    ...WithBadge,
    ...WithBadgeColor,
    ...WithBadgeIcon,
    ...WithColor,
    ...WithGroupColor,
    ...WithIcon,
    ...WithGroupIcon,
    ...WithCustomTitleFont,
    ...WithCustomContentFont,
    ...WithCustomBadgeFont,
    ...WithTiltedActiveEffect,
    ...WithInferPropertiesFromLinkedNotes,
    groupedData: GROUPED_ENTRIES,
  },
};

export const Default: FacetCardsViewStory = {
  parameters: {
    docs: {
      description: {
        story:
          "By default, the view displays cards in a vertical layout with square shape, showing titles and property labels.",
      },
    },
  },
  args: {
    properties: ["note.author", "note.published", "note.excerpt"],
  },
};

export const HorizontalLayout: FacetCardsViewStory = {
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
    data: VIRTUAL_SCROLL_ARTICLES_ENTRIES,
    properties: ["note.author", "note.published"],
  },
};

export const VerticalLayout: FacetCardsViewStory = {
  args: {
    ...WithSize3XS,
    ...WithImage,
    ...With4x5Ratio,
    ...WithVerticalLayout,
    ...WithoutPropertyTitles,
    ...WithBadge,
    ...WithBadgeColor,
    ...WithBadgeIcon,
    data: VIRTUAL_SCROLL_ARTICLES_ENTRIES,
    properties: ["note.author", "note.published", "note.excerpt"],
  },
};

export const OverlayLayout: FacetCardsViewStory = {
  parameters: {
    docs: {
      description: {
        story: `Overlay layout displays the content in an overlay. Additionally, you can configure the overlay content visibility to always show or only show when hovering.

\`\`\`yml
cardLayout: overlay
contentVisibility: always
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
    data: VIRTUAL_SCROLL_BOOKS_ENTRIES,
  },
};

export const OverlayOnHoverLayout: FacetCardsViewStory = {
  parameters: {
    docs: {
      description: {
        story: `Overlay layout with the content displayed on hover.

\`\`\`yml
cardLayout: overlay
contentVisibility: hover
\`\`\`
`,
      },
    },
  },
  args: {
    ...OverlayLayout.args,
    ...WithContentVisibilityOnHover,
    ...WithMarkdownContent,
    data: VIRTUAL_SCROLL_MOVIES_ENTRIES,
  },
};

export const PolaroidLayout: FacetCardsViewStory = {
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
    data: VIRTUAL_SCROLL_PHOTOS_ENTRIES,
  },
};

export const CircleShape: FacetCardsViewStory = {
  parameters: {
    docs: {
      description: {
        story: `Circle shape creates rounded cards perfect for profile images or avatars.

\`\`\`yml
cardShape: circle
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
    data: VIRTUAL_SCROLL_PERSON_ENTRIES,
  },
};

export const RoundedShape: FacetCardsViewStory = {
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
    data: VIRTUAL_SCROLL_APPLICATION_ENTRIES,
  },
};
