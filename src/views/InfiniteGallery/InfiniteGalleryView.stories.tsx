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
  tags: ["autodocs"],
  decorators: [Providers, ViewWrapper],
  parameters: {
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
    layout: { control: "radio", options: ["default", "masonry", "polaroid"], name: "Layout", description: "The layout of the gallery (default, masonry, polaroid).", table: { defaultValue: { summary: 'masonry' } } },
    cardSize: { control: { type: "range", min: 50, max: 800, step: 10 }, name: "Card Size", description: "The size of the cards in the grid.", table: { defaultValue: { summary: '200' } } },
    imageProperty: { control: "text", name: "Image Property", description: "The property that contains the image to display on the cards." },
    imageFit: { control: "radio", options: ["cover", "contain"], name: "Image Fit", description: "The fit of the image (cover or contain).", table: { defaultValue: { summary: "cover" } } },
    aspectRatio: {
      control: { type: "range", min: 0.25, max: 2.5, step: 0.05 }, name: "Image Aspect Ratio", description: "The aspect ratio of the image.", table: { defaultValue: { summary: '1.5' } },
    },
    shape: { control: "radio", options: ["square", "circle", "rounded"], name: "Shape", description: "The shape of the cards (square, circle, rounded).", table: { defaultValue: { summary: "square" } } },
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
