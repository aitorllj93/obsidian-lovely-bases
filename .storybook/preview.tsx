
import {
  Controls,
  Description,
  Stories,
  Subtitle,
} from '@storybook/addon-docs/blocks';
import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview, ReactRenderer } from "@storybook/react-vite";
import React from 'react';

import '../src/__mocks__/_env';

import { ExtraNotes } from './blocks/ExtraNotes';
import { Reel } from './blocks/Reel';
import { Status } from './blocks/Status';
import { Title } from './blocks/Title';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    decorators: [
      withThemeByClassName<ReactRenderer>({
        themes: {
          'Flexoki Light': '',
          'Flexoki Dark': 'dark',
          'Obsidian Light': 'obsidian',
          'Obsidian Dark': 'obsidian dark',
        },
        defaultTheme: 'Flexoki Light',
      })
    ],
    docs: {
      toc: {
        title: 'Table of Contents',
        ignoreSelector: '.__remotion-player *, .lovely-bases *'
      },
      page: () => (
        <>
          <Title />
          <Status />
          <Subtitle />
          <Reel />
          <ExtraNotes />
          <Description />
          <Controls />
          <Stories includePrimary={false} />
        </>
      ),
    },
    options: {
      storySort: {
        order: ['Getting Started', 'Views', 'Design System'],
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
