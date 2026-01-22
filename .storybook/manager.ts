import { addons } from 'storybook/manager-api';

import { detectBrowserLocale } from '../src/lib/i18n/detect-locale';

import theme from './addons/theme';
import MetaTitleAddon from './addons/title';

addons.register('MetaTitleAddon', MetaTitleAddon);
addons.setConfig({
  theme,
});

const language = localStorage.getItem('language');

if (!language) {
  const browserLanguage = detectBrowserLocale();

  localStorage.setItem('language', browserLanguage);
}
