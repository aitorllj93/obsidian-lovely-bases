import { type ComponentType, memo } from "react";

import { type UrlMediaType, useUrlMediaType } from "./hooks/use-url-media-type";
import Image from "./Image";
import type { ContentProps } from "./types";
import Video from "./Video";

const Noop = (_: ContentProps) => null;

const ContentsByType: Record<UrlMediaType, ComponentType<ContentProps>> = {
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
}: ContentProps) => {
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
