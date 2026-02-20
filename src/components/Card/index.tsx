import type { BasesEntry, BasesViewConfig } from "obsidian";
import {
  type ComponentProps,
  forwardRef,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

import type { FacetsConfig } from "@/components/Facets/config";
import { useEntryHover } from "@/hooks/use-entry-hover";
import { useEntryOpen } from "@/hooks/use-entry-open";
import { cn, shallowEqual } from "@/lib/utils";

import Badge from "./components/Badge";
import Content from "./components/Content";
import HoverOverlay from "./components/HoverOverlay";
import Media from "./components/Media";
import { OverlayBackdrop, OverlayBody } from "./components/Overlay";
import Wrapper from "./components/Wrapper";

import { getAccentColor } from "./helpers/get-colors";

type Props = FacetsConfig & {
  active?: boolean;
  className?: string;
  contentClassName?: string;
  entry: BasesEntry;
  config: BasesViewConfig;
  index?: number;
  isDraggable?: boolean;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
};

const DRAG_THRESHOLD = 5;

const PureCard = forwardRef<HTMLDivElement, Props>(
  (
    {
      active,
      className,
      config,
      contentClassName,
      entry,
      index = 0,
      isDraggable = false,
      style,
      onClick,
      ...facetsConfig
    },
    ref,
  ) => {
    const height = facetsConfig.layoutItemSize * facetsConfig.imageAspectRatio;
    const width = facetsConfig.layoutItemSize;
    const aspectRatio = height / width;

    const [isHovered, setIsHovered] = useState(false);
    const dragStartPos = useRef<{ x: number; y: number } | null>(null);
    const linkRef = useRef<HTMLAnchorElement>(null);
    const entryId = entry.file.path;
    const handleEntryOpen = useEntryOpen(
      entry,
      config,
      facetsConfig.actionLinkProperty,
    );
    const handleEntryHover = useEntryHover(entryId, linkRef);
    const accentColor = useMemo(
      () =>
        getAccentColor(entry, {
          colorProperty: facetsConfig.colorProperty,
          imageProperty: facetsConfig.imageProperty,
        }),
      [entry, facetsConfig.colorProperty, facetsConfig.imageProperty],
    );

    const handlePointerDown = (event: React.PointerEvent) => {
      dragStartPos.current = { x: event.clientX, y: event.clientY };
    };

    const handlePointerUp = () => {
      dragStartPos.current = null;
    };

    const handlePointerCancel = () => {
      dragStartPos.current = null;
    };

    const handleClick = useCallback(
      (event: React.MouseEvent) => {
        if (isDraggable && dragStartPos.current) {
          const dx = Math.abs(event.clientX - dragStartPos.current.x);
          const dy = Math.abs(event.clientY - dragStartPos.current.y);
          dragStartPos.current = null;
          if (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD) {
            return;
          }
        }

        onClick ? onClick(event) : handleEntryOpen(event);
      },
      [handleEntryOpen, isDraggable, onClick],
    );

    const handleMouseEnter = (evt: React.MouseEvent) => {
      handleEntryHover(evt);
      setIsHovered(true);
    };
    const handleMouseLeave = () => setIsHovered(false);

    const showOverlayContent =
      facetsConfig.cardLayout === "overlay" &&
      (facetsConfig.contentVisibility === "always" || isHovered);

    const mediaProps: ComponentProps<typeof Media> = {
      accentColor:
        facetsConfig.colorApplyTo !== "content" ? accentColor : undefined,
      autoPlay: active,
      cardLayout: facetsConfig.cardLayout,
      entry,
      iconProperty: facetsConfig.iconProperty,
      aspectRatio,
      imageFit: facetsConfig.imageFit,
      imageProperty: facetsConfig.imageProperty,
      width,
      mediaThumbnailProperty: facetsConfig.mediaThumbnailProperty,
    };

    const contentProps: ComponentProps<typeof Content> = {
      accentColor:
        facetsConfig.colorApplyTo !== "image" ? accentColor : undefined,
      cardAdaptToSize: facetsConfig.cardAdaptToSize,
      cardLayout: facetsConfig.cardLayout,
      contentFont: facetsConfig.contentFont,
      contentMarkdownMaxHeight: facetsConfig.contentMarkdownMaxHeight,
      contentMarkdownMaxLength: facetsConfig.contentMarkdownMaxLength,
      contentShowMarkdown: facetsConfig.contentShowMarkdown,
      contentShowPropertyTitles: facetsConfig.contentShowPropertyTitles,
      entry,
      width,
      properties: facetsConfig.properties,
      titleFont: facetsConfig.titleFont,
      titlePosition: facetsConfig.titlePosition,
      config,
    };

    const badgeProps: ComponentProps<typeof Badge> = {
      entry,
      badgeFont: facetsConfig.badgeFont,
      badgeProperty: facetsConfig.badgeProperty,
      badgeIconProperty: facetsConfig.badgeIconProperty,
      badgeColorProperty: facetsConfig.badgeColorProperty,
      cardAdaptToSize: facetsConfig.cardAdaptToSize,
    };

    return (
      <Wrapper
        accentColor={facetsConfig.colorApplyTo !== "image" ? accentColor : undefined}
        cardAdaptToSize={facetsConfig.cardAdaptToSize}
        cardLayout={facetsConfig.cardLayout}
        cardShape={facetsConfig.cardShape}
        cardTilt={facetsConfig.cardTilt}
        height={height}
        aspectRatio={aspectRatio}
        index={index}
        width={width}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={ref}
      >
        {/** biome-ignore lint/a11y/useAnchorContent: this is a workaround */}
        {/** biome-ignore lint/a11y/useValidAnchor: as seen in Obsidian examples */}
        <a
          ref={linkRef}
          className="pointer-events-none absolute inset-0 z-0"
          draggable={false}
        />

        {facetsConfig.cardLayout === "overlay" ? (
          <>
            <Media {...mediaProps} />
            <OverlayBackdrop show={showOverlayContent} />
            <OverlayBody show={showOverlayContent}>
              <Content {...contentProps} />
            </OverlayBody>
            {facetsConfig.badgeProperty && (
              <Badge
                {...badgeProps}
                className={cn(
                  "transition-all duration-300 ease-out",
                  showOverlayContent
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4",
                )}
              />
            )}
          </>
        ) : (
          <>
            {!facetsConfig.cardReverseContent ? (
              <Media {...mediaProps} />
            ) : (
              <Content {...contentProps} />
            )}

            {facetsConfig.cardReverseContent ? (
              <Media {...mediaProps} />
            ) : (
              <Content {...contentProps} />
            )}

            {facetsConfig.badgeProperty && <Badge {...badgeProps} />}
          </>
        )}

        {isHovered && (
          <HoverOverlay
            actionHoverStyle={facetsConfig.actionHoverStyle}
            actionHoverProperty={facetsConfig.actionHoverProperty}
            cardAdaptToSize={facetsConfig.cardAdaptToSize}
            config={config}
            contentShowPropertyTitles={facetsConfig.contentShowPropertyTitles}
            entry={entry}
          />
        )}
      </Wrapper>
    );
  },
);

const Card = memo(
  PureCard,
  (
    { entry: prevEntry, config: prevConfig, ...prevProps },
    { entry: nextEntry, config: nextConfig, ...nextProps },
  ) =>
    prevEntry === nextEntry &&
    prevConfig === nextConfig &&
    shallowEqual(prevProps, nextProps),
);

Card.displayName = "Card";

export default Card;
