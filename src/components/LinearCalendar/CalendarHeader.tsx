
type Props = {
  currentYear: number;
};

export const CalendarHeader = ({ currentYear }: Props) => {
  return (
    <div className="flex border-b border-border sticky top-0 z-10">
      <div className="w-32 shrink-0 font-bold p-2">{currentYear}</div>
      <div className="grow flex relative">
        {Array.from({ length: 31 }, (_, i) => (
          <div
            key={`day-${i.toString()}`}
            className="flex-1 text-center text-sm p-1 min-w-[30px] border-l border-border/80"
          >
            {String(i + 1).padStart(2, "0")}
          </div>
        ))}
      </div>
    </div>
  );
};
