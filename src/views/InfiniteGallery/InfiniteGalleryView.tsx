
import type { BasesViewConfig } from "obsidian";

import { useCardConfig } from "@/components/Card/hooks/use-card-config";
import type { CardConfig } from "@/components/Card/types";
import InfiniteDragScrollV2 from "@/components/InfiniteDragScrollV2";
import { Container } from "@/components/Obsidian/Container";
import { useConfig } from "@/hooks/use-config";
import type { ReactBaseViewProps } from "@/types";

export const INFINITE_GALLERY_TYPE_ID = "infinite-gallery";

type LayoutConfig = {
  masonry?: boolean;
}

export type InfiniteGalleryConfig = LayoutConfig & CardConfig;

const useInfiniteGalleryConfig = (config: BasesViewConfig) => {
  const cardConfig = useCardConfig(config);
  const layoutConfig = useConfig<LayoutConfig>(config, {
    masonry: false,
  });
  return { ...cardConfig, ...layoutConfig };
};

const InfiniteGalleryView = ({ config, data, isEmbedded }: ReactBaseViewProps) => {
  const viewConfig = useInfiniteGalleryConfig(config);

  return (
    <Container isEmbedded={isEmbedded} embeddedStyle={{ height: "60vh", overflowY: "auto" }}>
      <InfiniteDragScrollV2
        items={data.data}
        cardConfig={viewConfig}
        config={config}
        masonry={viewConfig.masonry}
      />
    </Container>
  );
};

export default InfiniteGalleryView;
