import { HANDWRITTEN_FONTS } from "@/__fixtures__/typographies";
import type { TitlesConfigInput } from "@/components/Facets/config";

export const WithInnerTitle: TitlesConfigInput = {
  titlePosition: "inside",
}

export const WithOuterTitle: TitlesConfigInput = {
  titlePosition: "outside",
}

export const WithoutTitle: TitlesConfigInput = {
  titlePosition: "none",
}

export const WithCustomTitleFont: TitlesConfigInput = {
  titleFont: HANDWRITTEN_FONTS,
}

export const WithGroupTitle: TitlesConfigInput = {
  groupTitleProperty: "formula.groupTitle",
}

export const WithGroupSubtitle: TitlesConfigInput = {
  groupSubtitleProperty: "formula.groupSubtitle",
}
