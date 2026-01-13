
import type { Meta, StoryObj } from '@storybook/react-vite';
// biome-ignore lint/correctness/noUnusedImports: React is needed for JSX type checking in this context
import React from 'react';

import { MOVIES_BASE_CONFIG } from '../../__fixtures__/configs/movies';
import { MOVIES_ENTRIES } from '../../__fixtures__/entries/movies';
import Providers from '../../stories/decorators/Providers';
import ViewWrapper from '../../stories/decorators/ViewWrapper';
import ProjectFoldersView from './ProjectFoldersView';


const meta = {
  title: 'Views/Project Folders',
  component: ProjectFoldersView,
  tags: ['autodocs'],
  decorators: [
    Providers,
    ViewWrapper,
  ]
} satisfies Meta<typeof ProjectFoldersView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Movies: Story = {
  args: {
    data: {
      data: MOVIES_ENTRIES,
    },
    config: MOVIES_BASE_CONFIG,
    isEmbedded: false,
  },
};
