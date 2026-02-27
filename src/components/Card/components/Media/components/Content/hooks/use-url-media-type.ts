import { useEffect, useState } from "react";

import type { MediaType } from "@/lib/media";

export type UrlMediaType = Exclude<MediaType, "color" | "empty" | "unsupported">;

const mediaTypeCache = new Map<string, UrlMediaType>();

function stripUrl(url: string) {
  return url.split("#")[0].split("?")[0];
}

function getExt(url: string): string | null {
  const clean = stripUrl(url).toLowerCase();
  const i = clean.lastIndexOf(".");
  if (i === -1) return null;
  const ext = clean.slice(i + 1);
  return ext && ext !== clean ? ext : null;
}

function guessByExtension(url: string): UrlMediaType | null {
  const ext = getExt(url);
  if (!ext) return null;

  const audioExt = new Set(["mp3", "aac", "m4a", "ogg", "opus", "wav", "flac"]);
  const videoExt = new Set(["mp4", "webm", "mov", "mkv", "m4v", "ogv"]);
  const imageExt = new Set(["jpg", "jpeg", "png", "webp", "gif", "avif", "bmp", "svg"]);

  if (imageExt.has(ext)) return "image";
  if (audioExt.has(ext)) return "audio";
  if (videoExt.has(ext)) return "video";
  return null;
}

function audioMimeFromExt(ext: string): string | null {
  switch (ext) {
    case "mp3":
      return "audio/mpeg";
    case "aac":
      return "audio/aac";
    case "m4a":
      return "audio/mp4";
    case "ogg":
      return "audio/ogg";
    case "opus":
      return "audio/opus";
    case "wav":
      return "audio/wav";
    case "flac":
      return "audio/flac";
    default:
      return null;
  }
}

function videoMimeFromExt(ext: string): string | null {
  switch (ext) {
    case "mp4":
    case "m4v":
      return "video/mp4";
    case "webm":
      return "video/webm";
    case "mov":
      return "video/quicktime";
    case "ogv":
      return "video/ogg";
    // mkv: no hay mime estándar fiable para canPlayType
    default:
      return null;
  }
}

function canPlayFromExt(url: string): UrlMediaType | null {
  const ext = getExt(url);
  if (!ext) return null;

  const aMime = audioMimeFromExt(ext);
  if (aMime) {
    const a = document.createElement("audio");
    const ok = a.canPlayType(aMime);
    if (ok) return "audio";
  }

  const vMime = videoMimeFromExt(ext);
  if (vMime) {
    const v = document.createElement("video");
    const ok = v.canPlayType(vMime);
    if (ok) return "video";
  }

  return null;
}

export function useUrlMediaType(url: string): UrlMediaType {
  const [type, setType] = useState<UrlMediaType>(() => {
    return mediaTypeCache.get(url) ?? "url";
  });

  useEffect(() => {
    if (!url) return;

    const cached = mediaTypeCache.get(url);
    if (cached) {
      setType(cached);
      return;
    }

    // 1) Heurística por extensión (barato y bastante fiable)
    const byExt = guessByExtension(url);
    if (byExt) {
      mediaTypeCache.set(url, byExt);
      setType(byExt);
      return;
    }

    // 2) canPlayType si hay mime deducible (sigue siendo barato)
    const byCanPlay = canPlayFromExt(url);
    if (byCanPlay) {
      mediaTypeCache.set(url, byCanPlay);
      setType(byCanPlay);
      return;
    }

    // 3) Fallback: intentos reales de carga, pero distinguiendo vídeo de audio
    let cancelled = false;

    const resolve = (value: UrlMediaType) => {
      if (cancelled) return;
      mediaTypeCache.set(url, value);
      setType(value);
    };

    const img = new Image();
    img.decoding = "async";
    img.loading = "eager";
    img.src = url;

    let video: HTMLVideoElement | null = null;
    let audio: HTMLAudioElement | null = null;

    img.onload = () => resolve("image");

    img.onerror = () => {
      video = document.createElement("video");
      video.preload = "metadata";
      video.src = url;

      // IMPORTANTE: metadata + videoWidth/Height para evitar clasificar audio como video
      video.onloadedmetadata = () => {
        if (!video) return;

        if (video.videoWidth > 0 && video.videoHeight > 0) {
          resolve("video");
          return;
        }

        // audio-only (o vídeo sin pista visual): prueba audio
        audio = document.createElement("audio");
        audio.preload = "metadata";
        audio.src = url;

        audio.onloadedmetadata = () => resolve("audio");
        audio.onerror = () => resolve("url");
      };

      video.onerror = () => {
        audio = document.createElement("audio");
        audio.preload = "metadata";
        audio.src = url;

        audio.onloadedmetadata = () => resolve("audio");
        audio.onerror = () => resolve("url");
      };
    };

    return () => {
      cancelled = true;

      img.onload = null;
      img.onerror = null;
      // Evita descargas colgando
      if (video) {
        video.onloadedmetadata = null;
        video.onerror = null;
        video.src = "";
        video.load();
        video = null;
      }
      if (audio) {
        audio.onloadedmetadata = null;
        audio.onerror = null;
        audio.src = "";
        audio.load();
        audio = null;
      }
    };
  }, [url]);

  return type;
}
