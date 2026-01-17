import type { ComponentType } from "react";
import { useCurrentFrame } from "remotion";

import { FRAMES_PER_STORY } from "./constants";
import LogoSlide from "./LogoSlide";
import StorySlide from "./StorySlide";
import type { ReelStory } from "./types";

import { getStories, type ViewName} from '../utils/stories';

type StatefulProps = {
  renderer?: ComponentType<{ story: ReelStory }>;
  reelStories: ReelStory[];
  title: string | null | undefined;
}

type StatelessProps = {
  viewId: ViewName;
  title: string | null | undefined;
}

const isStatefulProps = (props: Props): props is StatefulProps => {
  return 'reelStories' in props;
}

type Props = StatefulProps | StatelessProps;

const Renderer: ComponentType<{ story: ReelStory }> = ({ story }) => {
  return <pre>{JSON.stringify(story, null, 2)}</pre>
}

const ReelComposition = (props: Props) => {
  const title = props.title;
  const reelStories = isStatefulProps(props) ? props.reelStories : getStories(props.viewId);
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
        renderer={isStatefulProps(props) ? props.renderer ?? Renderer : Renderer}
      />
    </div>
  );
};

export default ReelComposition;
