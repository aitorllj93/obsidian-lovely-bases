import { format } from "date-fns";

export const DayLabels = () => {
  const dayLabels = Array.from({ length: 7 }, (_, i) =>
    format(new Date(2000, 0, i + 1), "EEE"),
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
