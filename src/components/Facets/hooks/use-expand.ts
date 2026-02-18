import { useCallback, useRef, useState } from "react";

type ExpandState = "idle" | "pressing" | "expanded";

export const useExpand = () => {
  const [expandState, setExpandState] = useState<ExpandState>("idle");
  const originRectRef = useRef<DOMRect | null>(null);
  const scrollPositionRef = useRef<number>(0);

  const handlePointerDown = useCallback(() => {
    setExpandState((prev) => (prev === "idle" ? "pressing" : prev));
  }, []);

  const handlePointerUp = useCallback(() => {
    setExpandState((prev) => {
      // If we're pressing but didn't expand, reset to idle
      if (prev === "pressing") {
        return "idle";
      }
      return prev;
    });
  }, []);

  const handleExpand = useCallback(
    (e: React.MouseEvent|React.KeyboardEvent, cardRef: React.RefObject<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      // Capture origin rect for animation
      if (cardRef.current) {
        originRectRef.current = cardRef.current.getBoundingClientRect();
      }

      // Capture scroll position
      scrollPositionRef.current = window.scrollY;

      setExpandState("expanded");
    },
    [],
  );

  const handleClose = useCallback(() => {
    setExpandState("idle");
    // Restore scroll position after animation completes
    setTimeout(() => {
      window.scrollTo({
        top: scrollPositionRef.current,
        behavior: "instant",
      });
    }, 200); // Match collapse duration
  }, []);

  return {
    expandState,
    originRect: originRectRef.current,
    handlePointerDown,
    handlePointerUp,
    handleExpand,
    handleClose,
    isExpanded: expandState === "expanded",
    isPressing: expandState === "pressing",
  };
};
