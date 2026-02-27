import type { BasesEntry, BasesEntryGroup } from "obsidian";
import { type CSSProperties, memo, useMemo } from "react";

import type { FacetsConfig } from "@/components/Facets/config";
import { cn } from "@/lib/utils";

import { useObsidian } from "../Obsidian/Context";

import Content from "./components/Content";
import { getBackground } from "./helpers/get-background";

type Props = Pick<
  FacetsConfig,
  "backgroundGradient" | "backgroundInferFrom" | "backgroundProperty"
> & {
  activeItem?: BasesEntry | BasesEntryGroup;
  className?: string;
  items: (BasesEntry | BasesEntryGroup)[];
  style?: CSSProperties;
};

const PureBackground = ({
  activeItem,
  backgroundGradient,
  backgroundInferFrom,
  backgroundProperty,
  className,
  items,
  style,
}: Props) => {
  const { app } = useObsidian();

  const media = useMemo(
    () =>
      getBackground(app, {
        activeItem,
        items,
        backgroundInferFrom,
        backgroundProperty,
      }),
    [app, activeItem, items, backgroundInferFrom, backgroundProperty],
  );

  if (!media) {
    return null;
  }

  return (
    <div className="absolute inset-0 h-full w-full -z-10">
      <Content
        className={cn(
          "absolute inset-0 h-full w-full object-cover blur-[2px]",
          backgroundGradient === 'dark' && "brightness-75",
          backgroundGradient === "light" && "contrast-75 saturate-50",
          className,
        )}
        fit="cover"
        style={style}
        type={media.type}
        url={media.value}
      />
      {backgroundGradient !== "none" && (
        <div
          className={cn(
            "absolute inset-0 h-full w-full bg-linear-to-t from-25% to-transparent",
            backgroundGradient === "dark" && "from-black via-black/40",
            backgroundGradient === "light" && "from-white via-white/40",
          )}
        />
      )}
    </div>
  );
};

const Background = memo(PureBackground);

Background.displayName = "Background";

export default Background;
