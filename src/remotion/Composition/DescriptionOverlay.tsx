import { interpolate } from "remotion";
import { Streamdown } from "streamdown";

type Props = {
  text: string;
  progress: number;
  fadeOut: number;
  frame: number;
};

const DescriptionOverlay = ({ text, progress, fadeOut }: Props) => {
  if (!text) return null;

  const visibleChars = Math.floor(text.length * Math.min(progress, 1));
  const displayText = text.slice(0, visibleChars);

  const opacity =
    interpolate(progress, [0, 0.05], [0, 1], { extrapolateRight: "clamp" }) *
    fadeOut;

  return (
    <div className="sb-unstyled absolute bottom-0 left-0 right-0">
      <div
        className="backdrop-blur-md relative px-6 py-8 text-white z-50 bg-paper/30"
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
              }}
            >
              {text}
            </Streamdown>
          </div>
          {/* Visible animated text positioned on top */}
          <div className="absolute inset-0">
            <Streamdown
              className="font-merienda prose prose-lg prose-p:text-xl dark:prose-invert max-w-none prose-code:before:content-none prose-code:after:content-none"
              components={{
                pre: () => null,
              }}
            >
              {displayText}
            </Streamdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionOverlay;
