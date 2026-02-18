import { cva } from "class-variance-authority";
import type { BasesEntry, BasesViewConfig } from "obsidian";
import { forwardRef, memo, useCallback, useRef, useState } from "react";

import { FACETS_CONFIG_DEFAULTS, type FacetsConfig } from "@/components/Facets/config";
import { useEntryHover } from "@/hooks/use-entry-hover";
import { useEntryOpen } from "@/hooks/use-entry-open";
import { useEntryImage } from "@/hooks/use-image";
import { cn, isEven, isOdd, shallowEqual } from "@/lib/utils";

import Badge from "./components/Badge";
import Content from "./components/Content";
import HoverOverlay from "./components/HoverOverlay";
import Image from "./components/Image";

import { useCardColors } from "./hooks/use-card-colors";

type Props = FacetsConfig & {
	className?: string;
  contentClassName?: string;
	entry: BasesEntry;
	config: BasesViewConfig;
  index?: number;
	isDraggable?: boolean;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
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
			shape: FACETS_CONFIG_DEFAULTS.cardShape,
      layout: FACETS_CONFIG_DEFAULTS.cardLayout,
      withBgColor: false,
      adaptToSize: FACETS_CONFIG_DEFAULTS.cardAdaptToSize,
		},
  },
);

const DRAG_THRESHOLD = 5;

const PureCard = forwardRef<HTMLDivElement, Props>(({
  className,
  config,
  contentClassName,
  entry,
  index = 0,
  isDraggable = false,
  style,
  onClick,
  ...facetsConfig
}: Props, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const dragStartPos = useRef<{ x: number; y: number } | null>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const entryId = entry.file.path;
  const handleEntryOpen = useEntryOpen(entry, config, facetsConfig.actionLinkProperty);
  const handleEntryHover = useEntryHover(entryId, linkRef);
  const image = useEntryImage(entry, facetsConfig.imageProperty);
  const colors = useCardColors(entry, facetsConfig, image);

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

    onClick ? onClick(event) : handleEntryOpen(event);
  }, [handleEntryOpen, isDraggable, onClick]);

  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  const contentClasses = cardContentVariants({
    adaptToSize: facetsConfig.cardAdaptToSize,
    layout: facetsConfig.cardLayout,
    shape: facetsConfig.cardShape,
    withBgColor: !colors.contentBackground,
  });

  const isOverlay = facetsConfig.cardLayout === "overlay";
  const showOverlayContent = isOverlay && (
    facetsConfig.contentVisibility === "always" || isHovered
  );

  return (
    <div
      data-testid="lovely-card-container"
      data-layout={facetsConfig.cardLayout}
      className={
        cn(
          "@container/lovely-card relative flex",
          !isOverlay && "h-full",
          facetsConfig.cardTilt === 'clockwise' && "[&>div]:rotate-3 hover:[&>div]:rotate-0",
          facetsConfig.cardTilt === 'counterclockwise' && "[&>div]:-rotate-2 hover:[&>div]:rotate-0",
          facetsConfig.cardTilt === 'alternating' && isOdd(index) && "[&>div]:-rotate-2 hover:[&>div]:rotate-0",
          facetsConfig.cardTilt === 'alternating' && isEven(index) && "[&>div]:rotate-3 hover:[&>div]:rotate-0",
          className,
        )
      }
      style={{
        width: facetsConfig.layoutItemSize,
        ...(isOverlay && { height: `${facetsConfig.layoutItemSize * facetsConfig.imageAspectRatio}px` }),
        ...style,
      }}
      onPointerDown={onPointerDown}
      onClick={handleClick}
      onMouseOver={handleEntryHover}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={ref}>
      <div
        className={
          cn(
            contentClassName,
            contentClasses,
            facetsConfig.cardTilt !== "none" && "shadow-xl ease-out duration-300"
          )
        }
        style={{
          width: facetsConfig.layoutItemSize,
          ...(isOverlay && { height: `${facetsConfig.layoutItemSize * facetsConfig.imageAspectRatio}px` }),
          ...(facetsConfig.cardLayout === "polaroid" ? { backgroundColor: colors.contentBackground, borderColor: colors.contentBackground } : undefined),
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
            facetsConfig={facetsConfig}
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
              entry={entry}
              facetsConfig={facetsConfig}
              colors={colors}
              config={config}
              isOverlayMode />
          </div>
          {facetsConfig.badgeProperty && (
            <Badge
              className={cn(
                "transition-all duration-300 ease-out",
                showOverlayContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              entry={entry}
              facetsConfig={facetsConfig}
              config={config} />
          )}
        </>
      ) : (
        <>
          {!facetsConfig.cardReverseContent ? (
            <Image
              entry={entry}
              facetsConfig={facetsConfig}
              colors={colors}
              config={config}
              image={image} />
          ) : (
            <Content
              entry={entry}
              facetsConfig={facetsConfig}
              colors={colors}
              config={config} />
          )}

          {facetsConfig.cardReverseContent ? (
            <Image entry={entry} facetsConfig={facetsConfig} config={config} image={image} colors={colors} />
          ) : (
            <Content
              entry={entry}
              facetsConfig={facetsConfig}
              colors={colors}
              config={config} />
          )}
          {facetsConfig.badgeProperty && (
            <Badge entry={entry} facetsConfig={facetsConfig} config={config} />
          )}
        </>
      )}

        {isHovered && <HoverOverlay entry={entry} facetsConfig={facetsConfig} config={config} />}
      </div>
    </div>
  );
});

const Card = memo(PureCard, ({
  entry: prevEntry,
  config: prevConfig,
  ...prevProps
}, {
  entry: nextEntry,
  config: nextConfig,
  ...nextProps
}) => (
  prevEntry === nextEntry &&
  prevConfig === nextConfig &&
  shallowEqual(prevProps, nextProps)
));

Card.displayName = "Card";

export default Card;
