import { memo } from "react";

import { cn } from "@/lib/utils";

import type { BackgroundProps } from "./types";

const PureImage = ({
  aspectRatio,
  className,
  fit,
  style,
  title,
  url,
}: BackgroundProps) => {
  return (
    <div
      title={title}
      draggable={false}
      className={cn(
        "pointer-events-none h-full w-full bg-no-repeat",
        fit === "cover" ? "bg-cover" : "bg-fixed",
        className,
      )}
      style={{
        backgroundImage: `url(${url})`,
        aspectRatio,
        ...style
      }}
    />
  )
}

const Image = memo(PureImage);

Image.displayName = 'Image';

export default Image;
