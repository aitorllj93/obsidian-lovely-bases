import type { Meta, StoryObj } from "@storybook/react-vite";

import { ARTICLE_ENTRIES } from "@/__fixtures__/entries";
import { aBasesViewConfig } from "@/__mocks__";
import { FACETS_CONFIG_DEFAULTS } from "@/components/Facets/config";
import { FACETS_CONFIG_ARG_TYPES } from "@/components/Facets/config/stories.argTypes";
import Providers from "@/stories/decorators/Providers";

import Card from "../index";

export const meta = {
  title: "Design System/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["internal"],
  decorators: [Providers],
  argTypes: {
    ...FACETS_CONFIG_ARG_TYPES,
    // Internals
    className: {
      table: {
        disable: true,
      },
    },
    config: {
      table: {
        disable: true,
      }
    },
    contentClassName: {
      table: {
        disable: true,
      },
    },
    entry: {
      table: {
        disable: true,
      },
    },
    isDraggable: {
      table: {
        disable: true,
      },
    },
    style: {
      table: {
        disable: true
      }
    },
  },
  args: {
    ...FACETS_CONFIG_DEFAULTS,
    config: aBasesViewConfig(),
    entry: ARTICLE_ENTRIES[0],
  },
} satisfies Meta<typeof Card>;

export default meta;

export type Story = StoryObj<typeof meta>;
