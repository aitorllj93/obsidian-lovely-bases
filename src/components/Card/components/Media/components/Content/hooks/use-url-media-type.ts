import { useEffect, useState } from "react";

import type { MediaType } from "@/lib/media";

export type UrlMediaType = Exclude<MediaType, 'color' | 'empty' | 'unsupported'>;

const mediaTypeCache = new Map<string, UrlMediaType>();

export function useUrlMediaType(url: string): UrlMediaType {
  const [type, setType] = useState<UrlMediaType>(() => {
    return mediaTypeCache.get(url) ?? "url";
  });

  useEffect(() => {
    if (!url) return;

    if (mediaTypeCache.has(url)) {
      setType(mediaTypeCache.get(url) as UrlMediaType);
      return;
    }

    let cancelled = false;

    const resolve = (value: UrlMediaType) => {
      if (cancelled) return;
      mediaTypeCache.set(url, value);
      setType(value);
    };

    const img = new Image();
    img.src = url;

    img.onload = () => resolve("image");

    img.onerror = () => {
      const video = document.createElement("video");
      video.src = url;

      video.onloadeddata = () => resolve("video");

      video.onerror = () => {
        const audio = document.createElement("audio");
        audio.src = url;

        audio.onloadeddata = () => resolve("audio");
        audio.onerror = () => resolve("url");
      };
    };

    return () => {
      cancelled = true;
    };
  }, [url]);

  return type;
}
