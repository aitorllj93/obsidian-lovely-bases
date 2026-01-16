import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import {
  VIRTUAL_SCROLL_APPLICATION_ENTRIES,
  VIRTUAL_SCROLL_ARTICLES_ENTRIES,
  VIRTUAL_SCROLL_BOOKS_ENTRIES,
  VIRTUAL_SCROLL_MOVIES_ENTRIES,
  VIRTUAL_SCROLL_PERSON_ENTRIES,
} from "@/__fixtures__/entries";
import { createViewRenderer, Providers, ScrollViewWrapper } from "@/stories/decorators";

import FACET_CARDS_VIEW from ".";

import {
  APPLICATIONS_BASE_CONFIG,
  ARTICLES_BASE_CONFIG,
  BOOKS_BASE_CONFIG,
  MOVIES_BASE_CONFIG,
  PEOPLE_BASE_CONFIG,
} from "./__fixtures__/configs";

import FacetCardsView, { type FacetCardsConfig } from "./FacetCardsView";

const View = createViewRenderer<FacetCardsConfig>(FacetCardsView);

const meta = {
  title: "Views/Facet Cards",
  component: View,
  tags: ["autodocs", "status:testing"],
  decorators: [Providers, ScrollViewWrapper],
  parameters: {
    layout: 'fullscreen',
    docs: {
      icon: FACET_CARDS_VIEW.icon,
      subtitle:
        "A structured, property-rich card view that gives you more control over how your note data is displayed. Perfect for databases, catalogs, or property-heavy notes.",
      description: {
        component: `### Features

- **Flexible Layouts**: Choose between **Vertical** (image on top) or **Horizontal** (image on the side) layouts.
- **Rich Media Integration**: Display images from any note property with precise control over aspect ratio and fit.
- **Property-Focused**: Dedicated space for displaying multiple note properties with optional labels.
- **Interactive Effects**: Enhance your cards with hover-activated overlays for extra information.
- **Highly Responsive**: Automatically scales and adapts to any screen size while maintaining performance.

### Configuration`,
      },
    },
  },
  argTypes: {
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
    // Layout & Display
    layout: {
      control: "select",
      options: ["horizontal", "vertical"],
      name: "Layout",
      description: "The layout of the cards (horizontal or vertical).",
      table: {
        category: "Layout & Display",
        defaultValue: { summary: "horizontal" },
      },
    },
    shape: {
      control: "select",
      options: ["square", "circle", "rounded"],
      name: "Shape",
      description: "The shape of the cards (square, circle, rounded).",
      table: {
        category: "Layout & Display",
        defaultValue: { summary: "square" },
      },
    },
    cardSize: {
      control: { type: "range", min: 50, max: 800, step: 10 },
      name: "Card Size",
      description: "The size of the cards in the grid.",
      table: {
        category: "Layout & Display",
        defaultValue: { summary: "400" },
      },
    },
    reverseContent: {
      control: "boolean",
      name: "Reverse Content",
      description: "Whether to reverse the content of the cards (useful for alternating designs).",
      table: {
        category: "Layout & Display",
        defaultValue: { summary: "false" },
      },
    },
    // Image
    imageProperty: {
      control: "text",
      name: "Image Property",
      description: "The property that contains the image to display on the cards.",
      table: {
        category: "Image",
      },
    },
    imageAspectRatio: {
      control: { type: "range", min: 0.25, max: 2.5, step: 0.05 },
      name: "Image Aspect Ratio",
      description: "The aspect ratio of the image.",
      table: {
        category: "Image",
        defaultValue: { summary: "1.5" },
      },
    },
    imageFit: {
      control: "select",
      options: ["cover", "contain"],
      name: "Image Fit",
      description: "The fit of the image (cover or contain).",
      table: {
        category: "Image",
        defaultValue: { summary: "cover" },
      },
    },
    // Content
    showTitle: {
      control: "boolean",
      name: "Show Title",
      description: "Whether to show the title of the cards.",
      table: {
        category: "Content",
        defaultValue: { summary: "true" },
      },
    },
    showPropertyTitles: {
      control: "boolean",
      name: "Show Property Titles",
      description: "Whether to show the names of the displayed properties.",
      table: {
        category: "Content",
        defaultValue: { summary: "true" },
      },
    },
    properties: {
      control: "object",
      name: "Properties",
      description: "The properties to display on the cards (from the view's properties config).",
      table: {
        category: "Content",
        disable: true,
      },
    },
    // Hover Effects
    hoverProperty: {
      control: "text",
      name: "Hover Property",
      description: "The property to display on hover (optional).",
      table: {
        category: "Hover Effects",
      },
    },
    hoverStyle: {
      control: "select",
      options: ["none", "overlay", "tooltip"],
      name: "Hover Style",
      description: "The style of the hover (none, overlay, tooltip).",
      table: {
        category: "Hover Effects",
        defaultValue: { summary: "none" },
      },
    },
  },
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Articles: Story = {
  args: {
    data: VIRTUAL_SCROLL_ARTICLES_ENTRIES,
    ...ARTICLES_BASE_CONFIG,
  },
};

export const Movies: Story = {
  args: {
    data: VIRTUAL_SCROLL_MOVIES_ENTRIES,
    ...MOVIES_BASE_CONFIG,
  },
  play: async ({ canvas }): Promise<void> => {
    const container = canvas.getByTestId("lovely-bases") as HTMLElement;

    container.scrollTop = 100;

    const cards = canvas?.getAllByTestId("lovely-card");
    await expect(cards).toHaveLength(24);
  },
};

export const Books: Story = {
  args: {
    data: VIRTUAL_SCROLL_BOOKS_ENTRIES,
    ...BOOKS_BASE_CONFIG,
  },
};

export const People: Story = {
  args: {
    data: VIRTUAL_SCROLL_PERSON_ENTRIES,
    ...PEOPLE_BASE_CONFIG,
  },
};

export const Applications: Story = {
  args: {
    data: VIRTUAL_SCROLL_APPLICATION_ENTRIES,
    ...APPLICATIONS_BASE_CONFIG,
  },
};
