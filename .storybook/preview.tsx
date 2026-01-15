
import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
} from '@storybook/addon-docs/blocks';
import type { Preview } from "@storybook/react-vite";
import React from 'react';
import { Title } from './blocks/Title';

import "./styles.css";

import moment from "moment";

global.moment = moment;

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: {
        title: 'Table of Contents',
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Primary />
          <Description />
          <Controls />
          <Stories includePrimary={false} />
        </>
      ),
    },
    options: {
      storySort: {
        order: ['Views', 'Design System'],
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
