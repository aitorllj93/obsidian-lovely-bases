import { interpolate, spring, useVideoConfig } from "remotion";

import {
  FRAMES_PER_LOGO,
  LOGO_FADE_OUT_START,
  STORY_FADE_IN
} from "./constants";
import Logo from "./logo.png";

type Props = {
  frameInSlide: number;
};

const LogoSlide = ({ frameInSlide }: Props) => {
  const { fps } = useVideoConfig();

  const slideOpacity = interpolate(
    frameInSlide,
    [0, STORY_FADE_IN, LOGO_FADE_OUT_START, FRAMES_PER_LOGO],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" },
  );

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

  const floatOffset = Math.sin(frameInSlide * 0.08) * 4;
  const floatRotation = Math.sin(frameInSlide * 0.05) * 1.5;

  const finalY = logoY + floatOffset * logoEntrance;
  const finalRotation = logoRotation + floatRotation * logoEntrance;

  const shadowIntensity = interpolate(
    Math.sin(frameInSlide * 0.1),
    [-1, 1],
    [0.15, 0.25],
  );

  return (
    <div
      style={{
        opacity: slideOpacity,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--background, var(--color-paper))",
      }}
    >
      <div
        style={{
          transform: `scale(${logoScale}) translateY(${finalY}px) rotate(${finalRotation}deg)`,
          transformOrigin: "center center",
          filter: `drop-shadow(0 8px 24px rgba(0, 0, 0, ${shadowIntensity}))`,
        }}
      >
        <img
          src={Logo}
          alt="Lovely Bases"
          style={{
            width: "400px",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
};

export default LogoSlide;
