import { cn } from "@/lib/utils";

type Props = {
  lines?: number;
};

const LINE_LENGTHS = {
  first: "w-1/6",
  even: "w-5/6",
  odd: "w-4/6",
};

const MarkdownSkeleton = ({ lines = 3 }: Props) => (
  <div className="flex flex-col gap-2 animate-pulse my-3.5">
    {Array.from({ length: lines }).map((_, index) => (
      <div
        key={index.toString()}
        className={cn(
          "h-3 bg-foreground/30 rounded",
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
