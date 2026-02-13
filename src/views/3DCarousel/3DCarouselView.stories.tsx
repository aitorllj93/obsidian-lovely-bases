
import type { Meta, StoryObj } from '@storybook/react-vite';

import { ARTICLE_ENTRIES } from '@/__fixtures__/entries';
import { aBasesQueryResult, aReactBaseViewProps } from '@/__mocks__';
import { Providers, ViewWrapper } from '@/stories/decorators';

import { ICONS_BASE_CONFIG } from './__fixtures__/configs/icons';

import ThreeDCarouselView from './3DCarouselView';

const meta = {
  title: 'Views/3D Carousel',
  tags: ['autodocs', 'experimental'],
  component: ThreeDCarouselView,
  decorators: [ViewWrapper, Providers],
} satisfies Meta<typeof ThreeDCarouselView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Articles: Story = {
  args: aReactBaseViewProps({
    data: aBasesQueryResult({
      data: ARTICLE_ENTRIES,
    }),
    config: ICONS_BASE_CONFIG,
  }),
};
