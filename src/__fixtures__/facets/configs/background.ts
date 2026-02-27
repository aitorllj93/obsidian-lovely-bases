import type { BackgroundConfigInput } from "@/components/Facets/config";

export const WithActiveItemBackground: BackgroundConfigInput = {
  backgroundProperty: "formula.banner",
  backgroundInferFrom: "active",
}

export const WithFirstItemBackground: BackgroundConfigInput = {
  backgroundProperty: "formula.banner",
  backgroundInferFrom: "first-item",
}

export const WithStaticBackground: BackgroundConfigInput = {
  backgroundProperty: "formula.background",
  backgroundInferFrom: "first-item",
  backgroundGradient: "light"
}

export const WithDarkGradientBackground: BackgroundConfigInput = {
  backgroundGradient: 'dark',
}

export const WithLightGradientBackground: BackgroundConfigInput = {
  backgroundGradient: 'light',
}

export const WithNoGradientBackground: BackgroundConfigInput = {
  backgroundGradient: 'none',
}
