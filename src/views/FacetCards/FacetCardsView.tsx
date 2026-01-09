import type {
	App,
	BasesEntry,
	BasesPropertyId,
	BasesViewConfig,
} from "obsidian";

import Card from "@/components/Card";
import { useItem } from "@/components/Card/hooks/use-item";
import type { ReactBaseViewProps } from "@/types";

export const FACET_CARDS_TYPE_ID = "facet-cards";

type FacetCardProps = {
	app: App;
	config: BasesViewConfig;
	containerEl: HTMLElement;
	entry: BasesEntry;
	facetCardsConfig: FacetCardsConfig;
};

type FacetCardsConfig = {
	layout: "horizontal" | "vertical";
	cardSize: number;
	imageProperty?: BasesPropertyId;
	imageFit: "cover" | "contain";
	imageAspectRatio: number;
	imageWidthPercent: number;
	showPropertyTitles: boolean;
	hoverProperty: {
		id: BasesPropertyId;
		displayName: string;
	} | null;
	hoverStyle: "overlay" | "tooltip" | "none";
	properties: {
		id: BasesPropertyId;
		displayName: string;
	}[];
};

const useFacetCardsConfig = (config: BasesViewConfig): FacetCardsConfig => {
	const layout = (config.get("layout") ?? "vertical") as
		| "horizontal"
		| "vertical";
	const cardSize = (config.get("cardSize") ?? 400) as number;
	const imageProperty = String(config.get("imageProperty")) as
		| BasesPropertyId
		| undefined;
	const imageFit = (config.get("imageFit") ?? "cover") as "cover" | "contain";
	const imageAspectRatio = (config.get("imageAspectRatio") ?? 1.5) as number;
	const imageWidthPercent = (config.get("imageWidthPercent") ?? 35) as number;
	const showPropertyTitles = (config.get("showPropertyTitles") ??
		true) as boolean;

	const hoverPropertyId = (config.get("hoverProperty") ??
		"") as BasesPropertyId;
	const hoverStyle = (config.get("hoverStyle") ?? "overlay") as
		| "overlay"
		| "tooltip"
		| "none";

	const properties = config.getOrder().map((prop) => ({
		id: prop,
		displayName: config.getDisplayName(prop) as string,
	}));
	const hoverProperty = hoverPropertyId
		? {
				id: hoverPropertyId,
				displayName: config.getDisplayName(hoverPropertyId) as string,
			}
		: null;

	return {
		layout,
		cardSize,
		imageProperty,
		imageFit,
		imageAspectRatio,
		imageWidthPercent,
		showPropertyTitles,
		hoverProperty,
		hoverStyle,
		properties,
	};
};

const FacetCard = ({
	app,
	config,
	containerEl,
	entry,
	facetCardsConfig,
}: FacetCardProps) => {
	const {
		layout,
		cardSize,
		imageProperty,
		imageFit,
		imageAspectRatio,
		imageWidthPercent,
		showPropertyTitles,
		hoverProperty,
		hoverStyle,
		properties,
	} = facetCardsConfig;

	const item = useItem({
		app,
		config,
		entry,
		propertiesToDisplay: properties,
		hoverPropertyDisplay: hoverProperty,
		imageProperty,
	});

	return (
		<Card
			layout={layout}
			item={item}
			cardSize={cardSize}
			imageFit={imageFit}
			imageAspectRatio={imageAspectRatio}
			imageWidthPercent={imageWidthPercent}
			showPropertyTitles={showPropertyTitles}
			hoverStyle={hoverStyle}
			app={app}
			containerEl={containerEl}
		/>
	);
};

const PADDING = 12;

const FacetCardsView = ({
	app,
	config,
	containerEl,
	data,
}: ReactBaseViewProps) => {
	const facetCardsConfig = useFacetCardsConfig(config);

	const cardSize = facetCardsConfig.cardSize - PADDING;

	return (
		<div className="lovely-bases" style={{ height: "100%", width: "100%", padding: 'var(--size-4-3)', overflowY: 'auto' }}>
			<div
				style={{
					columnWidth: `${cardSize}px`,
					columnGap: '12px',
				}}
			>
				{data.data.map((entry) => (
					<div
						key={entry.file.path}
						style={{
							breakInside: 'avoid',
							marginBottom: '12px',
						}}
					>
						<FacetCard
							app={app}
							config={config}
							containerEl={containerEl}
							entry={entry}
							facetCardsConfig={facetCardsConfig}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default FacetCardsView;
