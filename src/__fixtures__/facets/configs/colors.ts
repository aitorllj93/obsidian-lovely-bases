import type { ColorsConfigInput } from "@/components/Facets/config";

export const WithColor: ColorsConfigInput = {
  colorProperty: "formula.color",
}

export const WithColorAppliedToImage: ColorsConfigInput = {
  colorApplyTo: "image"
}

export const WithColorAppliedToContent: ColorsConfigInput = {
  colorApplyTo: "content"
}

export const WithColorAppliedEverywhere: ColorsConfigInput = {
  colorApplyTo: "both"
}
