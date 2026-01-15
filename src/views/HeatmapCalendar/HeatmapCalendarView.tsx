import type { BasesPropertyId } from "obsidian";
import { useMemo } from "react";

import { HeatmapCalendar, type Occurrence } from "@/components/HeatmapCalendar";
import type { COLOR_SCHEMES } from "@/components/HeatmapCalendar/utils";
import { Container } from "@/components/Obsidian/Container";
import { useConfig } from "@/hooks/use-config";
import { subYears } from "@/lib/date";
import type { ReactBaseViewProps } from "@/types";

export const HEATMAP_CALENDAR_TYPE_ID = "heatmap-calendar";

export type HeatmapCalendarConfig = {
  dateProperty: BasesPropertyId;
  trackProperty: BasesPropertyId;
  colorScheme?: keyof typeof COLOR_SCHEMES;
  reverseColors?: boolean;
  startDate?: string;
  endDate?: string;
};

const HeatmapCalendarView = ({
  config,
  data,
  isEmbedded,
  onEntryClick,
}: ReactBaseViewProps) => {
  const viewConfig = useConfig<HeatmapCalendarConfig>(config, {
    dateProperty: undefined,
    trackProperty: undefined,
    colorScheme: "primary",
    reverseColors: false,
    startDate: subYears(new Date(), 1).toISOString(),
    endDate: new Date().toISOString(),
  });

  const startDate = useMemo(() => {
    if (viewConfig.startDate) {
      const parsed = new Date(viewConfig.startDate);
      if (!Number.isNaN(parsed.getTime())) return parsed;
    }
    return subYears(new Date(), 1);
  }, [viewConfig.startDate]);

  const endDate = useMemo(() => {
    if (viewConfig.endDate) {
      const parsed = new Date(viewConfig.endDate);
      if (!Number.isNaN(parsed.getTime())) return parsed;
    }
    return new Date();
  }, [viewConfig.endDate]);

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

  return (
    <Container isEmbedded={isEmbedded} style={{ userSelect: "none" }}>
      {groups.map((g) => (
        <HeatmapCalendar
          key={g.key}
          colorScheme={viewConfig.colorScheme}
          reverseColors={viewConfig.reverseColors}
          data={g.entries}
          startDate={startDate}
          endDate={endDate}
          onEntryClick={onEntryClick}
        />
      ))}
    </Container>
  );
};

export default HeatmapCalendarView;
