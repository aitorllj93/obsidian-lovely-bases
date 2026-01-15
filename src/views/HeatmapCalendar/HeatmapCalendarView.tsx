import type { BasesPropertyId } from "obsidian";
import { useMemo } from "react";

import { HeatmapCalendar, type Occurrence } from "@/components/HeatmapCalendar";
import { Container } from "@/components/Obsidian/Container";
import { useObsidian } from "@/components/Obsidian/Context";
import { useConfig } from "@/hooks/use-config";
import type { ReactBaseViewProps } from "@/types";
import type { COLOR_SCHEMES } from "@/components/HeatmapCalendar/utils";

export const HEATMAP_CALENDAR_TYPE_ID = "heatmap-calendar";

export type HeatmapCalendarConfig = {
	dateProperty: BasesPropertyId;
	trackProperty: BasesPropertyId;
  colorScheme?: keyof typeof COLOR_SCHEMES;
  reverseColors?: boolean;
	date?: string;
  weeks?: number;
};

const HeatmapCalendarView = ({ config, data, isEmbedded }: ReactBaseViewProps) => {
  const { app } = useObsidian();
  const viewConfig = useConfig<HeatmapCalendarConfig>(config, {
    dateProperty: undefined,
    trackProperty: undefined,
    colorScheme: 'primary',
    reverseColors: false,
    date: new Date().toISOString(),
    weeks: 53,
  });

	const referenceDate = useMemo(() => {
		if (viewConfig.date) {
			const parsed = new Date(viewConfig.date);
			if (!Number.isNaN(parsed.getTime())) return parsed;
		}
		return new Date();
	}, [viewConfig.date]);

	const groups = useMemo<
		{
			key: string;
			entries: Occurrence[];
		}[]
	>(() => {
		if (!viewConfig.dateProperty) return [];
    if (!viewConfig.trackProperty) return [];

		return data.groupedData.map((group) => {
			return {
				key: group.key?.toString() ?? "",
				entries: group.entries
					.map((entry) => {
						const dateValue = entry.getValue(viewConfig.dateProperty);
						const countValue = entry.getValue(viewConfig.trackProperty);

						if (!dateValue) return null;

						// Convert date value to ISO string format (YYYY-MM-DD)
						let date: string;
						if (dateValue instanceof Date) {
							// If it's already a Date object, format it as YYYY-MM-DD
							const year = dateValue.getFullYear();
							const month = String(dateValue.getMonth() + 1).padStart(2, "0");
							const day = String(dateValue.getDate()).padStart(2, "0");
							date = `${year}-${month}-${day}`;
						} else {
							// Try to parse as Date first to normalize, then format
							const dateObj = new Date(dateValue.toString());
							if (Number.isNaN(dateObj.getTime())) return null;
							const year = dateObj.getFullYear();
							const month = String(dateObj.getMonth() + 1).padStart(2, "0");
							const day = String(dateObj.getDate()).padStart(2, "0");
							date = `${year}-${month}-${day}`;
						}

						let count = countValue
							? Number.parseInt(countValue.toString(), 10)
							: 0;
						if (Number.isNaN(count)) {
							count = 0;
						}

						return {
							date,
							count,
							file: entry.file,
						};
					})
					.filter(Boolean) as Occurrence[],
			};
		});
	}, [data, viewConfig.dateProperty, viewConfig.trackProperty]);

	const handleEventClick = (item: Occurrence) => {
		app.workspace.openLinkText(item.file.path, "", false);
	};

	return (
    <Container isEmbedded={isEmbedded} style={{ userSelect: 'none' }}>
			{groups.map((g) => (
				<HeatmapCalendar
					key={g.key}
					colorScheme={viewConfig.colorScheme}
					reverseColors={viewConfig.reverseColors}
					data={g.entries}
					date={referenceDate}
          weeks={viewConfig.weeks}
					onClick={handleEventClick}
				/>
			))}
		</Container>
	);
};

export default HeatmapCalendarView;
