import type { IconsConfigInput } from "@/components/Facets/config";

export const WithIcon: IconsConfigInput = {
  iconProperty: "formula.icon",
}

export const WithFileExtensionIcons: IconsConfigInput = {
  iconFileExtensionAsFallback: true,
}

export const WithoutFileExtensionIcons: IconsConfigInput = {
  iconFileExtensionAsFallback: false,
}

export const WithGroupIcon: IconsConfigInput = {
  groupIconProperty: "formula.groupIcon",
}
