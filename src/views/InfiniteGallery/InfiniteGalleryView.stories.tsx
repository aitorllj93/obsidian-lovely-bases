import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  MOVIES_ENTRIES,
  VIRTUAL_SCROLL_MOVIES_ENTRIES,
} from "@/__fixtures__/entries";
import { aBasesEntryGroup } from "@/__mocks__";
import { createViewRenderer, Providers, ViewWrapper } from "@/stories/decorators";

import INFINITE_GALLERY_VIEW from ".";

import {
  MASONRY_BASE_CONFIG,
  POLAROID_BASE_CONFIG,
} from "./__fixtures__/config";

import InfiniteGalleryView, { type InfiniteGalleryConfig } from "./InfiniteGalleryView";

const View = createViewRenderer<InfiniteGalleryConfig>(InfiniteGalleryView);

const meta = {
  title: "Views/Infinite Gallery",
  component: View,
  tags: ["autodocs", "desktop-only"],
  decorators: [Providers, ViewWrapper],
  parameters: {
    layout: 'fullscreen',
    extraNotes: [
      {
        title: 'Performance issues on mobile devices',
        description: 'The view may freeze or crash on some mobile devices even with small datasets (<100 items). Use this view only in desktop devices unless you know what you are doing.',
      }
    ],
    docs: {
      icon: INFINITE_GALLERY_VIEW.icon,
      subtitle:
        "An immersive, infinite virtualized grid for exploring your notes visually. It handles large collections smoothly with momentum-based navigation and multiple artistic layouts.",
      description: {
        component: `### Features

- **Infinite Virtual Grid**: Seamlessly navigate through any number of notes without performance lag.
- **Momentum Drag & Scroll**: Fluid, natural-feeling navigation with momentum and smooth wheel support.
- **Artistic Layouts**:
  - **Default**: A clean, balanced grid.
  - **Masonry**: A dynamic, staggered layout.
  - **Polaroid**: A classic photo-album aesthetic with borders and playful rotations.
- **Geometric Shapes**: Custom card shapes including **Square**, **Circle** and **Rounded**.

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
      options: ["default", "masonry", "polaroid"],
      name: "Layout",
      description: "The layout style of the gallery (default, masonry, polaroid).",
      table: {
        category: "Layout & Display",
        defaultValue: { summary: "masonry" },
      },
    },
    cardSize: {
      control: { type: "range", min: 50, max: 800, step: 10 },
      name: "Card Size",
      description: "The size of the cards in the grid.",
      table: {
        category: "Layout & Display",
        defaultValue: { summary: "100" },
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
    // Image
    imageProperty: {
      control: "text",
      name: "Image Property",
      description: "The property that contains the image to display on the cards.",
      table: {
        category: "Image",
      },
    },
    imageFit: {
      control: "select",
      options: ["cover", "contain"],
      name: "Image Fit",
      description: "How the image should fit within the card (cover or contain).",
      table: {
        category: "Image",
        defaultValue: { summary: "cover" },
      },
    },
    aspectRatio: {
      control: { type: "range", min: 0.25, max: 2.5, step: 0.05 },
      name: "Image Aspect Ratio",
      description: "The aspect ratio of the image cards.",
      table: {
        category: "Image",
        defaultValue: { summary: "1.5" },
      },
    },
  },
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Masonry: Story = {
  args: {
    data: VIRTUAL_SCROLL_MOVIES_ENTRIES,
    groupedData: [
      aBasesEntryGroup('', MOVIES_ENTRIES),
    ],
    ...MASONRY_BASE_CONFIG,
  },
};


export const Polaroid: Story = {
  args: {
    data: VIRTUAL_SCROLL_MOVIES_ENTRIES,
    groupedData: [
      aBasesEntryGroup('', MOVIES_ENTRIES),
    ],
    ...POLAROID_BASE_CONFIG,
  },
};
