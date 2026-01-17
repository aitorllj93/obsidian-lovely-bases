
import type { ComponentType } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

import {
  DESCRIPTION_DELAY,
  DESCRIPTION_DURATION,
  FADE_OUT_START,
  FRAMES_PER_STORY,
  STORY_FADE_IN
} from "./constants";
import DescriptionOverlay from "./DescriptionOverlay";
import type { ReelStory } from "./types";

type Props = {
  story: ReelStory;
  frameInStory: number;
  title: string | null;
  renderer: ComponentType<{ story: ReelStory }>
};

const StorySlide = ({ story, frameInStory, title, renderer: Renderer }: Props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const description = title || story.parameters?.docs?.description?.story;

  const storyOpacity = interpolate(
    frameInStory,
    [0, STORY_FADE_IN, FADE_OUT_START, FRAMES_PER_STORY],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" },
  );

  const descriptionProgress = interpolate(
    frameInStory,
    [DESCRIPTION_DELAY, DESCRIPTION_DELAY + DESCRIPTION_DURATION],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const descriptionFadeOut = interpolate(
    frameInStory,
    [FADE_OUT_START, FRAMES_PER_STORY],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const scaleSpring = spring({
    frame: frameInStory,
    fps,
    config: {
      damping: 200,
      stiffness: 100,
      mass: 0.5,
    },
  });

  const scale = interpolate(scaleSpring, [0, 1], [1.02, 1]);

  const translateY = interpolate(
    frameInStory,
    [FADE_OUT_START, FRAMES_PER_STORY],
    [0, -10],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        opacity: storyOpacity,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        transform: `scale(${scale}) translateY(${translateY}px)`,
        transformOrigin: "center center",
      }}
    >
      {description && (
        <DescriptionOverlay
          text={description}
          progress={descriptionProgress}
          fadeOut={descriptionFadeOut}
          frame={frame}
        />
      )}

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="reel-story-container"
      >
        <Renderer story={story} />
      </div>
    </div>
  );
};

export default StorySlide;
