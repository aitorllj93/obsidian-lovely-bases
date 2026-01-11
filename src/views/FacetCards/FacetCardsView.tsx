
import Card from "@/components/Card";

import { DEFAULT_CARD_SIZE } from "@/components/Card/constants";
import { useEstimatedCardHeight } from "@/components/Card/hooks/use-estimated-height";
import VirtualGrid from "@/components/VirtualGrid";
import { EntriesStoreProvider } from "@/contexts/entries-store";
import { useConfigValue } from "@/hooks/use-config-value";
import type { ReactBaseViewProps } from "@/types";

export const FACET_CARDS_TYPE_ID = "facet-cards";

const PADDING = 12;

const FacetCardsView = ({ data, isEmbedded }: ReactBaseViewProps) => {
	const cardSize = useConfigValue<number>("cardSize", DEFAULT_CARD_SIZE);
	const estimatedRowHeight = useEstimatedCardHeight() + (PADDING * 2);

	return (
		<div
			className="lovely-bases"
			style={{
				height: "100%",
				width: "100%",
				overflowY: "auto",
				...(isEmbedded ? { maxHeight: "60vh" } : {}),
			}}
		>
      <EntriesStoreProvider initialEntries={data.data}>
        <VirtualGrid
          minItemWidth={cardSize}
          component={Card}
          items={data.data}
          estimateRowHeight={estimatedRowHeight}
        />
      </EntriesStoreProvider>
		</div>
	);
};

export default FacetCardsView;
