

export const hexToRgba = (hex: string, alpha: number) => {
  let r: number, g: number, b: number;

  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const rgbaToHex = (input: string): string => {
  const match = input
    .replace(/\s+/g, "")
    .match(/^rgba?\(([^)]+)\)$/i);

  if (!match) {
    throw new Error("Formato RGB(A) inválido");
  }

  const parts = match[1].split(",");

  if (parts.length < 3 || parts.length > 4) {
    throw new Error("Número de componentes inválido");
  }

  const [r, g, b] = parts.slice(0, 3).map(Number);
  const a = parts[3] !== undefined ? Number(parts[3]) : undefined;

  const clamp = (v: number, max: number) =>
    Math.min(Math.max(v, 0), max);

  const toHex = (v: number) =>
    clamp(Math.round(v), 255).toString(16).padStart(2, "0");

  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

  if (a === undefined) return hex;

  const alpha = clamp(Math.round(a * 255), 255)
    .toString(16)
    .padStart(2, "0");

  return `${hex}${alpha}`;
}

export const rgbaChangeAlpha = (color: string, alpha: number) => {
  const colorFormat = color.startsWith("#") ? "hex" : color.startsWith("rgb") ? "rgba" : "color";
  if (colorFormat === "hex") {
    return rgbaToHex(hexToRgba(color, alpha));
  }
  return color;
}

export const linear = (color: string, lightness: number, deg = 135) => {
  return `linear-gradient(${deg}deg, ${color}, ${lighten(color, lightness)})`;
}

const ACCENT_VARS = [
  "--interactive-accent",
  "--accent",
  "--color-accent",
];

export const accent = (): string | null => {
  const container =
    document.querySelector(".app-container") ??
    document.body;

  const probe = document.createElement("div");
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";

  container.appendChild(probe);

  for (const v of ACCENT_VARS) {
    probe.style.color = `var(${v})`;
    const rgb = getComputedStyle(probe).color;
    if (rgb && rgb !== "rgba(0, 0, 0, 0)") {
      probe.remove();
      return rgbaToHex(rgb);
    }
  }

  probe.remove();

  return null;
}


export const gradientColors = (gradient: string): string[] => {
  return gradient.match(/#(?:[a-fA-F0-9]{8}|[a-fA-F0-9]{6})/g) ?? [];
};

// ---------- helpers ----------

export function clamp(v: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, v));
}

function parseColor(input: string) {
  input = input.trim();

  // HEX
  if (input.startsWith("#")) {
    let hex = input.slice(1);
    if (hex.length === 3 || hex.length === 4) {
      hex = hex.split("").map(c => c + c).join("");
    }

    const hasAlpha = hex.length === 8;
    const int = parseInt(hex, 16);

    const r = (int >> (hasAlpha ? 24 : 16)) & 255;
    const g = (int >> (hasAlpha ? 16 : 8)) & 255;
    const b = (int >> (hasAlpha ? 8 : 0)) & 255;
    const a = hasAlpha ? ((int & 255) / 255) : 1;

    return { r, g, b, a, format: "hex", hasAlpha };
  }

  // RGB / RGBA
  const m = input.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/
  );

  if (!m) throw new Error("Formato de color no soportado");

  return {
    r: +m[1],
    g: +m[2],
    b: +m[3],
    a: m[4] !== undefined ? +m[4] : 1,
    format: m[4] !== undefined ? "rgba" : "rgb"
  };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  let h = 0;
  if (d) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }

  const l = (max + min) / 2;
  const s = d ? d / (1 - Math.abs(2 * l - 1)) : 0;

  return { h: (h + 360) % 360, s, l };
}

function hslToRgb(h: number, s: number, l: number) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;

  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  };
}

function toHex(n: number): string {
  return Math.round(n).toString(16).padStart(2, "0");
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToRgb(hex: string): {
  r: number;
  g: number;
  b: number;
  a?: number;
} {
  if (!isHexColor(hex)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

	// Remove # if present
	const cleanHex = hex.replace(/^#/, "");

	// Handle 3-character hex codes (e.g., #fff -> #ffffff)
	if (cleanHex.length === 3) {
		const r = cleanHex[0];
		const g = cleanHex[1];
		const b = cleanHex[2];
		return {
			r: Number.parseInt(r + r, 16),
			g: Number.parseInt(g + g, 16),
			b: Number.parseInt(b + b, 16),
		};
	}

	// Handle 6-character hex codes
	const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
	if (!result) {
		throw new Error(`Invalid hex color: ${hex}`);
	}
	return {
		r: Number.parseInt(result[1], 16),
		g: Number.parseInt(result[2], 16),
		b: Number.parseInt(result[3], 16),
	};
};

function formatColor({ r, g, b, a, format, hasAlpha }: { r: number, g: number, b: number, a: number, format: string, hasAlpha: boolean }) {
  if (format === "hex") {
    const hex =
      ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
    if (!hasAlpha) return `#${hex}`;

    const alpha = Math.round(a * 255)
      .toString(16)
      .padStart(2, "0");

    return `#${hex}${alpha}`;
  }

  if (format === "rgb") {
    return `rgb(${r}, ${g}, ${b})`;
  }

  return `rgba(${r}, ${g}, ${b}, ${+a.toFixed(3)})`;
}

export function lighten(color: string, amount = 0.1) {
  const c = parseColor(color);
  const { h, s, l } = rgbToHsl(c.r, c.g, c.b);

  const rgb = hslToRgb(h, s, clamp(l + amount));
  return formatColor({ ...rgb, a: c.a, format: c.format, hasAlpha: c.hasAlpha });
}

export function darken(color: string, amount = 0.1) {
  const c = parseColor(color);
  const { h, s, l } = rgbToHsl(c.r, c.g, c.b);

  const rgb = hslToRgb(h, s, clamp(l - amount));
  return formatColor({ ...rgb, a: c.a, format: c.format, hasAlpha: c.hasAlpha });
}

export function desaturate(color, amount = 0.1) {
  const c = parseColor(color);
  const { h, s, l } = rgbToHsl(c.r, c.g, c.b);

  const rgb = hslToRgb(h, clamp(s * (1 - amount)), l);
  return formatColor({ ...rgb, a: c.a, format: c.format, hasAlpha: c.hasAlpha });
}

export function saturate(color, amount = 0.1) {
  const c = parseColor(color);
  const { h, s, l } = rgbToHsl(c.r, c.g, c.b);

  const rgb = hslToRgb(h, clamp(s * (1 + amount)), l);
  return formatColor({ ...rgb, a: c.a, format: c.format, hasAlpha: c.hasAlpha });
}

export function isHexColor(str: string): boolean {
  const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexColorRegex.test(str.trim());
}

export function interpolateColor (
	color1: string,
	color2: string,
	t: number,
): string {
  const { r: r1, g: g1, b: b1 } = hexToRgb(color1);
  const { r: r2, g: g2, b: b2 } = hexToRgb(color2);
  const r = r1 + (r2 - r1) * t;
  const g = g1 + (g2 - g1) * t;
  const b = b1 + (b2 - b1) * t;
  return rgbToHex(r, g, b);
}

export function generateColorScale(
	colors: string[],
	steps: number = 6,
): string[] {
	if (colors.length >= steps) return colors.slice(0, steps);

	if (colors.length === 1) {
		return generateColorScale(["#ebedf0", colors[0]], steps);
	}

	const result: string[] = [];
	for (let i = 0; i < steps; i++) {
		const position = i / (steps - 1);
		const colorIndex = position * (colors.length - 1);
		const lowerIndex = Math.floor(colorIndex);
		const upperIndex = Math.ceil(colorIndex);

		if (lowerIndex === upperIndex) {
			result.push(colors[lowerIndex]);
		} else {
			// Linear interpolation between colors
			const t = colorIndex - lowerIndex;
			result.push(interpolateColor(colors[lowerIndex], colors[upperIndex], t));
		}
	}
	return result;
};
