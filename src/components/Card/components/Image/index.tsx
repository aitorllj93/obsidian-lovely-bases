import type { BasesEntry, BasesViewConfig } from "obsidian";
import { memo } from "react";

import { useEntryTitle } from "@/hooks/use-title";
import { cn } from "@/lib/utils";

import type { CardColors, CardConfig, CardImage } from "../../types";
import NonImageFallback from "./NonImageFallback";

type Props = {
  entry: BasesEntry;
  cardConfig: CardConfig;
  config: BasesViewConfig;
  isOverlayMode?: boolean;
  colors: CardColors;
  image: CardImage;
};

const Image = memo(
  ({ cardConfig, colors, config, entry, image, isOverlayMode }: Props) => {
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
