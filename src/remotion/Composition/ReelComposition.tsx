import type { ComponentType } from "react";
import { useCurrentFrame } from "remotion";

import { FRAMES_PER_STORY } from "./constants";
import LogoSlide from "./LogoSlide";
import StorySlide from "./StorySlide";
import type { ReelStory } from "./types";

type Props = {
  renderer: ComponentType<{ story: ReelStory }>;
  reelStories: ReelStory[];
  title: string | null | undefined;
};

const ReelComposition = ({ renderer, reelStories, title }: Props) => {
  const frame = useCurrentFrame();

  const totalStoryFrames = reelStories.length * FRAMES_PER_STORY;

  const isLogoSlide = frame >= totalStoryFrames;

  if (isLogoSlide) {
    const frameInLogo = frame - totalStoryFrames;
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          backgroundColor: "var(--color-paper)",
          overflow: "hidden",
        }}
      >
        <LogoSlide frameInSlide={frameInLogo} />
      </div>
    );
  }

  const currentStoryIndex = Math.floor(frame / FRAMES_PER_STORY);
  const frameInStory = frame % FRAMES_PER_STORY;

  const currentStory = reelStories[currentStoryIndex];

  if (!currentStory) return null;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "var(--color-paper)",
        overflow: "hidden",
      }}
    >
      <StorySlide
        key={`${currentStoryIndex}`}
        story={currentStory}
        frameInStory={frameInStory}
        title={currentStoryIndex === 0 ? (title ?? null) : null}
        renderer={renderer}
      />
    </div>
  );
};

export default ReelComposition;
