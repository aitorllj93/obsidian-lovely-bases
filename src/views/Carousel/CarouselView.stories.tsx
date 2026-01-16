
import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  APPLICATION_ENTRIES,
  ARTICLE_ENTRIES,
  BOOK_ENTRIES,
  MOVIES_ENTRIES,
  PERSON_ENTRIES,
} from "@/__fixtures__/entries";
import { createViewRenderer, Providers, ViewWrapper } from "@/stories/decorators";

import CAROUSEL_VIEW from '.';

import {
  APPLICATIONS_BASE_CONFIG,
  ARTICLES_BASE_CONFIG,
  BOOKS_BASE_CONFIG,
  MOVIES_BASE_CONFIG,
  PEOPLE_BASE_CONFIG,
} from "./__fixtures__/configs";

import CarouselView, { type CarouselConfig } from './CarouselView';

const View = createViewRenderer<CarouselConfig>(CarouselView);

const meta = {
  title: 'Views/Carousel',
  tags: ['autodocs'],
  component: View,
  decorators: [
    Providers,
    ViewWrapper,
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      icon: CAROUSEL_VIEW.icon,
      subtitle: `A dynamic, horizontal scrolling experience that showcases your notes in a continuous flow. Perfect for highlight reels, featured notes, or visual storytelling.`,
      description: {
        component: `### Features

- **Horizontal Sliding**: Fluid, touch-friendly scrolling through your note collection.
- **Smart Navigation**: Intuitive arrows and momentum support for easy browsing.
- **Title & Context**: Dedicated space for a section title and subtitle to provide context.
- **Rich Card Support**: Leverages the full power of the Facet Cards system for content display.
- **Entrance Animations**: Staggered motion effects as the carousel enters the view.

### Configuration`
      },
    },
  },
  argTypes: {
    // Header
    title: {
      control: "text",
      name: "Title",
      description: "The title displayed at the top of the carousel.",
      table: {
        category: "Header",
      },
    },
    subtitle: {
      control: "text",
      name: "Subtitle",
      description: "The subtitle displayed below the title.",
      table: {
        category: "Header",
      },
    },
    // Display
    layout: {
      control: "select",
      name: "Layout",
      description: "Orientation of the cards in the carousel.",
      options: ["horizontal", "vertical"],
      table: {
        category: "Display",
        defaultValue: { summary: "vertical" },
      },
    },
    shape: {
      control: "select",
      name: "Shape",
      description: "The shape of the cards.",
      options: ["square", "circle", "rounded"],
      table: {
        category: "Display",
        defaultValue: { summary: "square" },
      },
    },
    cardSize: {
      control: { type: "range", min: 50, max: 800, step: 10 },
      name: "Card Size",
      description: "The size of the cards in pixels.",
      table: {
        category: "Display",
        defaultValue: { summary: "400" },
      },
    },
    // Image
    imageProperty: {
      control: "text",
      name: "Image Property",
      description: "The property that contains the image to display on the cards.",
      table: {
        category: "Image",
        defaultValue: { summary: "note.cover" },
      },
    },
    imageFit: {
      control: "select",
      name: "Image Fit",
      description: "How the image should fit within its container.",
      options: ["cover", "contain"],
      table: {
        category: "Image",
        defaultValue: { summary: "cover" },
      },
    },
    imageAspectRatio: {
      control: { type: "range", min: 0.25, max: 2.5, step: 0.05 },
      name: "Image Aspect Ratio",
      description: "The aspect ratio of the image (width/height).",
      table: {
        category: "Image",
        defaultValue: { summary: "1.5" },
      },
    },
    reverseContent: {
      control: "boolean",
      name: "Reverse Image and Content",
      description: "Whether to reverse the order of image and content.",
      table: {
        category: "Image",
        defaultValue: { summary: "false" },
      },
    },
    // Content
    showTitle: {
      control: "boolean",
      name: "Show Title",
      description: "Whether to show the title on each card.",
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
    hoverProperty: {
      control: "text",
      name: "Hover Property",
      description: "The property to display when hovering over a card (optional).",
      table: {
        category: "Content",
      },
    },
    hoverStyle: {
      control: "select",
      name: "Hover Style",
      description: "How to display the hover property.",
      options: ["overlay", "tooltip", "none"],
      table: {
        category: "Content",
        defaultValue: { summary: "overlay" },
      },
    },
    // Internal props (disabled)
    properties: {
      table: {
        disable: true,
      }
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
    onEntryHover: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Articles: Story = {
  args: {
    data: ARTICLE_ENTRIES,
    ...ARTICLES_BASE_CONFIG,
  },
};

export const Movies: Story = {
  args: {
    data: MOVIES_ENTRIES,
    ...MOVIES_BASE_CONFIG,
  },
};


export const Books: Story = {
  args: {
    data: BOOK_ENTRIES,
    ...BOOKS_BASE_CONFIG,
  },
};

export const People: Story = {
  args: {
    data: PERSON_ENTRIES,
    ...PEOPLE_BASE_CONFIG,
  },
};

export const Applications: Story = {
  args: {
    data: APPLICATION_ENTRIES,
    ...APPLICATIONS_BASE_CONFIG,
  },
};
