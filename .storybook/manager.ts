import { addons, types } from 'storybook/manager-api';

import { detectBrowserLocale } from '../src/lib/i18n/detect-locale';

import theme from './addons/theme';
import MetaTitleAddon from './addons/title';
import { BASES_HEADER_ADDON_ID, BASES_HEADER_TOOL_ID, BasesHeaderToggle } from './addons/bases-header';

addons.register('MetaTitleAddon', MetaTitleAddon);

// Register the addon
addons.register(BASES_HEADER_ADDON_ID, () => {
  // Register the tool
  addons.add(BASES_HEADER_TOOL_ID, {
    type: types.TOOL,
    title: 'Obsidian Bases Header',
    // match: ({ tabId, viewMode }) => !tabId && viewMode === 'story',
    render: BasesHeaderToggle,
  });
});
addons.setConfig({
  theme,
});

const language = localStorage.getItem('language');

if (!language) {
  const browserLanguage = detectBrowserLocale();

  localStorage.setItem('language', browserLanguage);
}
