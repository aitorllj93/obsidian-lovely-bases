import type { CSSProperties } from "react";

import type { ImageFit } from "@/components/Facets/config";

export type ContentProps = {
  aspectRatio?: number | string;
  autoPlay?: boolean;
  className?: string;
  fit?: ImageFit;
  style?: CSSProperties;
  title?: string;
  url: string;
}
