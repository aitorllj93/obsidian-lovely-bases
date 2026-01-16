import { useMemo } from "react";

import type { Occurrence } from "../index";

export const SUPPORTED_VALUE_TYPES = ["boolean", "list", "string", "number"] as const;

export type TrackType = typeof SUPPORTED_VALUE_TYPES[number];

export const useHeatmapData = (
  data: Occurrence[],
  trackType?: TrackType,
): Occurrence[] => {
  return useMemo(() => {
    const withDateObj = data.map((item) => {
      const [year, month, day] = item.date.split("-").map(Number);
      const dateObj = new Date(year, month - 1, day);
      return { ...item, dateObj };
    });

    const aggregate = (existing: number, newValue: number): number => {
      switch (trackType) {
        case "boolean":
          return Math.max(existing, newValue);
        default:
          return existing + newValue;
      }
    };

    // Aggregate counts for same-day entries
    const aggregated = new Map<string, Occurrence>();

    for (const item of withDateObj) {
      const existing = aggregated.get(item.date);

      if (existing) {
        // Aggregate based on trackType strategy
        aggregated.set(item.date, {
          ...existing,
          count: aggregate(existing.count, item.count),
        });
      } else {
        aggregated.set(item.date, item);
      }
    }

    return Array.from(aggregated.values());
  }, [data, trackType]);
};
