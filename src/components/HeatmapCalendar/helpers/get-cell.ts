import { isHexColor } from "@/lib/colors";

import { normalizeValue } from "../utils";

export type Cell = {
  className: string;
  index: number;
  isOverflow: boolean;
  style?: React.CSSProperties;
  title: string | undefined;
  value: number | undefined;
};

type GetCellParams = {
  colors: string[];
  maxValue: number;
  minValue: number;
  overflowColor?: string;
  value: number | undefined;
}

export const getCell = ({
  colors,
  maxValue,
  minValue,
  overflowColor,
  value,
}: GetCellParams): Cell => {
  if (value === undefined) {
    const isHex = isHexColor(colors[0]);
    return {
      className: isHex ? '' : colors[0],
      index: 0,
      isOverflow: false,
      style: isHex ? { backgroundColor: colors[0] } : undefined,
      title: value,
      value,
    }
  }

  const { normalizedIndex, isOverflow } = normalizeValue(
    value,
    minValue,
    maxValue,
    colors.length,
  );

  if (isOverflow && overflowColor) {
    return {
      index: normalizedIndex,
      className: "",
      style: { backgroundColor: overflowColor },
      isOverflow: true,
      title: value.toString(),
      value,
    };
  }

  const selectedColor = colors[normalizedIndex] || colors[colors.length - 1];
  const isHex = isHexColor(selectedColor);

  return {
    className: isHex ? "" : selectedColor,
    index: normalizedIndex,
    style: isHex ? { backgroundColor: selectedColor } : undefined,
    isOverflow: false,
    title: value.toString(),
    value,
  };
};
