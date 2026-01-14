import { ThreeDCarousel } from "@/components/3DCarousel";
import { Container } from "@/components/Obsidian/Container";
import type { ReactBaseViewProps } from "@/types";

const MIN_ITEMS = 3;
const MAX_ITEMS = 14;

const ThreeDCarouselView = ({ data, isEmbedded }: ReactBaseViewProps) => {
	return (
		<Container
      isEmbedded={isEmbedded}
		>
			{data.data.length >= MIN_ITEMS ? (
				<ThreeDCarousel items={data.data.slice(0, MAX_ITEMS)} />
			) : (
				<div>Not enough items</div>
			)}
		</Container>
	);
};

export default ThreeDCarouselView;
