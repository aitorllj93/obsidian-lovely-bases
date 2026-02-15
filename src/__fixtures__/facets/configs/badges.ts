import { MONOSPACE_FONTS } from "@/__fixtures__/typographies";
import type { BadgesConfigInput } from "@/components/Facets/config";

export const WithBadge: BadgesConfigInput = {
  badgeProperty: "formula.badge",
}

export const WithoutBadge: BadgesConfigInput = {
  badgeProperty: undefined,
}

export const WithCustomBadgeFont: BadgesConfigInput = {
  badgeFont: MONOSPACE_FONTS,
}

export const WithBadgeIcon: BadgesConfigInput = {
  badgeIconProperty: "formula.badgeIcon",
}

export const WithBadgeColor: BadgesConfigInput = {
  badgeColorProperty: "formula.badgeColor",
}

export const WithInnerCounter: BadgesConfigInput = {
  groupCounterPosition: "inside",
}

export const WithOuterCounter: BadgesConfigInput = {
  groupCounterPosition: "outside",
}

export const WithoutCounter: BadgesConfigInput = {
  groupCounterPosition: "none",
}
