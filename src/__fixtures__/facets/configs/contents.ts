import { SANS_SERIF_FONTS } from "@/__fixtures__/typographies";
import type { ContentsConfig } from "@/components/Facets/config";

export const WithContentVisibilityOnHover: Partial<ContentsConfig> = {
  contentVisibility: "hover",
}

export const WithCustomContentFont: Partial<ContentsConfig> = {
  contentFont: SANS_SERIF_FONTS,
}

export const WithPropertyTitles: Partial<ContentsConfig> = {
  contentShowPropertyTitles: true,
}

export const WithoutPropertyTitles: Partial<ContentsConfig> = {
  contentShowPropertyTitles: false,
}

export const WithMarkdownContent: Partial<ContentsConfig> = {
  contentShowMarkdown: true,
  contentMarkdownMaxLength: 200,
  contentMarkdownMaxHeight: 60,
}

export const WithoutMarkdownContent: Partial<ContentsConfig> = {
  contentShowMarkdown: false,
}
