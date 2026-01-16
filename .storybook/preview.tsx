
import {
  Controls,
  Description,
  Stories,
  Subtitle,
} from '@storybook/addon-docs/blocks';
import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview, ReactRenderer } from "@storybook/react-vite";
import React from 'react';

import { ExtraNotes } from './blocks/ExtraNotes';
import { Reel } from './blocks/Reel';
import { Status } from './blocks/Status';
import { Title } from './blocks/Title';

import "./styles.css";

import moment from "moment";
import "moment/dist/locale/es";
import "moment/dist/locale/de";
import "moment/dist/locale/fr";
import "moment/dist/locale/it";
import "moment/dist/locale/pt";
import "moment/dist/locale/ru";
import "moment/dist/locale/zh-cn";
import "moment/dist/locale/ja";
import "moment/dist/locale/ko";

import { detectLocale } from "../src/lib/i18n";

// Configure moment locale based on browser language
const locale = detectLocale();
const momentLocaleMap: Record<string, string> = {
  en: "en",
  es: "es",
  de: "de",
  fr: "fr",
  it: "it",
  pt: "pt",
  ru: "ru",
  zh: "zh-cn",
  ja: "ja",
  ko: "ko",
};
moment.locale(momentLocaleMap[locale] ?? "en");

global.moment = moment;

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
        ignoreSelector: '.__remotion-player *'
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
