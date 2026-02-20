import { composeStory } from "@storybook/react-vite";

import type { ReelStory } from "../Composition";
import { STORIES, STORY_ORDERS } from "./data";

export type ViewName = keyof typeof STORY_ORDERS;

// Get export order from generated file or fallback
const getExportOrder = (
  storiesModule: typeof STORIES[ViewName],
  viewName: ViewName
): string[] => {
  const generatedOrder = viewName in STORY_ORDERS ? STORY_ORDERS[viewName] : undefined;

  if (generatedOrder && generatedOrder.length > 0) {
    return [...generatedOrder];
  }

  // Fallback: use Object.keys (may not preserve order if bundler reorders)
  if (typeof process !== "undefined" && process.env.NODE_ENV !== "production") {
    console.warn(
      `⚠️ No generated story order found for view "${viewName}". Run: pnpm run generate-story-order`,
    );
  }

  return Object.keys(storiesModule).filter(
    (key) => key !== "default" && key !== "meta" && key !== "__esModule",
  );
};

const getOrderedStories = (
  storiesModule: typeof STORIES[ViewName],
  viewName: ViewName,
) => {
  const exportOrder = getExportOrder(storiesModule, viewName);
  const entries = Object.entries(storiesModule).filter(
    ([key]) => key !== "default" && key !== "meta",
  );

  return entries
    .map(([key, story]) => {
      const name = key.replace(/([A-Z])/g, " $1").trim();
      // biome-ignore lint/suspicious/noExplicitAny: Storybook story objects have dynamic properties
      (story as any).name = name;
      const component = composeStory(story, storiesModule.default);

      return {
        key,
        component,
        id: component.id,
        name,
        parameters: story.parameters as ReelStory["parameters"],
      };
    })
    .sort((storyA, storyB) => {
      // First, sort by explicit reel.order if provided
      const orderA = storyA.parameters?.reel?.order;
      const orderB = storyB.parameters?.reel?.order;

      if (orderA !== undefined && orderB !== undefined) {
        return orderA - orderB;
      }
      if (orderA !== undefined) return -1;
      if (orderB !== undefined) return 1;

      // Fall back to export order from source file
      const indexA = exportOrder.indexOf(storyA.key);
      const indexB = exportOrder.indexOf(storyB.key);

      // If a story is not in the order array, put it at the end
      if (indexA === -1 && indexB === -1) return 0;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;

      return indexA - indexB;
    });
};

export const getStoriesMeta = (viewName: ViewName): ReelStory[] => {
  return getOrderedStories(STORIES[viewName], viewName).map(({ id, name, parameters }) => ({
    id,
    name,
    parameters,
  }));
};

export const getStories = (viewName: ViewName): ReelStory[] => {
  return getOrderedStories(STORIES[viewName], viewName).map(({ component, id, name, parameters }) => ({
    component,
    id,
    name,
    parameters,
  }));
};
