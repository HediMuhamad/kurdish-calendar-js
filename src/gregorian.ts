import {
  calendarDayNumber,
  calendarExtractYear,
  calendarLastDayOfMonth,
  divAndFloor,
  mod,
} from "./utils";

export function calendarAbsoluteFromGregorian(
  date: DateArray
): number | undefined {
  let year = calendarExtractYear(date),
    offsetYears;
  if (year == 0) {
    console.error("There was no year zero");
    return;
  } else if (year > 0) {
    offsetYears = year - 1;
    return (
      calendarDayNumber(date) +
      365 * offsetYears +
      divAndFloor(offsetYears, 4) +
      -divAndFloor(offsetYears, 100) +
      divAndFloor(offsetYears, 400)
    );
  }
  offsetYears = Math.abs(year + 1);
  return (
    calendarDayNumber(date) -
    365 * offsetYears -
    divAndFloor(offsetYears, 4) -
    -divAndFloor(offsetYears, 100) -
    divAndFloor(offsetYears, 400) -
    calendarDayNumber([12, 31, -1])
  );
}

export function calendarGregorianFromAbsolute(date: number): DateArray {
  let d0 = date - 1,
    n400 = divAndFloor(d0, 146097),
    d1 = mod(d0, 146097),
    n100 = divAndFloor(d1, 36524),
    d2 = mod(d1, 36524),
    n4 = divAndFloor(d2, 1461),
    d3 = mod(d2, 1461),
    n1 = divAndFloor(d3, 365),
    day = mod(d3, 365) + 1,
    year = 400 * n400 + 100 * n100 + n4 * 4 + n1,
    month = 1,
    mdays;
  if (n100 == 4 || n1 == 4) return [12, 31, year];

  year += 1;
  while ((mdays = calendarLastDayOfMonth(month, year)) < day) {
    day = day - mdays;
    month += 1;
  }
  return [month, day, year];
}
