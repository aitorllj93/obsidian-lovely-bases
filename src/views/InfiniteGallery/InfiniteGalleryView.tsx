
import type { FacetsConfig } from "@/components/Facets/config";
import { useFacetsConfig } from "@/components/Facets/hooks/use-facets-config";
import InfiniteDragScrollV2 from "@/components/InfiniteDragScrollV2";
import { Container } from "@/components/Obsidian/Container";
import { useConfig } from "@/hooks/use-config";
import type { ReactBaseViewProps } from "@/types";

export const INFINITE_GALLERY_TYPE_ID = "infinite-gallery";

type LayoutConfig = {
  masonry?: boolean;
}

export type InfiniteGalleryConfig = LayoutConfig & FacetsConfig;

const InfiniteGalleryView = ({ config, data, isEmbedded }: ReactBaseViewProps) => {
  const facetsConfig = useFacetsConfig(config);
  const layoutConfig = useConfig<LayoutConfig>(config, {
    masonry: false,
  });

  return (
    <Container isEmbedded={isEmbedded} embeddedStyle={{ maxHeight: "100vh", overflowY: "auto" }}>
      <InfiniteDragScrollV2
        items={data.data}
        facetsConfig={facetsConfig}
        config={config}
        masonry={layoutConfig.masonry}
      />
    </Container>
  );
};

export default InfiniteGalleryView;
