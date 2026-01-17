import { useOf } from '@storybook/addon-docs/blocks';
import React, { useMemo } from 'react';
import type { CSFFile, PreparedMeta, Renderer } from 'storybook/internal/types';

import Player from '../../src/remotion/Player';

const useStoriesFromDocs = (resolved?: {
  type: "meta";
  csfFile: CSFFile<Renderer>;
  preparedMeta: PreparedMeta;
}) => {
  return useMemo(
    () => {
      const stories = resolved?.csfFile?.stories;
      if (!stories) return [];

      // Get the named exports order from the CSF module to preserve export order
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const exportKeys = resolved.csfFile.moduleExports.__namedExportsOrder;

      return Object.values(stories)
        .filter((s) => s?.parameters?.reel?.include !== false)
        .sort((storyA, storyB) => {
          // First, sort by explicit reel.order if provided
          const orderA = storyA?.parameters?.reel?.order;
          const orderB = storyB?.parameters?.reel?.order;

          if (orderA !== undefined && orderB !== undefined) {
            return orderA - orderB;
          }
          if (orderA !== undefined) return -1;
          if (orderB !== undefined) return 1;

          // Fall back to export order from the module
          const exportIndexA = exportKeys.indexOf(storyA.name.split(' ').join('')) ?? Infinity;
          const exportIndexB = exportKeys.indexOf(storyB.name.split(' ').join('')) ?? Infinity;

          return exportIndexA - exportIndexB;
        });
    },
    [resolved]
  );
}

export const Reel = () => {
  const resolved = useOf('meta');

  const title = resolved.type === 'meta' ? resolved.preparedMeta.title.split('/').pop() : null;
  const reelStories = useStoriesFromDocs(resolved.type !== 'meta' ? undefined : resolved);

  if (reelStories.length === 0) return null;

  return (
    <Player stories={reelStories} title={title} />
  );
};
