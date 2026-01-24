import type { BasesEntry, BasesViewConfig } from "obsidian";
import { memo } from "react";

import LucideIcon from "@/components/Obsidian/LucideIcon";
import { useEntryProperty } from "@/hooks/use-property";
import { useEntryTitle } from "@/hooks/use-title";
import { cn } from "@/lib/utils";

import type { CardColors, CardConfig, CardImage } from "./types";

const ICON_BY_EXTENSION = {
  md: "text-align-start",
  pdf: "file-text",
  epub: "book",
  base: "database",
  canvas: "layout-dashboard",
  unknown: "file-question-mark",
} as const;

type NonImageFallbackProps = {
  entry: BasesEntry;
  cardConfig: CardConfig;
  config: BasesViewConfig;
  colors: Pick<CardColors, "imageBackground" | "imageForeground">;
};

const NonImageFallback = ({
  entry,
  cardConfig,
  colors,
  config,
}: NonImageFallbackProps) => {
  const { iconProperty } = cardConfig;
  const iconValue = useEntryProperty(entry, config, iconProperty);

  const icon =
    iconValue && !iconValue.isEmpty
      ? iconValue.value.toString()
      : ICON_BY_EXTENSION[
          entry.file.extension as keyof typeof ICON_BY_EXTENSION
        ] || ICON_BY_EXTENSION.unknown;

  return (
    <div className="h-full w-full flex items-center justify-center">
      <LucideIcon
        className={cn(
          "w-[80%] aspect-square block",
          !colors.imageForeground && "text-(--text-faint)",
        )}
        name={icon}
        style={{ color: colors.imageForeground }}
      />
    </div>
  );
};

type Props = {
  entry: BasesEntry;
  cardConfig: CardConfig;
  config: BasesViewConfig;
  isOverlayMode?: boolean;
  colors: CardColors;
  image: CardImage;
};

const Image = memo(
  ({ entry, cardConfig, colors, image, config, isOverlayMode }: Props) => {
    const { imageProperty, cardSize, layout, imageAspectRatio, imageFit } =
      cardConfig;

    const title = useEntryTitle(entry);

    if (isOverlayMode) {
      return (
        <div
          className={cn(
            "absolute inset-0",
            !colors.imageBackground && "bg-(--bases-cards-cover-background)",
          )}
          style={{
            backgroundColor: colors.imageBackground,
          }}
        >
          {image && !image.isColor ? (
            <img
              src={image.url}
              alt={title}
              draggable={false}
              loading="lazy"
              className={cn(
                "pointer-events-none h-full w-full",
                imageFit === "cover" ? "object-cover" : "object-contain",
              )}
            />
          ) : (
            <NonImageFallback
              entry={entry}
              cardConfig={cardConfig}
              config={config}
              colors={colors}
            />
          )}
        </div>
      );
    }

    if (layout === "horizontal") {
      return imageProperty ? (
        <div
          className={cn(
            "relative shrink-0",
            !colors.imageBackground && "bg-(--bases-cards-cover-background)",
          )}
          style={{
            backgroundColor: colors.imageBackground,
            // aspect ratio 2.5 = 100% del ancho, 0.25 = 10%
            width: `${(imageAspectRatio / 2.5) * 100}%`,
          }}
        >
          <div className="absolute inset-0">
            {image && !image.isColor ? (
              <img
                src={image.url}
                alt={title}
                draggable={false}
                loading="lazy"
                className={cn(
                  "pointer-events-none h-full w-full",
                  imageFit === "cover" ? "object-cover" : "object-contain",
                )}
              />
            ) : (
              <NonImageFallback
                entry={entry}
                cardConfig={cardConfig}
                config={config}
                colors={colors}
              />
            )}
          </div>
        </div>
      ) : null;
    }

    const isPolaroid = layout === "polaroid";

    return imageProperty ? (
      <div
        className={cn(
          "mx-auto relative w-full flex-none",
          !colors.imageBackground && "bg-(--bases-cards-cover-background)",
        )}
        style={{
          aspectRatio: 1 / imageAspectRatio,
          backgroundColor: colors.imageBackground,
          ...(!isPolaroid && { height: cardSize * imageAspectRatio }),
        }}
      >
        {image && !image.isColor ? (
          <img
            src={image.url}
            alt={title}
            draggable={false}
            loading="lazy"
            className={cn(
              "pointer-events-none h-full w-full",
              imageFit === "cover" ? "object-cover" : "object-contain",
            )}
            style={{
              aspectRatio: 1 / imageAspectRatio,
              ...(!isPolaroid && { height: cardSize * imageAspectRatio }),
            }}
          />
        ) : (
          <NonImageFallback
            entry={entry}
            cardConfig={cardConfig}
            config={config}
            colors={colors}
          />
        )}
      </div>
    ) : null;
  },
);

Image.displayName = "Image";

export default Image;
