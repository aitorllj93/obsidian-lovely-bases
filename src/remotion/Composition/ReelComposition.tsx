import type { ComponentType } from "react";
import { Html5Audio, staticFile, Sequence, useCurrentFrame } from "remotion";

import { FRAMES_PER_STORY, FRAMES_PER_LOGO } from "./constants";
import LogoSlide from "./LogoSlide";
import StorySlide from "./StorySlide";
import type { ReelStory } from "./types";

import { getStories, type ViewName} from '../utils/stories';

type StatefulProps = {
  renderer?: ComponentType<{ story: ReelStory }>;
  reelStories: ReelStory[];
  title: string | null | undefined;
  playSFX?: boolean;
}

type StatelessProps = {
  viewId: ViewName;
  title: string | null | undefined;
  playSFX?: boolean;
}

const isStatefulProps = (props: Props): props is StatefulProps => {
  return 'reelStories' in props;
}

type Props = StatefulProps | StatelessProps;

const Renderer: ComponentType<{ story: ReelStory }> = ({ story }) => {
  return <pre>{JSON.stringify(story, null, 2)}</pre>
}

type StorySequenceProps = {
  index: number;
  story: ReelStory;
  title: string | null;
  renderer: ComponentType<{ story: ReelStory }>;
  playSFX?: boolean;
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

const ReelComposition = (props: Props) => {
  const { title, playSFX } = props;
  const reelStories = isStatefulProps(props) ? props.reelStories : getStories(props.viewId);

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
            renderer={isStatefulProps(props) ? props.renderer ?? Renderer : Renderer}
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
