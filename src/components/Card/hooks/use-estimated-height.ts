
import { useConfigOrder } from "@/hooks/use-config-order";
import { useConfigValue } from "@/hooks/use-config-value";

import { DEFAULT_CARD_SIZE, DEFAULT_IMAGE_ASPECT_RATIO, DEFAULT_LAYOUT, DEFAULT_SHOW_PROPERTY_TITLES, DEFAULT_SHOW_TITLE } from "../constants";


const PADDING = 12;
// const CONTENT_PADDING = 32;

const TITLE_ESTIMATED_HEIGHT = 30;
const PROPERTY_TITLE_ESTIMATED_HEIGHT = 15;
const PROPERTY_VALUE_ESTIMATED_HEIGHT = 30;
// const TITLE_ESTIMATED_HEIGHT = 36;
// const PROPERTY_TITLE_ESTIMATED_HEIGHT = 20;
// const PROPERTY_VALUE_ESTIMATED_HEIGHT = 32;

export const useEstimatedCardHeight = (padding = PADDING): number => {
  const layout = useConfigValue<"horizontal" | "vertical">("layout", DEFAULT_LAYOUT);
  const imageAspectRatio = useConfigValue<number>("imageAspectRatio", DEFAULT_IMAGE_ASPECT_RATIO);
  const properties = useConfigOrder();
  const showPropertyTitles = useConfigValue<boolean>("showPropertyTitles", DEFAULT_SHOW_PROPERTY_TITLES);
  const showTitle = useConfigValue<boolean>("showTitle", DEFAULT_SHOW_TITLE);
  const cardSize = useConfigValue<number>("cardSize", DEFAULT_CARD_SIZE);

  let contentHeight = padding;

  if (showTitle) {
    contentHeight += TITLE_ESTIMATED_HEIGHT;
  }

  if (properties.length > 0) {
    let propertyHeight = PROPERTY_VALUE_ESTIMATED_HEIGHT;
    if (showPropertyTitles) {
      propertyHeight += PROPERTY_TITLE_ESTIMATED_HEIGHT;
    }
    contentHeight += propertyHeight * properties.length;
  }

  // On vertical, the image occupies the entire width and its height is proportional
  const verticalImageHeight = imageAspectRatio * cardSize;

  // On horizontal, the height is based on the content (the image adapts to the height)
   return layout === "horizontal"
    ? contentHeight
    : verticalImageHeight + contentHeight;
};
