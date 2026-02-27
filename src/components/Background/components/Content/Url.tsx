import { type ComponentType, memo } from "react";

import { type UrlMediaType, useUrlMediaType } from "./hooks/use-url-media-type";
import Image from "./Image";
import type { BackgroundProps } from "./types";
import Video from "./Video";

const Noop = (_: BackgroundProps) => null;

const ContentsByType: Record<UrlMediaType, ComponentType<BackgroundProps>> = {
  image: Image,
  audio: Noop,
  url: Noop,
  video: Video,
}

const PureUrl = ({
  aspectRatio,
  autoPlay,
  className,
  fit,
  style,
  title,
  url,
}: BackgroundProps) => {
  const mediaType = useUrlMediaType(url);

  const Component = ContentsByType[mediaType];

  return (
    <Component
      aspectRatio={aspectRatio}
      autoPlay={autoPlay}
      className={className}
      fit={fit}
      style={style}
      title={title}
      url={url}
    />
  )
}

const Url = memo(PureUrl);

Url.displayName = 'Url';

export default Url;
