import { addDays, format, startOfWeek } from "@/lib/date";

export const DayLabels = () => {
  const firstDayOfWeek = startOfWeek(new Date());
  const dayLabels = Array.from({ length: 7 }, (_, i) =>
    format(addDays(firstDayOfWeek, i), "EEE"),
  );

  return (
    <div className="flex flex-col justify-between mt-5.5 mr-2">
      {dayLabels.map((day) => (
        <span key={`daylabel-${day}`} className="text-xs text-gray-500 h-3">
          {day}
        </span>
      ))}
    </div>
  );
};
