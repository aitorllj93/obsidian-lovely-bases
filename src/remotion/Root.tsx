
import { Composition } from "remotion";

import "../__mocks__/_env";

import ReelComposition, {
  FRAMES_PER_LOGO,
  FRAMES_PER_STORY,
} from "./Composition";
import { STORY_ORDERS } from './utils/data';
import { getStoriesMeta, type ViewName } from "./utils/stories";

const DEFAULT_PROPS = {
  fps: 30,
  width: 960,
  height: 540,
}

// add spaces to PascalCase
const getTitle = (viewId: ViewName): string => {
  return viewId.replace(/([A-Z])/g, ' $1').trim();
}

const COMPOSITIONS: { title: string; viewId: ViewName }[] = (Object.keys(STORY_ORDERS) as ViewName[]).map((viewId) => ({
    title: getTitle(viewId),
    viewId,
  }));

export const RemotionRoot = () => {
  return COMPOSITIONS
  .map(({ viewId, title }) => {
    const stories = getStoriesMeta(viewId);

    return (
      <Composition
        key={viewId}
        id={viewId}
        component={ReelComposition}
        durationInFrames={stories.length * FRAMES_PER_STORY + FRAMES_PER_LOGO}
        defaultProps={{
          viewId,
          title,
          playSFX: true,
        }}
        {...DEFAULT_PROPS}
      />
    )
  });
};
