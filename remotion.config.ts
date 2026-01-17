
import path from 'node:path';
import { Config, type WebpackConfiguration } from '@remotion/cli/config';
import { enableTailwind } from '@remotion/tailwind-v4';

const enablePaths = (config: WebpackConfiguration) => {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias ?? {}),
        "@": path.join(process.cwd(), 'src'),
        'obsidian': path.join(process.cwd(), 'src/__mocks__/obsidian.ts'),
      },
    },
  };
};

Config.overrideWebpackConfig((currentConfiguration) =>
  enableTailwind(
    enablePaths(currentConfiguration)
  )
);
