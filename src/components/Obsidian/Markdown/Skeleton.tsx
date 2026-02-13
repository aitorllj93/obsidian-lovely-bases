import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  lines?: number;
  style?: CSSProperties;
};

const LINE_LENGTHS = {
  first: "w-1/6",
  even: "w-5/6",
  odd: "w-4/6",
};

const MarkdownSkeleton = ({ className, lines = 3, style }: Props) => (
  <div className={cn("flex flex-col animate-pulse pt-2 box-border", className)}
    style={style}>
    {Array.from({ length: lines }).map((_, index) => (
      <div
        key={index.toString()}
        className={cn(
          "bg-foreground/30 rounded",
          index === 0
            ? LINE_LENGTHS.first
            : index % 2 === 0
              ? LINE_LENGTHS.even
              : LINE_LENGTHS.odd,
        )}
      />
    ))}
  </div>
);

export default MarkdownSkeleton;
