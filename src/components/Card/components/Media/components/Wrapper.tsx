import { type ComponentType, memo, type PropsWithChildren } from "react";

import type { CardLayout } from "@/components/Facets/config";

import { cn } from "@/lib/utils";

type WrapperProps = PropsWithChildren<{
  backgroundColor?: string;
  aspectRatio?: number;
  className?: string;
  width?: number;
}>;

const HorizontalWrapper = ({
  aspectRatio = 2.5,
  backgroundColor,
  children,
}: WrapperProps) => {
  return (
    <div
      className={cn(
        "relative shrink-0",
        !backgroundColor && "bg-(--bases-cards-cover-background)",
      )}
      style={{
        backgroundColor,
        // aspect ratio 2.5 = 100% del ancho, 0.25 = 10%
        width: `${(aspectRatio / 2.5) * 100}%`,
      }}
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  );
};

const OverlayWrapper = ({ backgroundColor, children }: WrapperProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0",
        !backgroundColor && "bg-(--bases-cards-cover-background)",
      )}
      style={{
        backgroundColor,
      }}
    >
      {children}
    </div>
  );
};

const VerticalWrapper = ({
  aspectRatio = 1,
  backgroundColor,
  children,
  width = 0,
}: WrapperProps) => {
  return (
    <div
      className={cn(
        "mx-auto relative w-full flex-none",
        !backgroundColor && "bg-(--bases-cards-cover-background)",
      )}
      style={{
        aspectRatio: 1 / aspectRatio,
        backgroundColor,
        height: width * aspectRatio,
      }}
    >
      {children}
    </div>
  );
};

const PolaroidWrapper = ({
  aspectRatio = 1,
  backgroundColor,
  children,
}: WrapperProps) => {
  return (
    <div
      className={cn(
        "mx-auto relative w-full flex-none",
        !backgroundColor && "bg-(--bases-cards-cover-background)",
      )}
      style={{
        aspectRatio: 1 / aspectRatio,
        backgroundColor,
      }}
    >
      {children}
    </div>
  );
};

const WrappersByLayout: Record<CardLayout, ComponentType<WrapperProps>> = {
  horizontal: HorizontalWrapper,
  overlay: OverlayWrapper,
  polaroid: PolaroidWrapper,
  vertical: VerticalWrapper,
};

type Props = PropsWithChildren<{
  aspectRatio: number;
  backgroundColor?: string;
  layout: CardLayout;
  width?: number;
}>;

const PureMediaWrapper = ({
  aspectRatio,
  backgroundColor,
  children,
  layout,
  width,
}: Props) => {
  const Component = WrappersByLayout[layout];

  return (
    <Component
      aspectRatio={aspectRatio}
      backgroundColor={backgroundColor}
      width={width}
    >
      {children}
    </Component>
  );
};

const MediaWrapper = memo(PureMediaWrapper);

MediaWrapper.displayName = "MediaWrapper";

export default MediaWrapper;
