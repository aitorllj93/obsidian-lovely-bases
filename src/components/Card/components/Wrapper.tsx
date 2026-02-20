import { cva } from "class-variance-authority";
import type { ComponentProps, CSSProperties } from "react";

import {
  type CardLayout,
  FACETS_CONFIG_DEFAULTS,
  type FacetsConfig,
} from "@/components/Facets/config";
import { cn, isEven, isOdd } from "@/lib/utils";
import { getContentBackgroundColor } from "../helpers/get-colors";

const cardContentVariants = cva(
  "relative shadow-md overflow-hidden transition-all hover:shadow-lg cursor-pointer border group box-border flex h-full",
  {
    variants: {
      layout: {
        horizontal: "flex flex-row h-full bg-card border-border",
        vertical: "flex flex-col h-full bg-card border-border",
        overlay: "bg-card border-border",
        polaroid: "flex flex-col h-full",
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
      tilt: {
        none: "",
        alternating: "shadow-xl ease-out duration-300",
        left: "shadow-xl ease-out duration-300",
        right: "shadow-xl ease-out duration-300",
      },
    },
    compoundVariants: [
      {
        shape: "square",
        adaptToSize: false,
        class: "rounded",
      },
      {
        shape: "square",
        adaptToSize: true,
        class:
          "@[0px]/lovely-card:rounded-sm @6xs/lovely-card:rounded-md  @4xs/lovely-card:rounded",
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
        class:
          "@[0px]/lovely-card:border-4 @[0px]/lovely-card:border-b-10 @8xs/lovely-card:border-b-13 @7xs/lovely-card:border-b-15 @6xs/lovely-card:border-4 @6xs/lovely-card:border-b-16 @5xs/lovely-card:border-5 @5xs/lovely-card:border-b-17 @4xs/lovely-card:border-5 @4xs/lovely-card:border-b-18 @3xs/lovely-card:border-6 @3xs/lovely-card:border-b-20 @2xs/lovely-card:border-7 @2xs/lovely-card:border-b-22 @xs/lovely-card:border-8 @xs/lovely-card:border-b-24 @sm/lovely-card:border-10 @sm/lovely-card:border-b-28",
      },
    ],
    defaultVariants: {
      shape: FACETS_CONFIG_DEFAULTS.cardShape,
      layout: FACETS_CONFIG_DEFAULTS.cardLayout,
      withBgColor: false,
      adaptToSize: FACETS_CONFIG_DEFAULTS.cardAdaptToSize,
    },
  },
);

const cardContainerVariants = cva("relative flex", {
  variants: {
    cardLayout: {
      vertical: "h-full",
      horizontal: "h-full",
      polaroid: "h-full",
      overlay: "",
    },
    cardTilt: {
      none: "",
      clockwise: "[&>div]:rotate-3 hover:[&>div]:rotate-0",
      counterclockwise: "[&>div]:-rotate-2 hover:[&>div]:rotate-0",
      alternating: "",
    },
    odd: {
      true: "",
      false: "",
    },
    even: {
      true: "",
      false: "",
    },
  },
  defaultVariants: {
    cardLayout: "vertical",
    cardTilt: "none",
    odd: false,
    even: false,
  },
  compoundVariants: [
    {
      cardTilt: "alternating",
      odd: true,
      className: "[&>div]:-rotate-2 hover:[&>div]:rotate-0",
    },
    {
      cardTilt: "alternating",
      even: true,
      className: "[&>div]:rotate-3 hover:[&>div]:rotate-0",
    },
  ],
});

const getContainerStyles = (
  cardLayout: CardLayout,
  width: string | number,
  height?: string | number,
  style?: CSSProperties,
): CSSProperties => ({
  width,
  ...(cardLayout === "overlay" && { height }),
  ...style,
});

const getContentStyles = (
  cardLayout: CardLayout,
  backgroundColor: string | undefined,
  width: string | number,
  height?: string | number,
): CSSProperties => ({
  width,
  ...(cardLayout === "overlay" && { height }),
  ...(cardLayout === "polaroid"
    ? { backgroundColor, borderColor: backgroundColor }
    : undefined),
});

type Props = Pick<
  FacetsConfig,
  | "cardAdaptToSize"
  | "cardLayout"
  | "cardTilt"
  | "cardShape"
> & {
  accentColor?: string;
  active?: boolean;
  aspectRatio: number;
  contentClassName?: string;
  height: number;
  index: number;
  width: number;
} & ComponentProps<"div">;

const Wrapper = ({
  accentColor,
  aspectRatio,
  cardAdaptToSize,
  cardLayout,
  cardShape,
  cardTilt,
  children,
  className,
  contentClassName,
  height,
  index,
  style,
  width,
  ...props
}: Props) => {
  const backgroundColor = getContentBackgroundColor(accentColor, cardLayout);

  const containerClasses = cardContainerVariants({
    cardLayout,
    cardTilt,
    even: isEven(index),
    odd: isOdd(index),
  });
  const contentClasses = cardContentVariants({
    adaptToSize: cardAdaptToSize,
    layout: cardLayout,
    shape: cardShape,
    withBgColor: !backgroundColor,
  });

  const containerStyles = getContainerStyles(
    cardLayout,
    width,
    height,
    style,
  );
  const contentStyles = getContentStyles(
    cardLayout,
    backgroundColor,
    width,
    height,
  );

  return (
    <div
      data-testid="lovely-card-container"
      data-layout={cardLayout}
      className={cn("@container/lovely-card", containerClasses, className)}
      style={containerStyles}
      {...props}
    >
      <div
        className={cn(contentClassName, contentClasses)}
        style={contentStyles}
      >
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
