import type { BasesEntry } from "obsidian";

import type { CardLayout, FacetsConfig } from "@/components/Facets/config";

import { darken, isHexColor, lighten, luminance } from "@/lib/colors";
import { getPropertyValue } from "@/lib/obsidian/entry";

type GetBaseColorParams = Pick<FacetsConfig,
  'colorProperty' |
  'mediaProperty'
>;

export const getAccentColor = (
  entry: BasesEntry,
  params: GetBaseColorParams,
): string|undefined => {
  if (params.colorProperty) {
    const propVal = getPropertyValue(entry, params.colorProperty);
    if (propVal && isHexColor(propVal)) {
      return propVal;
    }
  }

  if (params.mediaProperty) {
    const imageVal = getPropertyValue(entry, params.colorProperty);
    if (imageVal && isHexColor(imageVal)) {
      return imageVal;
    }
  }

  return undefined;
}

export const getForegroundColor = (
  backgroundColor: string
) => {
  return luminance(backgroundColor) > 0.5 ?
    darken(backgroundColor, 0.2) :
    lighten(backgroundColor, 0.2)
}

export const getContentBackgroundColor = (
  accentColor: string | undefined,
  cardLayout: CardLayout,
): string | undefined => {
  if (cardLayout === 'overlay') return 'transparent';
  if (!accentColor) return undefined;

  return luminance(accentColor) > 0.5 ?
    darken(accentColor, 0.2) :
    lighten(accentColor, 0.2);
}

export const getContentBorderColor = (
  accentColor: string | undefined,
  cardLayout: CardLayout
): string | undefined => {
  if (cardLayout === 'overlay') return 'transparent';
  if (!accentColor) return undefined;

  return luminance(accentColor) > 0.5 ?
    darken(accentColor, 0.1) :
    lighten(accentColor, 0.1)
}

export const getContentMutedColor = (
  accentColor: string | undefined,
  cardLayout: CardLayout
): string | undefined => {
  if (cardLayout === 'overlay') return '#e6e6e6';
  if (!accentColor) return undefined;

  return luminance(accentColor) > 0.5 ?
    darken(accentColor, 0.3) :
    lighten(accentColor, 0.3)
}
