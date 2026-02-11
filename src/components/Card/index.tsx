import { cva } from "class-variance-authority";
import type { BasesEntry, BasesViewConfig } from "obsidian";
import { memo, useCallback, useRef, useState } from "react";

import { useEntryHover } from "@/hooks/use-entry-hover";
import { useEntryOpen } from "@/hooks/use-entry-open";
import { useEntryImage } from "@/hooks/use-image";
import { cn } from "@/lib/utils";

import Badge from "./components/Badge";
import Content from "./components/Content";
import HoverOverlay from "./components/HoverOverlay";
import Image from "./components/Image";

import { DEFAULTS } from "./constants";
import { compareCardConfig } from "./helpers/compare-config";
import { useCardColors } from "./hooks/use-card-colors";
import type { CardConfig } from "./types";

type Props = CardConfig & {
  adaptToSize?: boolean;
	className?: string;
	entry: BasesEntry;
	config: BasesViewConfig;
	isDraggable?: boolean;
  style?: React.CSSProperties;
};

const cardContentVariants = cva(
  "relative shadow-md overflow-hidden transition-all hover:shadow-lg cursor-pointer border group box-border flex h-full",
	{
    variants: {
      layout: {
        horizontal: "flex flex-row h-full bg-card border-border",
        vertical: "flex flex-col h-full bg-card border-border",
        overlay: "bg-card border-border",
        polaroid: "flex flex-col h-full"
      },
			shape: {
				square: "",
				circle: "rounded-full",
				rounded: "rounded-[20%]",
			},
			tilt: {
				none: "",
				alternating: "shadow-xl even:rotate-3 odd:-rotate-2 hover:rotate-0 ease-out duration-300",
			},
      withBgColor: {
        true: "",
        false: "",
      },
      adaptToSize: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        shape: "square",
        adaptToSize: false,
        class: "rounded"
      },
      {
        shape: "square",
        adaptToSize: true,
        class: "@[0px]/lovely-card:rounded-sm @6xs/lovely-card:rounded-md  @4xs/lovely-card:rounded"
      },
      {
        layout: "polaroid",
        withBgColor: true,
        class: "bg-card border-card",
      },
      {
        layout: "polaroid",
        adaptToSize: false,
        class: "border-10 border-b-28",
      },
      {
        layout: "polaroid",
        adaptToSize: true,
        class: "@[0px]/lovely-card:border-4 @[0px]/lovely-card:border-b-10 @8xs/lovely-card:border-b-13 @7xs/lovely-card:border-b-15 @6xs/lovely-card:border-4 @6xs/lovely-card:border-b-16 @5xs/lovely-card:border-5 @5xs/lovely-card:border-b-17 @4xs/lovely-card:border-5 @4xs/lovely-card:border-b-18 @3xs/lovely-card:border-6 @3xs/lovely-card:border-b-20 @2xs/lovely-card:border-7 @2xs/lovely-card:border-b-22 @xs/lovely-card:border-8 @xs/lovely-card:border-b-24 @sm/lovely-card:border-10 @sm/lovely-card:border-b-28",
      }
    ],
		defaultVariants: {
			shape: DEFAULTS.shape,
      layout: DEFAULTS.layout,
			tilt: DEFAULTS.tilt,
      withBgColor: false,
      adaptToSize: false,
		},
  },
);

const DRAG_THRESHOLD = 5;

const Card = memo(({
  adaptToSize = false,
  className,
  config,
  entry,
  isDraggable = false,
  style,
  ...cardConfig
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const dragStartPos = useRef<{ x: number; y: number } | null>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const entryId = entry.file.path;
  const handleEntryOpen = useEntryOpen(entry, config, cardConfig.linkProperty);
  const handleEntryHover = useEntryHover(entryId, linkRef);
  const image = useEntryImage(entry, cardConfig.imageProperty);
  const colors = useCardColors(entry, cardConfig, image);

  const onPointerDown = (event: React.PointerEvent) => {
    dragStartPos.current = { x: event.clientX, y: event.clientY };
  };

  const handleClick = useCallback((event: React.MouseEvent) => {
    if (isDraggable && dragStartPos.current) {
      const dx = Math.abs(event.clientX - dragStartPos.current.x);
      const dy = Math.abs(event.clientY - dragStartPos.current.y);
      if (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD) {
        dragStartPos.current = null;
        return;
      }
    }

    handleEntryOpen(event);
  }, [handleEntryOpen, isDraggable]);

  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  const contentClasses = cardContentVariants({
    adaptToSize,
    layout: cardConfig.layout,
    shape: cardConfig.shape,
    tilt: cardConfig.tilt,
    withBgColor: !colors.contentBackground,
  });

  const isOverlay = cardConfig.layout === "overlay";
  const showOverlayContent = isOverlay && (
    cardConfig.overlayContentVisibility === "always" || isHovered
  );

  return (
    <div
      data-testid="lovely-card-container"
      data-layout={cardConfig.layout}
      className={
        cn(
          "@container/lovely-card relative flex",
          !isOverlay && "h-full"
        )
      }
      style={{
        width: cardConfig.cardSize,
        ...(isOverlay && { height: `${cardConfig.cardSize * cardConfig.imageAspectRatio}px` }),
      }}
      onPointerDown={onPointerDown}
      onClick={handleClick}
      onMouseOver={handleEntryHover}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <div
        className={
          cn(
            className,
            contentClasses,
          )
        }
        style={{
          width: cardConfig.cardSize,
          ...(isOverlay && { height: `${cardConfig.cardSize * cardConfig.imageAspectRatio}px` }),
          ...(cardConfig.layout === "polaroid" ? { backgroundColor: colors.contentBackground, borderColor: colors.contentBackground } : undefined),
          ...style,
        }}
      >
        {/** biome-ignore lint/a11y/useAnchorContent: this is a workaround */}
        {/** biome-ignore lint/a11y/useValidAnchor: as seen in Obsidian examples */}
        <a
          ref={linkRef}
          className="pointer-events-none absolute inset-0 z-0"
          draggable={false}
        />

      {isOverlay ? (
        <>
          <Image
            entry={entry}
            cardConfig={cardConfig}
            colors={colors}
            config={config}
            image={image}
            isOverlayMode />
          <div className={cn(
            "absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent pointer-events-none transition-opacity duration-300 ease-out",
            showOverlayContent ? "opacity-100" : "opacity-0"
          )} />
          <div className={cn(
            "absolute bottom-0 left-0 right-0 transition-all duration-300 ease-out",
            showOverlayContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          )}>
            <Content
              adaptToSize={adaptToSize}
              entry={entry}
              cardConfig={cardConfig}
              colors={colors}
              config={config}
              isOverlayMode />
          </div>
          {cardConfig.badgeProperty && (
            <div className={cn(
              "transition-all duration-300 ease-out",
              showOverlayContent
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4 pointer-events-none"
            )}>
              <Badge entry={entry} cardConfig={cardConfig} config={config} />
            </div>
          )}
        </>
      ) : (
        <>
          {!cardConfig.reverseContent ? (
            <Image
              entry={entry}
              cardConfig={cardConfig}
              colors={colors}
              config={config}
              image={image} />
          ) : (
            <Content
              adaptToSize={adaptToSize}
              entry={entry}
              cardConfig={cardConfig}
              colors={colors}
              config={config} />
          )}

          {cardConfig.reverseContent ? (
            <Image entry={entry} cardConfig={cardConfig} config={config} image={image} colors={colors} />
          ) : (
            <Content
              adaptToSize={adaptToSize}
              entry={entry}
              cardConfig={cardConfig}
              colors={colors}
              config={config} />
          )}
          {cardConfig.badgeProperty && (
            <Badge adaptToSize={adaptToSize} entry={entry} cardConfig={cardConfig} config={config} />
          )}
        </>
      )}

        {isHovered && <HoverOverlay entry={entry} cardConfig={cardConfig} config={config} />}
      </div>
    </div>
  );
},
(prevProps, nextProps) => (
  prevProps.adaptToSize === nextProps.adaptToSize &&
  prevProps.entry === nextProps.entry &&
  prevProps.className === nextProps.className &&
  prevProps.isDraggable === nextProps.isDraggable &&
  compareCardConfig(prevProps, nextProps)
),
);

Card.displayName = "Card";

export default Card;
