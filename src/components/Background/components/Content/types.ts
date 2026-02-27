import type { CSSProperties } from "react";

import type { MediaFit } from "@/components/Facets/config";

export type BackgroundProps = {
  aspectRatio?: number | string;
  autoPlay?: boolean;
  className?: string;
  fit?: MediaFit;
  style?: CSSProperties;
  title?: string;
  url: string;
}
