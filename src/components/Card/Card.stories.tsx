import type { Meta, StoryObj } from "@storybook/react-vite";
// biome-ignore lint/correctness/noUnusedImports: React is needed for JSX type checking in this context
import React from "react";

import { APPLICATIONS_BASE_CONFIG, APPLICATIONS_CARD_CONFIG } from "../../__fixtures__/configs/application";
import {
  ARTICLES_BASE_CONFIG,
  ARTICLES_CARD_CONFIG,
} from "../../__fixtures__/configs/articles";
import { BOOKS_BASE_CONFIG, BOOKS_CARD_CONFIG } from "../../__fixtures__/configs/books";
import {
  MOVIES_BASE_CONFIG,
  MOVIES_CARD_CONFIG,
} from "../../__fixtures__/configs/movies";
import { PEOPLE_BASE_CONFIG, PEOPLE_CARD_CONFIG } from "../../__fixtures__/configs/people";
import { APPLICATION_ENTRIES } from "../../__fixtures__/entries/application";
import { ARTICLE_ENTRIES } from "../../__fixtures__/entries/articles";
import { BOOK_ENTRIES } from "../../__fixtures__/entries/books";
import { MOVIES_ENTRIES } from "../../__fixtures__/entries/movies";
import { PERSON_ENTRIES } from "../../__fixtures__/entries/people";
import Providers from "../../stories/decorators/Providers";
import Card from "./index";

const meta = {
  title: "Design System/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    config: {
      table: {
        disable: true,
      },
    },
    entry: {
      table: {
        disable: true,
      }
    },
    layout: { control: 'radio', options: ['horizontal', 'vertical'] },
    shape: { control: 'radio', options: ['square', 'circle', 'rounded'] },
    hoverProperty: { control: 'text' },
    hoverStyle: { control: 'radio', options: ['none', 'overlay', 'tooltip'] },
    properties: { control: 'object' },
    imageProperty: { control: 'text' },
    imageAspectRatio: { control: { type: 'range', min: 0.25, max:  2.5, step: 0.05 } },
    cardSize: { control: { type: 'range', min: 50, max: 800, step: 10 } },
    imageFit: { control: 'radio', options: ['cover', 'contain'] },
    reverseContent: { control: 'boolean' },
    showTitle: { control: 'boolean' },
    showPropertyTitles: { control: 'boolean' },
  },
  decorators: [
    Providers,
    (Story) => (
      <div
        style={{
          maxWidth: `${MOVIES_CARD_CONFIG.cardSize}px`,
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Article: Story = {
  args: {
    config: ARTICLES_BASE_CONFIG,
    entry: ARTICLE_ENTRIES[0],
    ...ARTICLES_CARD_CONFIG,
  },
};

export const Movie: Story = {
  args: {
    config: MOVIES_BASE_CONFIG,
    entry: MOVIES_ENTRIES[0],
    ...MOVIES_CARD_CONFIG,
  },
};

export const Book: Story = {
  args: {
    config: BOOKS_BASE_CONFIG,
    entry: BOOK_ENTRIES[0],
    ...BOOKS_CARD_CONFIG,
  },
};

export const Person: Story = {
  args: {
    config: PEOPLE_BASE_CONFIG,
    entry: PERSON_ENTRIES[0],
    ...PEOPLE_CARD_CONFIG,
  },
};

export const Application: Story = {
  args: {
    config: APPLICATIONS_BASE_CONFIG,
    entry: APPLICATION_ENTRIES[0],
    ...APPLICATIONS_CARD_CONFIG,
  },
};
