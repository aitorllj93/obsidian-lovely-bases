import { type ComponentType, type CSSProperties, memo } from "react";

import type { CardMediaType } from "@/components/Card/types";
import type { MediaFit } from "@/components/Facets/config";

import Image from "./Image";
import type { BackgroundProps } from "./types";
import Url from "./Url";
import Video from "./Video";
import Youtube from "./Youtube";

type Props = {
  aspectRatio?: number;
  className?: string;
  fit: MediaFit;
  style?: CSSProperties;
  type: CardMediaType;
  url?: string | null;
};

const Noop = (_: BackgroundProps) => null;

const ContentsByType: Record<CardMediaType, ComponentType<BackgroundProps>> = {
  image: Image,
  audio: Noop,
  color: Noop,
  empty: Noop,
  unsupported: Noop,
  url: Url,
  video: Video,
  youtube: Youtube,
};

const PureMediaContent = ({
  aspectRatio,
  className,
  fit,
  style,
  type,
  url
}: Props) => {
  const Component = ContentsByType[type];

  if (!url) {
    return null;
  }

  return (
    <Component
      aspectRatio={aspectRatio}
      autoPlay={true}
      className={className}
      fit={fit}
      style={style}
      url={url}
    />
  );
};

const MediaContent = memo(PureMediaContent);

export default MediaContent;
