import type { BasesPropertyId, BasesViewConfig } from "obsidian";

import type { ReactBaseViewProps } from "@/types";

export const INFINITE_GALLERY_TYPE_ID = "infinite-gallery";

import InfiniteDragScroll from "@/components/InfiniteDragScroll";
import type { ItemConfig } from "@/components/InfiniteDragScroll/ItemContent";
import { Container } from "@/components/Obsidian/Container";

export type InfiniteGalleryConfig = ItemConfig & {
  layout: "default" | "masonry" | "polaroid";
};

const getConfig = (config: BasesViewConfig): InfiniteGalleryConfig => {
  return {
    imageProperty: config.get("imageProperty") as BasesPropertyId | undefined,
    imageFit: (config.get("imageFit") ?? "cover") as "cover" | "contain",
    cardSize: (config.get("cardSize") ?? 100) as number,
    aspectRatio: (config.get("aspectRatio") ?? 1.5) as number,
    shape: (config.get("shape") ?? "square") as "square" | "circle" | "rounded" | "squircle",
    layout: (config.get("layout") ?? "masonry") as "default" | "masonry" | "polaroid",
  };
};

const InfiniteGalleryView = ({ config, data, isEmbedded }: ReactBaseViewProps) => {
  const galleryConfig = getConfig(config);

  return (
    <Container isEmbedded={isEmbedded} embeddedStyles={{ height: "60vh", overflowY: "auto" }}>
      <InfiniteDragScroll
        items={data.data}
        itemConfig={galleryConfig}
        variant={galleryConfig.layout}
      />
    </Container>
  );
};

export default InfiniteGalleryView;
