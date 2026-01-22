import { cn } from "@/lib/utils";
import type { EntryClickEventHandler } from "@/types";

import type { StackedEvent } from "./utils";
import LucideIcon from "../Obsidian/LucideIcon";

type Props = {
  event: StackedEvent;
  monthIndex: number;
  onEntryClick: EntryClickEventHandler;
};

export const EventBar = ({
  event,
  monthIndex,
  onEntryClick,
}: Props) => {
  const leftPercent = ((event.startDay - 1) / 31) * 100;
  const widthPercent = ((event.endDay - event.startDay + 1) / 31) * 100;
  const topPos = 4 + event.lane * 26; // 26px per lane (20px height + 6px gap)

  return (
    <div
      key={`${event.id}-${monthIndex}`}
      className={cn(
        "absolute h-[20px] rounded-sm text-[10px] text-white overflow-hidden whitespace-nowrap px-1 cursor-pointer hover:brightness-110 shadow-sm transition-all pt-0.5",
        !event.color && "bg-primary",
      )}
      style={{
        left: `${leftPercent}%`,
        width: `${widthPercent}%`,
        top: `${topPos}px`,
        backgroundColor: event.color,
      }}
      title={`${event.title} (${event.original.startDate.toLocaleDateString()} - ${event.original.endDate.toLocaleDateString()})`}
      onClick={(e) => {
        e.stopPropagation();
        onEntryClick(event.original.id, e);
      }}
    >
      {/* Show title if width is reasonably large */}
      {(event.icon || widthPercent > 3) ? (
        <span className="drop-shadow-md flex items-center">
        {event.icon && <LucideIcon name={event.icon} className="size-4 text-white inline-block mr-1" />}
          {widthPercent > 3 ?
            event.title :
            null}
        </span>
      ) : null}
    </div>
  );
};
