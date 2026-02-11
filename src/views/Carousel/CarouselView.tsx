
import { useCardConfig } from "@/components/Card/hooks/use-card-config";
import type { CardConfig } from "@/components/Card/types";
import Carousel from "@/components/Carousel";
import { useGroupConfig } from "@/components/Group/hooks/use-group-config";
import type { GroupConfig } from "@/components/Group/types";
import { Container } from "@/components/Obsidian/Container";
import type { ReactBaseViewProps } from "@/types";

export type CarouselConfig = GroupConfig & CardConfig;

const CarouselView = ({ data, config, isEmbedded }: ReactBaseViewProps) => {
  const cardConfig = useCardConfig(config);
  const groupConfig = useGroupConfig(config);

  return (
    <Container isEmbedded={isEmbedded} style={{ overflowY: "auto" }}>
      {data.groupedData.map((group) => (
        <Carousel
          cardConfig={cardConfig}
          config={config}
          groupConfig={groupConfig}
          key={group.key?.toString() ?? ""}
          items={group.entries}
        />
      ))}
    </Container>
  );
};

export default CarouselView;
