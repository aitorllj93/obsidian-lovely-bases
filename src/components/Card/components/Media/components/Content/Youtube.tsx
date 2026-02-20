import { memo, useEffect, useMemo, useRef } from "react";

import { getYouTubeId } from "@/lib/external-media";
import { cn } from "@/lib/utils";
import { getYoutubeApi } from "@/lib/youtube";
import type { ContentProps } from "./types";

const PureYoutube = ({
  aspectRatio,
  autoPlay,
  className,
  fit,
  style,
  title,
  url,
}: ContentProps) => {
  const id = useMemo(() => getYouTubeId(url), [url]);

  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YT.Player>(null);
  const readyRef = useRef(false);
  const destroyedRef = useRef(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: depends only on id
  useEffect(() => {
    destroyedRef.current = false;
    readyRef.current = false;

    if (!id || !hostRef.current) return;

    let cancelled = false;

    (async () => {
      const YT = await getYoutubeApi();
      if (cancelled || destroyedRef.current || !hostRef.current) return;

      try {
        playerRef.current?.destroy();
      } catch {}

      playerRef.current = new YT.Player(hostRef.current, {
        videoId: id,
        events: {
          onReady: () => {
            if (destroyedRef.current) return;
            readyRef.current = true;

            if (autoPlay) {
              playerRef.current?.playVideo();
            } else {
              playerRef.current?.pauseVideo();
            }
          },
        },
        playerVars: {
          autoplay: autoPlay ? 1 : 0,
          mute: 1,
          controls: 0,
          playsinline: 1,
          modestbranding: 1,
          rel: 0,
          loop: 1,
          playlist: id, // force loop
        },
      });
    })();

    return () => {
      cancelled = true;
      destroyedRef.current = true;
      readyRef.current = false;

      try {
        playerRef.current?.destroy?.();
      } catch {
        // ignore
      } finally {
        playerRef.current = null;
      }
    };
  }, [id]);

  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;

    if (!readyRef.current) return;

    const iframe = p.getIframe();
    if (!iframe) return;

    try {
      if (autoPlay) {
        // force remove hidden class
        iframe.classList.remove('hidden');
        p.playVideo();
      } else {
        p.pauseVideo();
      }
    } catch {}
  }, [autoPlay]);

  if (!id) return null;

  return (
    <div
      draggable={false}
      className={cn(
        "pointer-events-none h-full w-full",
        fit === "cover" ? "object-cover" : "object-contain",
        className,
      )}
      style={{
        width: "100%",
        height: "100%",
        aspectRatio,
        ...style,
      }}
      title={title}
    >
      <div
        ref={hostRef}
        draggable={false}
        className={cn(
          "pointer-events-none h-full w-full",
        )}
        style={{
          width: "100%",
          height: "100%",
        }}
        title={title} />
    </div>
  );
};

const Youtube = memo(PureYoutube);
Youtube.displayName = "Youtube";

export default Youtube;
