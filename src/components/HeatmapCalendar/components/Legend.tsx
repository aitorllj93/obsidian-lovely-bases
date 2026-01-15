import { cn } from "@/lib/utils";

type Props = {
  classNames: string[];
};

export const Legend = ({ classNames }: Props) => {
  return (
    <div className="mt-4 justify-center flex gap-2 text-xs items-center">
      <span>Less</span>
      {classNames.map((className, index) => (
        <div
          key={`color-${index.toString()}`}
          className={cn("w-3 h-3 rounded-[4px]", className)}
        />
      ))}
      <span>More</span>
    </div>
  );
};
