import { getCardConfig } from "@/components/Card/config/get-config";
import type { CardConfig } from "@/components/Card/types";
import type { ReactBaseViewProps } from "@/types";

import InfiniteDragScrollV2 from "@/components/InfiniteDragScrollV2";
import { Container } from "@/components/Obsidian/Container";

export const INFINITE_GALLERY_TYPE_ID = "infinite-gallery";

export type InfiniteGalleryConfig = CardConfig & {
  masonry?: boolean;
};

const InfiniteGalleryView = ({ config, data, isEmbedded }: ReactBaseViewProps) => {
  const cardConfig = getCardConfig(config);
  const masonry = (config.get("masonry") as boolean) ?? false;

  return (
    <Container isEmbedded={isEmbedded} embeddedStyle={{ height: "60vh", overflowY: "auto" }}>
      <InfiniteDragScrollV2
        items={data.data}
        cardConfig={cardConfig}
        config={config}
        masonry={masonry}
      />
    </Container>
  );
};

export default InfiniteGalleryView;
