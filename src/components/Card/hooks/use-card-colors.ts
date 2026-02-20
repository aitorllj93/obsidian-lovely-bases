import type { BasesEntry } from "obsidian";

import type { FacetsConfig } from "@/components/Facets/config";
import { useEntryPropertyValue } from "@/hooks/use-property";
import { darken, lighten, luminance } from "@/lib/colors";

import type { CardColors, CardMedia } from "../types";

export function useCardColors(
  entry: BasesEntry,
  facetsConfig: FacetsConfig,
  media?: CardMedia
): CardColors {
  const { colorApplyTo, colorProperty, cardLayout } = facetsConfig;

  const backgroundColorValue = useEntryPropertyValue(entry, colorProperty) ?? undefined;

  const mediaBackground = colorApplyTo !== 'content' ?
    (media?.type === 'color' ? (media.value ?? undefined) : backgroundColorValue) : undefined;
  const mediaForeground = mediaBackground ? (
    luminance(mediaBackground) > 0.5 ?
      darken(mediaBackground, 0.2) :
      lighten(mediaBackground, 0.2)
  ) : undefined;
  if (cardLayout === 'overlay') {
    return {
      contentBackground: 'transparent',
      contentForeground: '#fff',
      mediaBackground,
      mediaForeground,
      linkForeground: '#e6e6e6',
      titleForeground: '#fff',
    }
  }

  let contentBackground = colorApplyTo !== 'image' && backgroundColorValue ?
    backgroundColorValue : undefined;

  if (contentBackground) {
    if (luminance(contentBackground) > 0.5) {
      contentBackground = darken(contentBackground, 0.2)
    } else {
      contentBackground = lighten(contentBackground, 0.2)
    }
  }

  const linkForeground = contentBackground ? (
    luminance(contentBackground) > 0.5 ?
      darken(contentBackground, 0.3) :
      lighten(contentBackground, 0.3)
  ) : undefined;
  const contentForeground = contentBackground ? backgroundColorValue : undefined;

  return {
    contentBackground,
    contentForeground,
    mediaBackground,
    mediaForeground,
    linkForeground,
    titleForeground: linkForeground,
  }
}
