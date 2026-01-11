import { useConfigValue } from "@/hooks/use-config-value";
import { useEntryTitle } from "@/hooks/use-title";
import { cn } from "@/lib/utils";

type Props = {
	entryId: string;
};

const Title = ({ entryId }: Props) => {
	const title = useEntryTitle(entryId);
	const cardSize = useConfigValue<number>("cardSize", 400);
	const showTitle = useConfigValue<boolean>("showTitle", true);
	const textSize =
		cardSize < 300 ? "text-base" : cardSize < 400 ? "text-lg" : "text-xl";

	if (!showTitle) return null;

	return (
		<h3
			className={cn(
				"font-semibold mt-2 mb-0 line-clamp-1 p-(--input-padding) shrink-0",
				textSize,
			)}
		>
			{title}
		</h3>
	);
};

export default Title;
