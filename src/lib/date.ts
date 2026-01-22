const moment = window.moment;

export const FORMATS = {
  DAY_OF_WEEK_SHORT: "ddd",
  MONTH_SHORT: "MMM",
  MONTH_LONG: "MMMM",
  DATE_LONG: "LL",
  DATE_ISO: "YYYY-MM-DD",
  YEAR: "YYYY",
};

export function addDays(date: Date, days: number) {
  return moment(date).add(days, "days").toDate();
}

export function addMonths(date: Date, months: number) {
  return moment(date).add(months, "months").toDate();
}

export function differenceInWeeks(date1: Date, date2: Date) {
  return moment(date1).diff(moment(date2), "weeks");
}

export function eachDayOfInterval(interval: {
  start: Date;
  end: Date;
}): Date[] {
  const days: Date[] = [];
  const current = moment(interval.start).startOf("day");
  const end = moment(interval.end).startOf("day");

  while (current.isSameOrBefore(end)) {
    days.push(current.toDate());
    current.add(1, "day");
  }

  return days;
}

export function endOfMonth(date: Date) {
  return moment(date).endOf("month").toDate();
}

export function endOfWeek(date: Date) {
  return moment(date).endOf("week").toDate();
}

export function format(date: Date, format: string) {
  return moment(date).format(format);
}

export function isSameDay(date1: Date, date2: Date) {
  return moment(date1).isSame(moment(date2), "day");
}

export function parse(dateString: string): Date | null {
  const parsed = moment(dateString, FORMATS.DATE_ISO, true);
  if (!parsed.isValid()) return null;
  return parsed.toDate();
}

export function startOfMonth(date: Date) {
  return moment(date).startOf("month").toDate();
}

export function startOfWeek(date: Date) {
  return moment(date).startOf("week").toDate();
}

export function startOfYear(date: Date) {
  return moment(date).startOf("year").toDate();
}

export function subDays(date: Date, days: number) {
  return moment(date).subtract(days, "days").toDate();
}

export function subYears(date: Date, years: number) {
  return moment(date).subtract(years, "years").toDate();
}


export function subWeeks(date: Date, weeks: number) {
  return moment(date).subtract(weeks, "weeks").toDate();
}

/**
 * Parse an ISO date string (YYYY-MM-DD) as a local date.
 * Using `new Date('YYYY-MM-DD')` parses as UTC, which can shift the date
 * by a day in timezones west of UTC. This function parses as local time.
 */
