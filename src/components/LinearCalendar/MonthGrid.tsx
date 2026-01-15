import { cn } from "@/lib/utils";

type Props = {
  monthIndex: number;
  daysCount: number;
};

export const MonthGrid = ({ monthIndex, daysCount }: Props) => {
  return (
    <div className="absolute inset-0 flex w-full h-full pointer-events-none">
      {Array.from({ length: 31 }, (_, i) => {
        const day = i + 1;
        const isValidDay = day <= daysCount;
        return (
          <div
            key={`bg-${monthIndex}-${day}`}
            className={cn(
              "flex-1 min-w-[30px] border-l border-border/60 h-full",
              !isValidDay && "bg-muted/20",
            )}
          />
        );
      })}
    </div>
  );
};
