import type { CSSProperties } from "react";

import type { MediaFit } from "@/components/Facets/config";

export type ContentProps = {
  aspectRatio?: number | string;
  autoPlay?: boolean;
  className?: string;
  fit?: MediaFit;
  style?: CSSProperties;
  title?: string;
  url: string;
}
