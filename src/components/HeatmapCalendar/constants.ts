import type { ColorScheme, ContentScheme } from "./config/types";


export const MAX_WEEKS = 520;
export const MAX_DATE_RANGE_YEARS = 10;

export const COLOR_SCHEMES: Record<ColorScheme, string[]> = {
  primary: [
    "bg-background-secondary",
    "bg-primary/10",
    "bg-primary/30",
    "bg-primary/50",
    "bg-primary/70",
    "bg-primary",
  ],
  semaphor: [
    "bg-background-secondary",
    "bg-palette-red",
    "bg-palette-orange",
    "bg-palette-yellow",
    "bg-palette-green",
    "bg-palette-cyan",
  ],
  red: [
    "bg-background-secondary",
    "bg-palette-red/10",
    "bg-palette-red/30",
    "bg-palette-red/50",
    "bg-palette-red/70",
    "bg-palette-red",
  ],
  orange: [
    "bg-background-secondary",
    "bg-palette-orange/10",
    "bg-palette-orange/30",
    "bg-palette-orange/50",
    "bg-palette-orange/70",
    "bg-palette-orange",
  ],
  yellow: [
    "bg-background-secondary",
    "bg-palette-yellow/10",
    "bg-palette-yellow/30",
    "bg-palette-yellow/50",
    "bg-palette-yellow/70",
    "bg-palette-yellow",
  ],
  green: [
    "bg-background-secondary",
    "bg-palette-green/10",
    "bg-palette-green/30",
    "bg-palette-green/50",
    "bg-palette-green/70",
    "bg-palette-green",
  ],
  /** There's logic based on colors length, this is left in case there's no custom values. Useful for emojis as well */
  custom: [
    "bg-background-secondary",
    "",
    "",
    "",
    "",
    "",
  ],
  cyan: [
    "bg-background-secondary",
    "bg-palette-cyan/10",
    "bg-palette-cyan/30",
    "bg-palette-cyan/50",
    "bg-palette-cyan/70",
    "bg-palette-cyan",
  ],
  blue: [
    "bg-background-secondary",
    "bg-palette-blue/10",
    "bg-palette-blue/30",
    "bg-palette-blue/50",
    "bg-palette-blue/70",
    "bg-palette-blue",
  ],
  purple: [
    "bg-background-secondary",
    "bg-palette-purple/10",
    "bg-palette-purple/30",
    "bg-palette-purple/50",
    "bg-palette-purple/70",
    "bg-palette-purple",
  ],
  magenta: [
    "bg-background-secondary",
    "bg-palette-magenta/10",
    "bg-palette-magenta/30",
    "bg-palette-magenta/50",
    "bg-palette-magenta/70",
    "bg-palette-magenta",
  ],
};

export const CONTENT_SCHEMES: Record<ContentScheme, string[]> = {
  none: [],
  mood: [
    '',
    '😡',
    '😔',
    '😐',
    '🙂',
    '😄'
  ],
  food: [
    '',
    '🥦',
    '🥗',
    '🍱',
    '🍕',
    '🍔',
  ],
  tree: [
    '',
    '🌰',
    '🌱',
    '🌿',
    '🌳',
    '🌲',
  ],
  numerical: [
    '',
    '1',
    '2',
    '3',
    '4',
    '5'
  ],
  alphabetical: [
    '',
    'A',
    'B',
    'C',
    'D',
    'E'
  ]
}
