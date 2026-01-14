import { cva } from "class-variance-authority";
import {
  type MouseEventHandler,
  memo,
  type PointerEventHandler,
  type ReactNode,
  useContext,
} from "react";

import { cn } from "@/lib/utils";

import { GridVariantContext } from "./contexts";

const gridItemStyles = cva(
  "overflow-hidden hover:cursor-pointer w-full h-full",
  {
    variants: {
      variant: {
        default: "rounded-sm",
        masonry: "rounded-sm",
        polaroid:
          "border-10 border-b-28 border-(--background-secondary) shadow-xl even:rotate-3 odd:-rotate-2 hover:rotate-0 transition-transform ease-out duration-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type Props = {
  children: ReactNode;
  className?: string;
  onPointerDown?: PointerEventHandler;
  onClick?: MouseEventHandler;
  onMouseOver?: MouseEventHandler;
  tabIndex?: number;
};
export const GridItem = memo(
  ({
    children,
    className,
    onPointerDown,
    onClick,
    onMouseOver,
    tabIndex,
  }: Props) => {
    const variant = useContext(GridVariantContext);

    return (
      <div
        className={cn(gridItemStyles({ variant }), className)}
        onPointerDown={onPointerDown}
        onClick={onClick}
        onMouseOver={onMouseOver}
        tabIndex={tabIndex}
      >
        {children}
      </div>
    );
  },
);

GridItem.displayName = "GridItem";
