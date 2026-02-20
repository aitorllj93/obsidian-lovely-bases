import { memo, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { ContentProps } from "./types";

const PureVideo = ({
  aspectRatio,
  autoPlay,
  className,
  fit,
  style,
  title,
  url,
}: ContentProps) => {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!url) {
      return;
    }

    const el = ref.current;
    if (!el) return;

    if (autoPlay) {
      el.muted = true;
      el.playsInline = true;

      const tryPlay = async () => {
        try {
          await el.play();
        } catch {}
      };

      if (el.readyState >= 2) {
        void tryPlay();
      } else {
        const onCanPlay = () => void tryPlay();
        el.addEventListener("canplay", onCanPlay, { once: true });
        return () => el.removeEventListener("canplay", onCanPlay);
      }
    } else {
      el.pause();
      // el.currentTime = 0;
    }
  }, [autoPlay, url]);

  return (
    <video
      ref={ref}
      src={url}
      autoPlay={autoPlay}
      loop
      muted
      playsInline
      preload="auto"
      title={title}
      draggable={false}
      className={cn(
        "pointer-events-none h-full w-full",
        fit === "cover" ? "object-cover" : "object-contain",
        className,
      )}
      style={{ aspectRatio, ...style }}
    />
  );
};

const Video = memo(PureVideo);

Video.displayName = "Video";

export default Video;
