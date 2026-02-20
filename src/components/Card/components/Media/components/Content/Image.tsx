import { memo } from "react";

import { cn } from "@/lib/utils";

import type { ContentProps } from "./types";

const PureImage = ({
  aspectRatio,
  className,
  fit,
  style,
  title,
  url,
}: ContentProps) => {
  return (
    <img
      src={url}
      alt={title}
      draggable={false}
      className={cn(
        "pointer-events-none h-full w-full",
        fit === "cover" ? "object-cover" : "object-contain",
        className,
      )}
      style={{
        aspectRatio,
        ...style
      }}
    />
  )
}

const Image = memo(PureImage);

Image.displayName = 'Image';

export default Image;
