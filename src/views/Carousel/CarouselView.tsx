import Card from "@/components/Card";
import Carousel from "@/components/Carousel";
import type { ReactBaseViewProps } from "@/types";

import { useEstimatedCardHeight } from "@/components/Card/hooks/use-estimated-height";
import { useConfigValue } from "@/hooks/use-config-value";
import { EntriesStoreProvider } from "@/contexts/entries-store";

const PADDING = 32;

const CarouselView = ({ data }: ReactBaseViewProps) => {
	const title = useConfigValue<string>("title");
	const subtitle = useConfigValue<string>("subtitle");
	const cardWidth = useConfigValue<number>("cardSize");
	const cardHeight = useEstimatedCardHeight(PADDING);

	return (
		<div
			className="lovely-bases"
			style={{ height: "100%", width: "100%", overflowY: "auto" }}
		>
      <EntriesStoreProvider initialEntries={data.data}>
        <Carousel
          title={title}
          subtitle={subtitle}
          items={data.data}
          component={Card}
          minItemWidth={cardWidth}
          minItemHeight={cardHeight}
        />
      </EntriesStoreProvider>
		</div>
	);
};

export default CarouselView;
