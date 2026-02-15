import Carousel from "@/components/Carousel";
import type { FacetsConfig } from "@/components/Facets/config";
import { useFacetsConfig } from "@/components/Facets/hooks/use-facets-config";
import { Container } from "@/components/Obsidian/Container";
import type { ReactBaseViewProps } from "@/types";

export type CarouselConfig = FacetsConfig;

const CarouselView = ({ data, config, isEmbedded }: ReactBaseViewProps) => {
  const facetsConfig = useFacetsConfig(config);

  return (
    <Container isEmbedded={isEmbedded} style={{ overflowY: "auto" }}>
      {data.groupedData.map((group) => (
        <Carousel
          groupKey={group.key?.toString() ?? ""}
          facetsConfig={facetsConfig}
          config={config}
          key={group.key?.toString() ?? ""}
          items={group.entries}
        />
      ))}
    </Container>
  );
};

export default CarouselView;
