import type { BackgroundConfigInput } from "@/components/Facets/config";

export const WithActiveItemBackground: BackgroundConfigInput = {
  backgroundProperty: "formula.banner",
  backgroundInferFrom: "active",
}

export const WithFirstItemBackground: BackgroundConfigInput = {
  backgroundProperty: "formula.banner",
  backgroundInferFrom: "first-item",
}
