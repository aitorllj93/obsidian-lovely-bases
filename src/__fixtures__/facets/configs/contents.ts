import { SANS_SERIF_FONTS } from "@/__fixtures__/typographies";
import type { ContentsConfigInput } from "@/components/Facets/config";


export const WithInnerContent: ContentsConfigInput = {
  contentPosition: "inside",
}

export const WithLayoutContent: ContentsConfigInput = {
  contentPosition: "layout",
}

export const WithContentVisibilityOnHover: ContentsConfigInput = {
  contentVisibility: "hover",
}

export const WithCustomContentFont: ContentsConfigInput = {
  contentFont: SANS_SERIF_FONTS,
}

export const WithPropertyTitles: ContentsConfigInput = {
  contentShowPropertyTitles: true,
}

export const WithoutPropertyTitles: ContentsConfigInput = {
  contentShowPropertyTitles: false,
}

export const WithMarkdownContent: ContentsConfigInput = {
  contentShowMarkdown: true,
  contentMarkdownMaxLength: 200,
  contentMarkdownMaxHeight: 60,
}

export const WithoutMarkdownContent: ContentsConfigInput = {
  contentShowMarkdown: false,
}
