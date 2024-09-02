export function divAndFloor(x: number, y: number): number {
  return Math.floor(x / y);
}

export function mod(x: number, y: number): number {
  const r = x % y;
  return y * r < 0 ? r + y : r;
}

export function calendarExtractMonth(date: DateArray): number {
  return date[0];
}

export function calendarExtractDay(date: DateArray): number {
  return date[1];
}

export function calendarExtractYear(date: DateArray): number {
  return date[2];
}

export function calendarUpdateYear(date: DateArray, year: number): DateArray {
  return [date[0], date[1], year];
}

export function calendarLeapYearP(year: number): boolean {
  if (year < 0) year = Math.abs(year) - 1;
  return mod(year, 4) == 0 && (!(mod(year, 100) == 0) || mod(year, 400) == 0);
}

export function calendarDayNumber(date: DateArray): number {
  let month = calendarExtractMonth(date),
    day = calendarExtractDay(date),
    year = calendarExtractYear(date),
    dayOfYear = day + 31 * (month - 1);
  if (month > 2) {
    dayOfYear = dayOfYear - divAndFloor(23 + month * 4, 10);
    if (calendarLeapYearP(year)) dayOfYear += 1;
  }
  return dayOfYear;
}

export function calendarSum(
  index: number,
  condition: (index: number) => boolean,
  expression: (index: number) => number
): number {
  let sum = 0;
  while (condition(index)) sum += expression(index++);
  return sum;
}

export function calendarLastDayOfMonth(month: number, year: number): number {
  if (month == 2 && calendarLeapYearP(year)) return 29;
  return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][--month];
}

export function calendarDayOfWeek(
  date: DateArray,
  absFunc = (date: DateArray) => 1
): number {
  /* With a slight modification to the original version:
         An additional argument for different calendars */
  return mod(absFunc(date) ?? 1, 7);
}
