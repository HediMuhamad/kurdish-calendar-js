import { calendarIslamicDayNumber, calendarIslamicEpoch } from "./islamic";
import { calendarKurdishToPersian } from "./kurdish";
import {
  calendarPersianEpoch,
  calendarPersianLastDayOfMonth,
} from "./persian-utils";
import {
  calendarDayNumber,
  calendarExtractDay,
  calendarExtractMonth,
  calendarExtractYear,
  calendarSum,
  divAndFloor,
  mod,
} from "./utils";

export function calendarPersianToAbsolute(date: DateArray): number {
  let month = calendarExtractMonth(date),
    day = calendarExtractDay(date),
    year = calendarExtractYear(date);
  if (year < 0)
    return (
      calendarPersianToAbsolute([month, day, mod(year, 2820) + 1]) +
      1029983 * divAndFloor(year, 2820)
    );
  return (
    calendarPersianEpoch -
    1 +
    365 * (year - 1) +
    683 * divAndFloor(year + 2345, 2820) +
    186 * divAndFloor(mod(year + 2345, 2820), 768) +
    divAndFloor(683 * mod(mod(year + 2345, 2820), 768), 2820) +
    -568 +
    calendarSum(
      1,
      (idx) => idx < month,
      (idx) => calendarPersianLastDayOfMonth(idx, year)
    ) +
    day
  );
}

export function calendarJulianToAbsolute(date: DateArray): number {
  let month = calendarExtractMonth(date),
    year = calendarExtractYear(date);
  return (
    calendarDayNumber(date) +
    (mod(year, 100) == 0 && !(mod(year, 400) == 0) && month > 2 ? 1 : 0) +
    365 * (year - 1) +
    divAndFloor(year - 1, 4) -
    2
  );
}

export function calendarIslamicToAbsolute(date: DateArray): number {
  let month = calendarExtractMonth(date),
    day = calendarExtractDay(date),
    year = calendarExtractYear(date),
    y = mod(year, 30),
    leapYearsInCycle =
      y < 3
        ? 0
        : y < 6
        ? 1
        : y < 8
        ? 2
        : y < 11
        ? 3
        : y < 14
        ? 4
        : y < 17
        ? 5
        : y < 19
        ? 6
        : y < 22
        ? 7
        : y < 25
        ? 8
        : y < 27
        ? 9
        : 10;
  return (
    calendarIslamicDayNumber(date) +
    (year - 1) * 354 +
    11 * divAndFloor(year, 30) +
    leapYearsInCycle +
    (calendarIslamicEpoch - 1)
  );
}

export function calendarKurdishToAbsolutePersian(date: DateArray): number {
  return calendarPersianToAbsolute(calendarKurdishToPersian(date));
}
