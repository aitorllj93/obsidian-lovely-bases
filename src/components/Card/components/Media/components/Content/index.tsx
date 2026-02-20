import type { ComponentType } from "react";

import type { CardMedia, CardMediaType } from "@/components/Card/types";
import type { CardLayout, MediaFit } from "@/components/Facets/config";

import Image from "./Image";
import type { ContentProps } from "./types";
import Url from "./Url";
import Video from "./Video";
import Youtube from "./Youtube";

type Props = {
  aspectRatio: number;
  autoPlay?: boolean;
  fit: MediaFit;
  layout: CardLayout;
  thumbnail?: CardMedia;
  title: string;
  type: CardMediaType;
  url?: string | null;
  width: number;
}

const Noop = (_: ContentProps) => null;

const ContentsByType: Record<CardMediaType, ComponentType<ContentProps>> = {
  image: Image,
  audio: Noop,
  color: Noop,
  empty: Noop,
  unsupported: Noop,
  url: Url,
  video: Video,
  youtube: Youtube,
}

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
  const mediaAspectRatio = (layout === 'vertical' || layout === 'polaroid') ?
    1 / aspectRatio : undefined;
  const height = layout === 'vertical' ?
    width * aspectRatio :
    undefined;

  if (!url) {
    return null;
  }

  const Component = ContentsByType[type];
  const ThumbnailComponent = thumbnail?.value ? ContentsByType[thumbnail.type] : undefined;

  return (
    <>
      {ThumbnailComponent && (
        <ThumbnailComponent
          aspectRatio={mediaAspectRatio}
          autoPlay={autoPlay}
          className={autoPlay ? 'hidden' : undefined}
          fit={fit}
          title={title}
          url={thumbnail?.value as string}
          style={{
            height,
          }}
        />
      )}
      <Component
        aspectRatio={mediaAspectRatio}
        autoPlay={autoPlay}
        className={!autoPlay && thumbnail ? 'hidden' : undefined}
        fit={fit}
        title={title}
        url={url}
        style={{
          height,
        }}
      />
    </>
  )

}

export default MediaContent;
