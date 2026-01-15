import { useEffect, useState } from "react";

import type { Occurrence } from "../index";

export const useHeatmapData = (data: Occurrence[]) => {
  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);

  useEffect(() => {
    setOccurrences(
      data.map((item) => {
        const [year, month, day] = item.date.split("-").map(Number);
        const dateObj = new Date(year, month - 1, day);
        return { ...item, dateObj };
      }),
    );
  }, [data]);

  return occurrences;
};
