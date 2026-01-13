import type { BasesPropertyId } from "obsidian";
import { useMemo } from "react";

import { HeatmapCalendar, type Occurrence } from "@/components/HeatmapCalendar";
import type { ReactBaseViewProps } from "@/types";

export const HEATMAP_CALENDAR_TYPE_ID = "heatmap-calendar";

export type HeatmapCalendarConfig = {
	dateProperty: BasesPropertyId;
	trackProperty: BasesPropertyId;
  colorScheme?: keyof typeof colors;
	date?: string;
};

const colors = {
	primary: [
		"bg-card",
		"bg-primary/10",
		"bg-primary/30",
		"bg-primary/50",
		"bg-primary/70",
		"bg-primary",
	],
	semaphor: [
		"bg-card",
		"bg-palette-red",
		"bg-palette-orange",
		"bg-palette-yellow",
		"bg-palette-green",
		"bg-palette-cyan",
	],
	red: [
		"bg-card",
		"bg-palette-red/10",
		"bg-palette-red/30",
		"bg-palette-red/50",
		"bg-palette-red/70",
		"bg-palette-red",
	],
	orange: [
		"bg-card",
		"bg-palette-orange/10",
		"bg-palette-orange/30",
		"bg-palette-orange/50",
		"bg-palette-orange/70",
		"bg-palette-orange",
	],
	yellow: [
		"bg-card",
		"bg-palette-yellow/10",
		"bg-palette-yellow/30",
		"bg-palette-yellow/50",
		"bg-palette-yellow/70",
		"bg-palette-yellow",
	],
	green: [
		"bg-card",
		"bg-palette-green/10",
		"bg-palette-green/30",
		"bg-palette-green/50",
		"bg-palette-green/70",
		"bg-palette-green",
	],
	cyan: [
		"bg-card",
		"bg-palette-cyan/10",
		"bg-palette-cyan/30",
		"bg-palette-cyan/50",
		"bg-palette-cyan/70",
		"bg-palette-cyan",
	],
	blue: [
		"bg-card",
		"bg-palette-blue/10",
		"bg-palette-blue/30",
		"bg-palette-blue/50",
		"bg-palette-blue/70",
		"bg-palette-blue",
	],
	purple: [
		"bg-card",
		"bg-palette-purple/10",
		"bg-palette-purple/30",
		"bg-palette-purple/50",
		"bg-palette-purple/70",
		"bg-palette-purple",
	],
	magenta: [
		"bg-card",
		"bg-palette-magenta/10",
		"bg-palette-magenta/30",
		"bg-palette-magenta/50",
		"bg-palette-magenta/70",
		"bg-palette-magenta",
	],
};

const HeatmapCalendarView = ({ app, config, data }: ReactBaseViewProps) => {
	const dateProperty = config.get("dateProperty") as HeatmapCalendarConfig["dateProperty"] | undefined;
	const trackProperty = config.get("trackProperty") as HeatmapCalendarConfig["trackProperty"] | undefined;
	const colorScheme = (config.get("colorScheme") ??
		"primary") as keyof typeof colors;
	const reverseColors = (config.get("reverseColors") ?? false) as boolean;
	const dateStr = config.get("date") as string;

	let classNames = colors[colorScheme] as string[];
	if (reverseColors) {
		// we need to keep the first color as bg-card and reverse the rest
		classNames = [classNames[0], ...classNames.slice(1).reverse()];
	}

	const referenceDate = useMemo(() => {
		if (dateStr) {
			const parsed = new Date(dateStr);
			if (!Number.isNaN(parsed.getTime())) return parsed;
		}
		return new Date();
	}, [dateStr]);

	const groups = useMemo<
		{
			key: string;
			entries: Occurrence[];
		}[]
	>(() => {
		if (!dateProperty) return [];
    if (!trackProperty) return [];

		return data.groupedData.map((group) => {
			return {
				key: group.key?.toString() ?? "",
				entries: group.entries
					.map((entry) => {
						const dateValue = entry.getValue(dateProperty);
						const countValue = entry.getValue(trackProperty);

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
	}, [data, dateProperty, trackProperty]);

	const handleEventClick = (item: Occurrence) => {
		app.workspace.openLinkText(item.file.path, "", false);
	};

	return (
		<div className="lovely-bases h-full w-full select-none">
			{groups.map((g) => (
				<HeatmapCalendar
					key={g.key}
					classNames={classNames}
					data={g.entries}
					date={referenceDate}
					onClick={handleEventClick}
				/>
			))}
		</div>
	);
};

export default HeatmapCalendarView;
