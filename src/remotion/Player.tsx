import { Player } from "@remotion/player";
import type { ComponentType } from "react";

import ReelComposition, {
  FRAMES_PER_LOGO,
  FRAMES_PER_STORY,
  type ReelStory,
} from "./Composition";

type Props = {
  renderer?: ComponentType<{ story: ReelStory }>;
  stories: ReelStory[];
  title: string | null | undefined;
};

const RemotionPlayer = ({ stories, title }: Props) => {
  if (stories.length === 0) return null;

  return (
    <div
      className="reel-player-wrapper border-border border-dashed border-2 rounded-md"
      style={{
        margin: "24px 0",
        overflow: "hidden",
      }}
    >
      {/* Scoped styles - only affect content inside .reel-player-wrapper */}
      <style>{`
        .reel-player-wrapper .reel-story-container > * {
          width: 100% !important;
          max-height: 100% !important;
          flex-shrink: 0;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        .reel-player-wrapper .reel-story-container > * > * {
          width: 100% !important;
          max-height: 540px !important;
        }
        .reel-player-wrapper .reel-story-container > * > *[style*="height: 100%"],
        .reel-player-wrapper .reel-story-container > * > *[style*="height:100%"],
        .reel-player-wrapper .reel-story-container > * > *[class*="h-full"] {
          height: 100% !important;
          align-self: stretch;
        }
        .reel-player-wrapper [data-testid="lovely-bases"] {
          max-height: 100% !important;
          height: 100% !important;
        }
      `}</style>
      <Player
        component={ReelComposition}
        inputProps={{ reelStories: stories, title }}
        durationInFrames={stories.length * FRAMES_PER_STORY + FRAMES_PER_LOGO}
        fps={30}
        compositionWidth={960}
        compositionHeight={540}
        autoPlay
        loop
        controls={false}
        style={{
          width: "100%",
          aspectRatio: "16/9",
        }}
      />
    </div>
  );
};

export default RemotionPlayer;
