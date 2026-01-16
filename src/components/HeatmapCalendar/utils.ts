import { isHexColor } from "@/lib/colors";

export const COLOR_SCHEMES = {
  primary: [
    "bg-card",
    "bg-primary/10",
    "bg-primary/30",
    "bg-primary/50",
    "bg-primary/70",
    "bg-primary",
  ],
  semaphor: [
    "bg-card",
    "bg-palette-red",
    "bg-palette-orange",
    "bg-palette-yellow",
    "bg-palette-green",
    "bg-palette-cyan",
  ],
  red: [
    "bg-card",
    "bg-palette-red/10",
    "bg-palette-red/30",
    "bg-palette-red/50",
    "bg-palette-red/70",
    "bg-palette-red",
  ],
  orange: [
    "bg-card",
    "bg-palette-orange/10",
    "bg-palette-orange/30",
    "bg-palette-orange/50",
    "bg-palette-orange/70",
    "bg-palette-orange",
  ],
  yellow: [
    "bg-card",
    "bg-palette-yellow/10",
    "bg-palette-yellow/30",
    "bg-palette-yellow/50",
    "bg-palette-yellow/70",
    "bg-palette-yellow",
  ],
  green: [
    "bg-card",
    "bg-palette-green/10",
    "bg-palette-green/30",
    "bg-palette-green/50",
    "bg-palette-green/70",
    "bg-palette-green",
  ],
  cyan: [
    "bg-card",
    "bg-palette-cyan/10",
    "bg-palette-cyan/30",
    "bg-palette-cyan/50",
    "bg-palette-cyan/70",
    "bg-palette-cyan",
  ],
  blue: [
    "bg-card",
    "bg-palette-blue/10",
    "bg-palette-blue/30",
    "bg-palette-blue/50",
    "bg-palette-blue/70",
    "bg-palette-blue",
  ],
  purple: [
    "bg-card",
    "bg-palette-purple/10",
    "bg-palette-purple/30",
    "bg-palette-purple/50",
    "bg-palette-purple/70",
    "bg-palette-purple",
  ],
  magenta: [
    "bg-card",
    "bg-palette-magenta/10",
    "bg-palette-magenta/30",
    "bg-palette-magenta/50",
    "bg-palette-magenta/70",
    "bg-palette-magenta",
  ],
};

export const normalizeValue = (
  value: number,
  minValue: number,
  maxValue: number,
  steps: number,
): { normalizedIndex: number; isOverflow: boolean } => {
  if (value > maxValue) {
    return { normalizedIndex: steps - 1, isOverflow: true };
  }
  if (value <= minValue) {
    return { normalizedIndex: 0, isOverflow: false };
  }
  if (maxValue <= minValue) {
    return { normalizedIndex: value >= maxValue ? steps - 1 : 0, isOverflow: false };
  }
  const range = maxValue - minValue;
  const normalized = (value - minValue) / range;
  const index = Math.ceil(normalized * (steps - 1));
  return { normalizedIndex: index, isOverflow: false };
};

export const getCellStyle = (
  count: number,
  classNames: string[],
  minValue: number,
  maxValue: number,
  overflowColor?: string,
): { className: string; style?: React.CSSProperties; isOverflow: boolean } => {
  const { normalizedIndex, isOverflow } = normalizeValue(
    count,
    minValue,
    maxValue,
    classNames.length,
  );
  if (isOverflow && overflowColor) {
    return {
      className: "",
      style: { backgroundColor: overflowColor },
      isOverflow: true,
    };
  }
  const selectedClassName = classNames[normalizedIndex] || classNames[classNames.length - 1];
  const isHex = isHexColor(selectedClassName);
  return {
    className: isHex ? "" : selectedClassName,
    style: isHex ? { backgroundColor: selectedClassName } : undefined,
    isOverflow: false,
  };
};
