import {
  calendarIslamicToAbsolute,
  calendarJulianToAbsolute,
} from "./to-absolute";
import {
  calendarDayOfWeek,
  calendarExtractDay,
  calendarExtractMonth,
  calendarSum,
  divAndFloor,
  mod,
} from "./utils";

export const calendarIslamicEpoch: number = calendarJulianToAbsolute([
  7, 16, 622,
]);

export function calendarIslamicLeapYearP(year: number): boolean {
  return (
    [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29].indexOf(mod(year, 30)) !== -1
  );
}

export function calendarIslamicDayNumber(date: DateArray): number {
  let month = calendarExtractMonth(date);
  return (
    30 * divAndFloor(month, 2) +
    29 * divAndFloor(month - 1, 2) +
    calendarExtractDay(date)
  );
}

function calendarIslamicLastDayOfMonth(month: number, year: number): number {
  if ([1, 3, 5, 7, 9, 11].indexOf(month) !== -1) return 30;
  else if ([2, 4, 6, 8, 10].indexOf(month) !== -1) return 29;
  return calendarIslamicLeapYearP(year) ? 30 : 29;
}

export function calendarIslamicFromAbsolute(date: number): DateArray {
  if (date < calendarIslamicEpoch) return [0, 0, 0];
  let approx = divAndFloor(date - calendarIslamicEpoch, 355),
    year =
      approx +
      calendarSum(
        approx,
        (idx) => date >= calendarIslamicToAbsolute([1, 1, idx + 1]),
        () => 1
      ),
    month =
      1 +
      calendarSum(
        1,
        (idx) =>
          date >
          calendarIslamicToAbsolute([
            idx,
            calendarIslamicLastDayOfMonth(idx, year),
            year,
          ]),
        () => 1
      ),
    day = date - (calendarIslamicToAbsolute([month, 1, year]) - 1);
  return [month, day, year];
}

export function calendarIslamicDayOfWeek(date: DateArray): number {
  return calendarDayOfWeek(date, calendarIslamicToAbsolute);
}
