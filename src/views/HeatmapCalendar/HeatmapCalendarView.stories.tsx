
import type { Meta, StoryObj } from '@storybook/react-vite';
// biome-ignore lint/correctness/noUnusedImports: React is needed for JSX type checking in this context
import React from 'react';

import { GREEN_HEATMAP_BASE_CONFIG, SEMAPHOR_HEATMAP_BASE_CONFIG } from '../../__fixtures__/configs/heatmap';
import { GROUPED_OCCURRENCES, OCCURRENCES } from '../../__fixtures__/entries/occurrences';
import Providers from '../../stories/decorators/Providers';
import ViewWrapper from '../../stories/decorators/ViewWrapper';
import HeatmapCalendarView from './HeatmapCalendarView';


const meta = {
  title: 'Views/Heatmap Calendar',
  tags: ['autodocs'],
  component: HeatmapCalendarView,
  decorators: [
    Providers,
    ViewWrapper,
  ]
} satisfies Meta<typeof HeatmapCalendarView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Semaphor: Story = {
  args: {
    data: {
      data: OCCURRENCES,
      groupedData: GROUPED_OCCURRENCES,
    },
    config: SEMAPHOR_HEATMAP_BASE_CONFIG,
    isEmbedded: false,
  },
};
