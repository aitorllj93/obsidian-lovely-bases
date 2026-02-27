import { type ComponentType, useEffect, useRef } from "react";

import type { CardMedia, CardMediaType } from "@/components/Card/types";
import type { CardLayout, MediaFit } from "@/components/Facets/config";

import Audio from "./Audio";
import Image from "./Image";
import type { ContentProps } from "./types";
import Url from "./Url";
import Video from "./Video";
import Youtube from "./Youtube";

type Props = {
  aspectRatio: number;
  autoPlay?: boolean;
  fit?: MediaFit;
  layout: CardLayout;
  thumbnail?: CardMedia;
  title: string;
  type: CardMediaType;
  url?: string | null;
  width: number;
};

const Noop = (_: ContentProps) => null;

const ContentsByType: Record<CardMediaType, ComponentType<ContentProps>> = {
  audio: Audio,
  color: Noop,
  empty: Noop,
  image: Image,
  unsupported: Noop,
  url: Url,
  video: Video,
  youtube: Youtube
};

const MediaContent = ({
  aspectRatio,
  autoPlay,
  fit,
  layout,
  thumbnail,
  title,
  type,
  url,
  width,
}: Props) => {
  const mainEverMountedRef = useRef(false);

  const hasUrl = !!url;
  const hasThumb = !!thumbnail?.value;

  const Component = ContentsByType[type];
  const ThumbnailComponent = thumbnail?.value
    ? ContentsByType[thumbnail.type]
    : undefined;

  const mediaAspectRatio =
    layout === "vertical" || layout === "polaroid"
      ? 1 / aspectRatio
      : undefined;
  const height = layout === "vertical" ? width * aspectRatio : undefined;

  const wantsMain = hasUrl && (autoPlay || !hasThumb);

  useEffect(() => {
    if (wantsMain) mainEverMountedRef.current = true;
  }, [wantsMain]);

  const shouldMountMain = wantsMain || mainEverMountedRef.current;

  if (!hasUrl) {
    return null;
  }

  return (
    <>
      {ThumbnailComponent && (
        <ThumbnailComponent
          aspectRatio={mediaAspectRatio}
          autoPlay={autoPlay}
          className={autoPlay ? "hidden" : undefined}
          fit={fit}
          title={title}
          url={thumbnail?.value as string}
          style={{
            height,
          }}
        />
      )}
      {shouldMountMain && (
        <Component
          aspectRatio={mediaAspectRatio}
          autoPlay={autoPlay}
          className={!autoPlay && hasThumb ? "hidden" : undefined}
          fit={fit}
          title={title}
          url={url}
          style={{
            height,
          }}
          thumbnail={thumbnail}
        />
      )}
    </>
  );
};

export default MediaContent;
