import type { BasesEntry } from "obsidian";

import type { FacetsConfig } from "@/components/Facets/config";
import { useEntryPropertyValue } from "@/hooks/use-property";
import { darken, lighten, luminance } from "@/lib/colors";

import type { CardColors, CardImage } from "../types";

export function useCardColors(
  entry: BasesEntry,
  facetsConfig: FacetsConfig,
  image: CardImage
): CardColors {
  const { colorApplyTo, colorProperty, cardLayout } = facetsConfig;

  const backgroundColorValue = useEntryPropertyValue(entry, colorProperty);

  const imageBackground = colorApplyTo !== 'content' ?
    (image?.isColor ? image.url : backgroundColorValue) : null;
  const imageForeground = imageBackground ? (
    luminance(imageBackground) > 0.5 ?
      darken(imageBackground, 0.2) :
      lighten(imageBackground, 0.2)
  ) : null;
  if (cardLayout === 'overlay') {
    return {
      contentBackground: 'transparent',
      contentForeground: '#fff',
      imageBackground: imageBackground,
      imageForeground: imageForeground,
      linkForeground: '#e6e6e6',
      titleForeground: '#fff',
    }
  }

  let contentBackground = colorApplyTo !== 'image' && backgroundColorValue ?
    backgroundColorValue : null;

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
  ) : null;
  const contentForeground = contentBackground ? backgroundColorValue : null;

  return {
    contentBackground,
    contentForeground,
    imageBackground,
    imageForeground,
    linkForeground,
    titleForeground: linkForeground,
  }
}
