import type { ComponentType } from "react";
import { Html5Audio, Sequence, staticFile, useCurrentFrame } from "remotion";

import { FRAMES_PER_LOGO, FRAMES_PER_STORY } from "./constants";
import LogoSlide from "./LogoSlide";
import StorySlide from "./StorySlide";
import type { ReelStory } from "./types";

type Props = {
  renderer?: ComponentType<{ story: ReelStory }>;
  reelStories: ReelStory[];
  title: string | null | undefined;
  playSFX?: boolean;
}

type StorySequenceProps = {
  index: number;
  story: ReelStory;
  title: string | null;
  renderer: ComponentType<{ story: ReelStory }>;
  playSFX?: boolean;
}

const Renderer: ComponentType<{ story: ReelStory }> = ({ story }) => {
  return <pre>{JSON.stringify(story, null, 2)}</pre>
}

const StorySequence = ({ index, story, title, renderer, playSFX }: StorySequenceProps) => {
  const frameInStory = useCurrentFrame();

  return (
    <>
      <StorySlide
        story={story}
        frameInStory={frameInStory}
        title={title}
        renderer={renderer}
        playSFX={playSFX}
      />
      {playSFX && index === 0 && <Html5Audio src={staticFile('sfx/chime_clickbell_confirm_hi.mp3')} />}
    </>
  );
};

type LogoSequenceProps = {
  playSFX?: boolean;
}

const LogoSequence = ({ playSFX }: LogoSequenceProps) => {
  const frameInSlide = useCurrentFrame();

  return (
    <>
      <LogoSlide frameInSlide={frameInSlide} />
      {playSFX && <Html5Audio src={staticFile('sfx/chime_clickbell_trio.mp3')} />}
    </>
  );
};

const ReelComposition = ({
  title,
  playSFX,
  reelStories,
  renderer
}: Props) => {
  const totalStoryFrames = reelStories.length * FRAMES_PER_STORY;

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
      {reelStories.map((story, index) => (
        <Sequence
          key={story.id ?? `story-${story.name ?? index}`}
          from={index * FRAMES_PER_STORY}
          durationInFrames={FRAMES_PER_STORY}
        >
          <StorySequence
            index={index}
            story={story}
            title={index === 0 ? (title ?? null) : null}
            renderer={renderer ?? Renderer}
            playSFX={playSFX}
          />
        </Sequence>
      ))}
      <Sequence
        from={totalStoryFrames}
        durationInFrames={FRAMES_PER_LOGO}
      >
        <LogoSequence playSFX={playSFX} />
      </Sequence>
    </div>
  );
};

export default ReelComposition;
