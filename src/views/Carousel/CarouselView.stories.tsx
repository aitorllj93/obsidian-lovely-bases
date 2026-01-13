
import type { Meta, StoryObj } from '@storybook/react-vite';
// biome-ignore lint/correctness/noUnusedImports: React is needed for JSX type checking in this context
import React from 'react';

import { ARTICLES_BASE_CONFIG } from '../../__fixtures__/configs/articles';
import { ARTICLE_ENTRIES } from '../../__fixtures__/entries/articles';
import { MOVIES_BASE_CONFIG } from '../../__fixtures__/configs/movies';
import { MOVIES_ENTRIES } from '../../__fixtures__/entries/movies';
import { BOOKS_BASE_CONFIG } from '../../__fixtures__/configs/books';
import { BOOK_ENTRIES } from '../../__fixtures__/entries/books';
import { PEOPLE_BASE_CONFIG } from '../../__fixtures__/configs/people';
import { PERSON_ENTRIES } from '../../__fixtures__/entries/people';
import { APPLICATIONS_BASE_CONFIG } from '../../__fixtures__/configs/application';
import { APPLICATION_ENTRIES } from '../../__fixtures__/entries/application';
import Providers from '../../stories/decorators/Providers';
import ViewWrapper from '../../stories/decorators/ViewWrapper';
import CarouselView from './CarouselView';


const meta = {
  title: 'Views/Carousel',
  tags: ['autodocs'],
  component: CarouselView,
  decorators: [
    Providers,
    ViewWrapper,
  ]
} satisfies Meta<typeof CarouselView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Articles: Story = {
  args: {
    data: {
      data: ARTICLE_ENTRIES,
    },
    config: ARTICLES_BASE_CONFIG,
    isEmbedded: false,
  },
};

export const Movies: Story = {
  args: {
    data: {
      data: MOVIES_ENTRIES,
    },
    config: MOVIES_BASE_CONFIG,
    isEmbedded: false,
  },
};


export const Books: Story = {
  args: {
    data: {
      data: BOOK_ENTRIES,
    },
    config: BOOKS_BASE_CONFIG,
    isEmbedded: false,
  },
};

export const People: Story = {
  args: {
    data: {
      data: PERSON_ENTRIES,
    },
    config: PEOPLE_BASE_CONFIG,
    isEmbedded: false,
  },
};

export const Applications: Story = {
  args: {
    data: {
      data: APPLICATION_ENTRIES,
    },
    config: APPLICATIONS_BASE_CONFIG,
    isEmbedded: false,
  },
};
