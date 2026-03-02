import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isDev = process.env.NODE_ENV === 'development';

const config: StorybookConfig = {
  staticDirs: ['./static'],
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  tags: !isDev ? {
    experimental: { defaultFilterSelection: 'exclude' },
    internal: { defaultFilterSelection: 'exclude' },
  } : undefined,
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-themes",
  ],
  "framework": "@storybook/react-vite",
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
          'obsidian': path.resolve(__dirname, '../src/__mocks__/obsidian.ts'),
        },
      },
      build: {
        chunkSizeWarningLimit: 1000000, // Iframe Chunk size is above 5MB
        rollupOptions: {
          onwarn(warning, warn) {
            if (
              warning.code === "MODULE_LEVEL_DIRECTIVE" &&
              /use client/.test(warning.message)
            ) {
              return;
            }
            warn(warning);
          },
        },
      }
    });
  },
};
export default config;
