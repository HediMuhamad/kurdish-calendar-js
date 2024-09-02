import {
  calendarJulianToAbsolute,
  calendarPersianToAbsolute,
} from "./to-absolute";
import { calendarDayOfWeek, calendarSum, divAndFloor, mod } from "./utils";

export const calendarPersianEpoch: number = calendarJulianToAbsolute([
  3, 19, 622,
]);

function calendarPersianLeapYearP(year: number): boolean {
  return (
    mod(
      mod(mod(0 <= year ? year + 2346 : year + 2347, 2820), 768) * 683,
      2820
    ) < 683
  );
}

export function calendarPersianLastDayOfMonth(
  month: number,
  year: number
): number {
  if (month < 7) return 31;
  else if (month < 12 || calendarPersianLeapYearP(year)) return 30;
  return 29;
}

function calendarPersianYearFromAbsolute(date: number): number {
  let d0 = date - calendarPersianToAbsolute([1, 1, -2345]),
    n2820 = divAndFloor(d0, 1029983),
    d1 = mod(d0, 1029983),
    n768 = divAndFloor(d1, 280506),
    d2 = mod(d1, 280506),
    n1 = divAndFloor(2820 * (d2 + 366), 1029983),
    year = 2820 * n2820 + 768 * n768 + (d1 == 1029617 ? --n1 : n1) + -2345;
  return year < 1 ? --year : year;
}

export function calendarPersianFromAbsolute(date: number): DateArray {
  let year = calendarPersianYearFromAbsolute(date),
    month =
      1 +
      calendarSum(
        1,
        (idx) =>
          date >
          calendarPersianToAbsolute([
            idx,
            calendarPersianLastDayOfMonth(idx, year),
            year,
          ]),
        () => 1
      ),
    day = date - (calendarPersianToAbsolute([month, 1, year]) - 1);
  return [month, day, year];
}

export function calendarPersianDayOfWeek(date: DateArray): number {
  return calendarDayOfWeek(date, calendarPersianToAbsolute);
}
