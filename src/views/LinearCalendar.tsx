import { BasesPropertyId } from "obsidian";
import { useMemo } from "react";
import { ReactViewProps } from "@/types";
import { LinearCalendar as LinearCalendarComponent, CalendarItem } from "@/components/LinearCalendar";

export const LINEAR_CALENDAR_TYPE_ID = 'linear-calendar';

type Config = {
    focus: 'Anual' | 'Semestral' | 'Trimestral';
    startDateProperty: BasesPropertyId;
    endDateProperty?: BasesPropertyId;
    date?: string;
}

const LinearCalendar = ({ app, config, data }: ReactViewProps) => {
    const focus = (config.get('focus') ?? 'Anual') as Config['focus'];
    const startDateProperty = config.get('startDateProperty') as Config['startDateProperty'];
    const endDateProperty = config.get('endDateProperty') as Config['endDateProperty'];
    const dateStr = config.get('date') as string;

    const referenceDate = useMemo(() => {
        if (dateStr) {
            const parsed = new Date(dateStr);
            if (!isNaN(parsed.getTime())) return parsed;
        }
        return new Date();
    }, [dateStr]);

    const items = useMemo(() => {
        if (!startDateProperty) return [];

        return data.groupedData.flatMap((group) => {
            return group.entries.map((entry) => {
                const startVal = entry.getValue(startDateProperty);
                if (!startVal) return null;

                const startDate = new Date(startVal.toString());
                if (isNaN(startDate.getTime())) return null;

                let endDate = startDate;
                if (endDateProperty) {
                    const endVal = entry.getValue(endDateProperty);
                    if (endVal) {
                        const parsedEnd = new Date(endVal.toString());
                        if (!isNaN(parsedEnd.getTime())) {
                            endDate = parsedEnd;
                        }
                    }
                }

                const color = entry.getValue('note.color')?.toString();

                return {
                    id: entry.file.path,
                    title: entry.file.basename,
                    file: entry.file,
                    startDate,
                    endDate,
                    color: color === 'null' ? undefined : color
                } as CalendarItem;
            }).filter(Boolean) as CalendarItem[];
        });
    }, [data, startDateProperty, endDateProperty]);

    const handleEventClick = (item: CalendarItem) => {
        app.workspace.openLinkText(item.file.path, '', false);
    };

    return (
        <LinearCalendarComponent
            items={items}
            focus={focus}
            referenceDate={referenceDate}
            onEventClick={handleEventClick}
        />
    );
};

export default LinearCalendar;
