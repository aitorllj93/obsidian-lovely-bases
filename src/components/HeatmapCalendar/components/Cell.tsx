import { cva } from "class-variance-authority";
import {
  forwardRef,
  type MouseEventHandler,
  memo,
  useMemo,
} from "react";

import { FORMATS, format } from "@/lib/date";
import { cn } from "@/lib/utils";

import type { CellShape } from "../config";
import { getCell } from "../helpers/get-cell";

const classVariants = cva("size-3 text-[0.5rem]/3 text-center", {
  variants: {
    shape: {
      circle: "rounded-full",
      rounded: "rounded-[4px]",
      square: "",
    },
    disabled: {
      true: "opacity-30",
      false: ""
    },
    clickable: {
      true: "cursor-pointer",
      false: ""
    }
  },
});

type Props = {
  colors: string[];
  contents?: string[];
  day?: Date;
  disabled?: boolean;
  maxValue: number;
  minValue: number;
  onClick?: MouseEventHandler;
  overflowColor: string | undefined;
  shape?: CellShape;
  value: number | undefined;
};

const PureCell = forwardRef<HTMLDivElement, Props>(({
  colors,
  contents,
  day,
  disabled,
  minValue,
  maxValue,
  onClick,
  overflowColor,
  shape,
  value
}, ref) => {
    const {
      className: cellClassName,
      index,
      isOverflow,
      style,
      title: valueTitle,
    } = useMemo(() => getCell({
      value,
      colors,
      minValue,
      maxValue,
      overflowColor,
    }), [value, colors, maxValue, minValue, overflowColor]);

    const content = contents?.[index] ?? '';

    const title = useMemo(() => day ?
      `${format(day, FORMATS.DATE_LONG)}: ${valueTitle}${isOverflow ? " (overflow)" : ""}` :
      `${valueTitle}${isOverflow ? " (overflow)" : ""}`,
      [day, valueTitle, isOverflow]
    );

    const className = cn(
      classVariants({
        clickable: !!onClick,
        disabled,
        shape
      }),
      cellClassName
    );

    return (
      <div
        ref={ref}
        className={className}
        onClick={onClick}
        style={style}
        title={title}
      >
        {content}
      </div>
    );
  },
);

const Cell = memo(PureCell, (prevProps, nextProps) =>
  prevProps.colors.every((c, i) => c === nextProps.colors[i]) &&
  prevProps.contents === nextProps.contents &&
  prevProps.day?.getTime() === nextProps.day?.getTime() &&
  prevProps.disabled === nextProps.disabled &&
  prevProps.maxValue === nextProps.maxValue &&
  prevProps.minValue === nextProps.minValue &&
  prevProps.onClick === nextProps.onClick &&
  prevProps.overflowColor === nextProps.overflowColor &&
  prevProps.shape === nextProps.shape &&
  prevProps.value === nextProps.value
);

export default Cell;
