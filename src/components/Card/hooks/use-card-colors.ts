import type { BasesEntry } from "obsidian";

import { useEntryPropertyValue } from "@/hooks/use-property";
import { darken, lighten, luminance } from "@/lib/colors";

import type { CardColors, CardConfig, CardImage } from "../types";

export function useCardColors(
  entry: BasesEntry,
  cardConfig: CardConfig,
  image: CardImage
): CardColors {
  const { backgroundColorApplyTo, backgroundColorProperty, layout } = cardConfig;

  const backgroundColorValue = useEntryPropertyValue(entry, backgroundColorProperty);

  const imageBackground = backgroundColorApplyTo !== 'content' ?
    (image?.isColor ? image.url : backgroundColorValue) : null;
  const imageForeground = imageBackground ? (
    luminance(imageBackground) > 0.5 ?
      darken(imageBackground, 0.2) :
      lighten(imageBackground, 0.2)
  ) : null;
  if (layout === 'overlay') {
    return {
      contentBackground: 'transparent',
      contentForeground: '#fff',
      imageBackground: imageBackground,
      imageForeground: imageForeground,
      linkForeground: '#e6e6e6',
      titleForeground: '#fff',
    }
  }

  let contentBackground = backgroundColorApplyTo !== 'image' && backgroundColorValue ?
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
