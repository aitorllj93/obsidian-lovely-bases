import React, { useMemo } from 'react';
import { useOf, Story } from '@storybook/addon-docs/blocks';
import { Player } from '@remotion/player';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { Streamdown } from 'streamdown';

import Logo from '../../src/stories/assets/logo.png';

// ============================================================================
// Constants - Animation Timing (in frames at 30fps)
// ============================================================================

const FRAMES_PER_STORY = 240;    // 8 seconds per story
const STORY_FADE_IN = 15;        // 0.5s fade in
const DESCRIPTION_DELAY = 30;    // 1s delay before description appears
const DESCRIPTION_DURATION = 60; // 2s to write the description
const FADE_OUT_START = 220;      // Start fade out at 7s

// Logo slide timing
const FRAMES_PER_LOGO = 180;     // 6 seconds for logo slide
const LOGO_FADE_OUT_START = 150; // Start fade out at 5s

// ============================================================================
// Types
// ============================================================================

interface ReelStory {
  id?: string;
  name?: string;
  moduleExport?: unknown;
  parameters?: {
    reel?: {
      include?: boolean;
      order?: number;
    };
    docs?: {
      description?: {
        story?: string;
      };
    };
  };
}

// ============================================================================
// DescriptionOverlay - Typewriter effect for story description
// ============================================================================
const DescriptionOverlay = ({
  text,
  progress,
  fadeOut,
}: {
  text: string;
  progress: number;
  fadeOut: number;
  frame: number;
}) => {
  // Early return but hooks are called in parent
  if (!text) return null;

  // Typewriter effect: show characters progressively
  const visibleChars = Math.floor(text.length * Math.min(progress, 1));
  const displayText = text.slice(0, visibleChars);


  // Fade in at start, fade out at end
  const opacity = interpolate(progress, [0, 0.05], [0, 1], { extrapolateRight: 'clamp' }) * fadeOut;
  return (
    <div className="sb-unstyled absolute bottom-0 left-0 right-0">
    <div className="backdrop-blur-md relative px-6 py-8 text-white z-10 bg-paper/30"
      style={{
        opacity,
      }}
    >
      <div className="relative">
        {/* Invisible full text to reserve height and prevent layout shift */}
        <div className="invisible" aria-hidden="true">
          <Streamdown
            className="font-merienda prose prose-lg prose-p:text-xl dark:prose-invert max-w-none prose-code:before:content-none prose-code:after:content-none"
            components={{
              pre: () => null,
            }}>
            {text}
          </Streamdown>
        </div>
        {/* Visible animated text positioned on top */}
        <div className="absolute inset-0">
          <Streamdown
            className="font-merienda prose prose-lg prose-p:text-xl dark:prose-invert max-w-none prose-code:before:content-none prose-code:after:content-none"
            components={{
              pre: () => null,
            }}>
            {displayText}
          </Streamdown>
        </div>
      </div>
    </div>
    </div>
  );
};

// ============================================================================
// StorySlide - Individual story with animations
// ============================================================================

const StorySlide = ({
  story,
  frameInStory,
  title,
}: {
  story: ReelStory;
  frameInStory: number;
  title: string | null;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Get description from story parameters
  const description = title || story.parameters?.docs?.description?.story;

  // Story opacity: fade in at start, fade out at end
  const storyOpacity = interpolate(
    frameInStory,
    [0, STORY_FADE_IN, FADE_OUT_START, FRAMES_PER_STORY],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp' }
  );

  // Description progress: starts after delay, completes over duration
  const descriptionProgress = interpolate(
    frameInStory,
    [DESCRIPTION_DELAY, DESCRIPTION_DELAY + DESCRIPTION_DURATION],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Fade out multiplier for description
  const descriptionFadeOut = interpolate(
    frameInStory,
    [FADE_OUT_START, FRAMES_PER_STORY],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Subtle scale animation using spring
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

  // Subtle vertical movement on exit
  const translateY = interpolate(
    frameInStory,
    [FADE_OUT_START, FRAMES_PER_STORY],
    [0, -10],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div style={{
      opacity: storyOpacity,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      transform: `scale(${scale}) translateY(${translateY}px)`,
      transformOrigin: 'center center',
    }}>
      {/* Description overlay at top */}
      {description && <DescriptionOverlay
        text={description}
        progress={descriptionProgress}
        fadeOut={descriptionFadeOut}
        frame={frame}
      />}

      {/* Story content - centered vertically when not full height */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className="reel-story-container"
      >
        <Story of={story.moduleExport ?? story} />
      </div>
    </div>
  );
};

// ============================================================================
// LogoSlide - Logo with entrance animation at the end of the reel
// ============================================================================

const LogoSlide = ({ frameInSlide }: { frameInSlide: number }) => {
  const { fps } = useVideoConfig();

  // Fade in/out for the whole slide
  const slideOpacity = interpolate(
    frameInSlide,
    [0, STORY_FADE_IN, LOGO_FADE_OUT_START, FRAMES_PER_LOGO],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp' }
  );

  // Logo entrance: starts from below and scales up
  const logoEntrance = spring({
    frame: frameInSlide,
    fps,
    config: {
      damping: 14,
      stiffness: 60,
      mass: 1.2,
    },
  });

  const logoScale = interpolate(logoEntrance, [0, 1], [0.6, 1]);
  const logoY = interpolate(logoEntrance, [0, 1], [40, 0]);
  const logoRotation = interpolate(logoEntrance, [0, 1], [8, 0]);

  // Subtle floating animation after entrance
  const floatOffset = Math.sin(frameInSlide * 0.08) * 4;
  const floatRotation = Math.sin(frameInSlide * 0.05) * 1.5;

  // Combine entrance and float (float only kicks in after entrance)
  const isEntranceComplete = frameInSlide > 45;
  const finalY = isEntranceComplete ? floatOffset : logoY;
  const finalRotation = isEntranceComplete ? floatRotation : logoRotation;

  // Soft shadow that pulses subtly
  const shadowIntensity = interpolate(
    Math.sin(frameInSlide * 0.1),
    [-1, 1],
    [0.15, 0.25]
  );

  return (
    <div
      style={{
        opacity: slideOpacity,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--background, var(--color-paper))',
      }}
    >
      <div
        style={{
          transform: `scale(${logoScale}) translateY(${finalY}px) rotate(${finalRotation}deg)`,
          transformOrigin: 'center center',
          filter: `drop-shadow(0 8px 24px rgba(0, 0, 0, ${shadowIntensity}))`,
        }}
      >
        <img
          src={Logo}
          alt="Lovely Bases"
          style={{
            width: '400px',
            height: 'auto',
            objectFit: 'contain',
          }}
        />
      </div>
    </div>
  );
};

// ============================================================================
// ReelComposition - Main composition that shows one story at a time
// ============================================================================

const ReelComposition = ({ reelStories, title }: { reelStories: ReelStory[], title: string | null | undefined }) => {
  const frame = useCurrentFrame();

  // Total frames for all stories
  const totalStoryFrames = reelStories.length * FRAMES_PER_STORY;

  // Check if we're in the logo slide (after all stories)
  const isLogoSlide = frame >= totalStoryFrames;

  if (isLogoSlide) {
    const frameInLogo = frame - totalStoryFrames;
    return (
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--color-paper)',
        overflow: 'hidden',
      }}>
        <LogoSlide frameInSlide={frameInLogo} />
      </div>
    );
  }

  // Calculate which story to show based on current frame
  const currentStoryIndex = Math.floor(frame / FRAMES_PER_STORY);
  const frameInStory = frame % FRAMES_PER_STORY;

  const currentStory = reelStories[currentStoryIndex];

  if (!currentStory) return null;

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundColor: 'var(--color-paper)',
      overflow: 'hidden',
    }}>
      <StorySlide
        key={`${currentStoryIndex}`}
        story={currentStory}
        frameInStory={frameInStory}
        title={currentStoryIndex === 0 ? title ?? null : null}
      />
    </div>
  );
};

// ============================================================================
// Reel - Main exported component (Storybook Doc Block)
// ============================================================================

/**
 * A block that displays stories in a cinematic reel format.
 * - Shows one story at a time with fade transitions
 * - Displays the story description with a typewriter effect
 * - Automatically transitions to the next story after a few seconds
 * - Loops continuously through all stories
 */
export const Reel = () => {
  const resolved = useOf('meta');

  const title = resolved.type === 'meta' ? resolved.preparedMeta.title.split('/').pop() : null;

  // Filter and sort stories for the reel
  const reelStories = useMemo(
    () => {
      if (resolved.type !== 'meta') return [];

      const stories = resolved.csfFile?.stories;
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

  if (reelStories.length === 0) return null;

  return (
    <div
      className="reel-player-wrapper"
      style={{
        margin: '24px 0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)',
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
          max-height: 100% !important;
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
        inputProps={{ reelStories, title }}
        durationInFrames={reelStories.length * FRAMES_PER_STORY + FRAMES_PER_LOGO}
        fps={30}
        compositionWidth={960}
        compositionHeight={540}
        autoPlay
        loop
        controls={false}
        style={{
          width: '100%',
          aspectRatio: '16/9',
        }}
      />
    </div>
  );
};
