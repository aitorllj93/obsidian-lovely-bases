import type { BasesEntry } from "obsidian";
import { memo } from "react";

import type { FacetsConfig } from "@/components/Facets/config";
import { getTitle } from "@/lib/properties";
import { useCardMedia } from "../../hooks/use-card-media";
import MediaContent from "./components/Content";
import MediaFallback from "./components/Fallback";
import MediaWrapper from "./components/Wrapper";

type Props = Pick<FacetsConfig,
  'cardLayout' |
  'iconProperty' |
  'mediaFit' |
  'mediaProperty' |
  'mediaThumbnailProperty'
> & {
  accentColor?: string;
  aspectRatio: number;
  autoPlay?: boolean;
  entry: BasesEntry;
  width: number;
};

const PureMedia = ({
  accentColor,
  aspectRatio,
  autoPlay,
  cardLayout,
  entry,
  mediaFit,
  mediaProperty,
  iconProperty,
  mediaThumbnailProperty,
  width,
}: Props) => {
  const { type, value } = useCardMedia(entry, mediaProperty) ?? { type: undefined, value: undefined };
  const thumbnail = useCardMedia(entry, mediaThumbnailProperty);
  const title = getTitle(entry);

  const shouldShowFallback = !type || type === 'color' || type === 'unsupported' || type === 'empty';

  return (
    <MediaWrapper
      aspectRatio={aspectRatio}
      backgroundColor={accentColor}
      layout={cardLayout}
      type={type}
      width={width}>
      {!shouldShowFallback ? (
        <MediaContent
          aspectRatio={aspectRatio}
          autoPlay={autoPlay}
          fit={mediaFit}
          layout={cardLayout}
          thumbnail={thumbnail}
          title={title}
          type={type}
          url={value}
          width={width}
        />
      ) : (
        <MediaFallback
          accentColor={accentColor}
          entry={entry}
          iconProperty={iconProperty}
        />
      )}
    </MediaWrapper>
  )
};

const Media = memo(PureMedia);

Media.displayName = "Media";

export default Media;
