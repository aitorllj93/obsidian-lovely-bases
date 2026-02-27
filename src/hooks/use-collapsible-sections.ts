import { useCallback, useState } from "react";

export const useCollapsibleSections = () => {
  const [collapsedSections, setCollapsedSectionKeys] = useState<Set<string>>(
    () => new Set(),
  );

  const toggleSectionCollapse = useCallback((key: string) => {
    setCollapsedSectionKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  return {
    collapsedSections,
    toggleSectionCollapse,
  }
}
