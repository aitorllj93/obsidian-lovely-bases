

export const COLOR_SCHEMES = {
  primary: [
    "oklch(from var(--primary) clamp(0, calc(l + 0.18), 1) calc(c * 0.55) h)",
    "oklch(from var(--primary) clamp(0, calc(l + 0.08), 1) calc(c * 0.80) h)",
    "oklch(from var(--primary) clamp(0, calc(l + 0.00), 1) calc(c * 1.00) h)",
    "oklch(from var(--primary) clamp(0, calc(l - 0.10), 1) calc(c * 0.95) h)",
    "oklch(from var(--primary) clamp(0, calc(l - 0.20), 1) calc(c * 0.85) h)",
  ],
  semaphor: [
    "var(--color-palette-cyan)",
    "var(--color-palette-green)",
    "var(--color-palette-yellow)",
    "var(--color-palette-orange)",
    "var(--color-palette-red)",
  ],
  rainbow: [
    "var(--color-palette-red)",
    "var(--color-palette-yellow)",
    "var(--color-palette-green)",
    "var(--color-palette-blue)",
    "var(--color-palette-purple)",
  ],
  contrast: [
    "var(--color-palette-blue)",
    "var(--color-palette-orange)",
    "var(--color-palette-green)",
    "var(--color-palette-red)",
    "var(--color-palette-purple)",
  ],
  red: [
    "oklch(from var(--color-palette-red) clamp(0, calc(l + 0.18), 1) calc(c * 0.55) h)",
    "oklch(from var(--color-palette-red) clamp(0, calc(l + 0.08), 1) calc(c * 0.80) h)",
    "oklch(from var(--color-palette-red) clamp(0, calc(l + 0.00), 1) calc(c * 1.00) h)",
    "oklch(from var(--color-palette-red) clamp(0, calc(l - 0.10), 1) calc(c * 0.95) h)",
    "oklch(from var(--color-palette-red) clamp(0, calc(l - 0.20), 1) calc(c * 0.85) h)",
  ],
  yellow: [
    "oklch(from var(--color-palette-yellow) clamp(0, calc(l + 0.18), 1) calc(c * 0.55) h)",
    "oklch(from var(--color-palette-yellow) clamp(0, calc(l + 0.08), 1) calc(c * 0.80) h)",
    "oklch(from var(--color-palette-yellow) clamp(0, calc(l + 0.00), 1) calc(c * 1.00) h)",
    "oklch(from var(--color-palette-yellow) clamp(0, calc(l - 0.10), 1) calc(c * 0.95) h)",
    "oklch(from var(--color-palette-yellow) clamp(0, calc(l - 0.20), 1) calc(c * 0.85) h)",
  ],
  green: [
    "oklch(from var(--color-palette-green) clamp(0, calc(l + 0.18), 1) calc(c * 0.55) h)",
    "oklch(from var(--color-palette-green) clamp(0, calc(l + 0.08), 1) calc(c * 0.80) h)",
    "oklch(from var(--color-palette-green) clamp(0, calc(l + 0.00), 1) calc(c * 1.00) h)",
    "oklch(from var(--color-palette-green) clamp(0, calc(l - 0.10), 1) calc(c * 0.95) h)",
    "oklch(from var(--color-palette-green) clamp(0, calc(l - 0.20), 1) calc(c * 0.85) h)",
  ],
  cyan: [
    "oklch(from var(--color-palette-cyan) clamp(0, calc(l + 0.18), 1) calc(c * 0.55) h)",
    "oklch(from var(--color-palette-cyan) clamp(0, calc(l + 0.08), 1) calc(c * 0.80) h)",
    "oklch(from var(--color-palette-cyan) clamp(0, calc(l + 0.00), 1) calc(c * 1.00) h)",
    "oklch(from var(--color-palette-cyan) clamp(0, calc(l - 0.10), 1) calc(c * 0.95) h)",
    "oklch(from var(--color-palette-cyan) clamp(0, calc(l - 0.20), 1) calc(c * 0.85) h)",
  ],
  blue: [
    "oklch(from var(--color-palette-blue) clamp(0, calc(l + 0.18), 1) calc(c * 0.55) h)",
    "oklch(from var(--color-palette-blue) clamp(0, calc(l + 0.08), 1) calc(c * 0.80) h)",
    "oklch(from var(--color-palette-blue) clamp(0, calc(l + 0.00), 1) calc(c * 1.00) h)",
    "oklch(from var(--color-palette-blue) clamp(0, calc(l - 0.10), 1) calc(c * 0.95) h)",
    "oklch(from var(--color-palette-blue) clamp(0, calc(l - 0.20), 1) calc(c * 0.85) h)",
  ],
  purple: [
    "oklch(from var(--color-palette-purple) clamp(0, calc(l + 0.18), 1) calc(c * 0.55) h)",
    "oklch(from var(--color-palette-purple) clamp(0, calc(l + 0.08), 1) calc(c * 0.80) h)",
    "oklch(from var(--color-palette-purple) clamp(0, calc(l + 0.00), 1) calc(c * 1.00) h)",
    "oklch(from var(--color-palette-purple) clamp(0, calc(l - 0.10), 1) calc(c * 0.95) h)",
    "oklch(from var(--color-palette-purple) clamp(0, calc(l - 0.20), 1) calc(c * 0.85) h)",
  ],
  magenta: [
    "oklch(from var(--color-palette-magenta) clamp(0, calc(l + 0.18), 1) calc(c * 0.55) h)",
    "oklch(from var(--color-palette-magenta) clamp(0, calc(l + 0.08), 1) calc(c * 0.80) h)",
    "oklch(from var(--color-palette-magenta) clamp(0, calc(l + 0.00), 1) calc(c * 1.00) h)",
    "oklch(from var(--color-palette-magenta) clamp(0, calc(l - 0.10), 1) calc(c * 0.95) h)",
    "oklch(from var(--color-palette-magenta) clamp(0, calc(l - 0.20), 1) calc(c * 0.85) h)",
  ],
};

export type ColorScheme = keyof typeof COLOR_SCHEMES;
