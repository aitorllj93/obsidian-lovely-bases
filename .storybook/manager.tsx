import React from 'react';
import { addons, types } from 'storybook/manager-api';

import { detectBrowserLocale } from '../src/lib/i18n/detect-locale';
import { LOVELY_VIEW_NAMES, LOVELY_VIEW_ICONS, LovelyViewId } from '../src/views/constants';

import { BASES_HEADER_ADDON_ID, BASES_HEADER_TOOL_ID, BasesHeaderToggle } from './addons/bases-header';
import theme from './addons/theme';
import MetaTitleAddon from './addons/title';
import LucideIcon from './blocks/LucideIcon';


const viewsIdsByName: Record<string, LovelyViewId> = Object.entries(LOVELY_VIEW_NAMES).reduce(
  (acc, [id, name]) => Object.assign(acc, {
    [name]: id
  }),
  {}
)

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
  sidebar: {
    renderLabel: (item) => {
      const id = viewsIdsByName[item.name];
      const icon = id ? LOVELY_VIEW_ICONS[id] : undefined;
      return (
        <span
          data-depth={item.depth}
          style={{
            alignItems: 'center',
            display: 'flex',
            gap: '6px',
            marginTop: '2px',
            maxHeight: '14px',
          }}>
          {icon && <LucideIcon name={icon} size={14} />}
          {item.name}
        </span>
      );
    },
  },
});

const language = localStorage.getItem('language');

if (!language) {
  const browserLanguage = detectBrowserLocale();

  localStorage.setItem('language', browserLanguage);
}
