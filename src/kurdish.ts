import {
  calendarAbsoluteFromGregorian,
  calendarGregorianFromAbsolute,
} from "./gregorian";
import { calendarIslamicFromAbsolute } from "./islamic";
import { calendarPersianFromAbsolute } from "./persian-utils";
import {
  calendarIslamicToAbsolute,
  calendarKurdishToAbsolutePersian,
} from "./to-absolute";
import {
  calendarDayOfWeek,
  calendarExtractYear,
  calendarUpdateYear,
} from "./utils";

/* Kurdish Calendar */
const calendarKurdishMonthNameArray = [
  "خاکەلێوە",
  "گوڵان",
  "جۆزەردان",
  "پووشپەڕ",
  "گەلاوێژ",
  "خەرمانان",
  "ڕەزبەر",
  "خەزەڵوەر",
  "سەرماوەز",
  "بەفرانبار",
  "ڕێبەندان",
  "ڕەشەمە",
];

const calendarKurdishDayNameArray = [
  "یەک‌شەممە",
  "دووشەممە",
  "سێ‌شەممە",
  "چوارشەممە",
  "پێنج‌شەممە",
  "هەینی",
  "شەممە",
];

export function calendarKurdishFromAbsolutePersian(date: number): DateArray {
  return calendarKurdishFromPersian(calendarPersianFromAbsolute(date));
}

export function calendarKurdishFromPersian(date: DateArray): DateArray {
  return calendarUpdateYear(date, calendarExtractYear(date) + 1321);
}

export function calendarKurdishToPersian(date: DateArray): DateArray {
  return calendarUpdateYear(date, calendarExtractYear(date) - 1321);
}

export function calendarKurdishFromGregorian(date: DateArray): DateArray {
  return calendarKurdishFromAbsolutePersian(
    calendarAbsoluteFromGregorian(date)!
  );
}

export function calendarKurdishToGregorian(date: DateArray): DateArray {
  return calendarGregorianFromAbsolute(calendarKurdishToAbsolutePersian(date));
}

export function calendarKurdishFromIslamic(date: DateArray): DateArray {
  return calendarKurdishFromAbsolutePersian(calendarIslamicToAbsolute(date));
}

export function calendarKurdishToIslamic(date: DateArray): DateArray {
  return calendarIslamicFromAbsolute(calendarKurdishToAbsolutePersian(date));
}

function calendarKurdishMonth(month: number): string {
  return calendarKurdishMonthNameArray[--month];
}

function calendarKurdishDayOfWeek(date: DateArray): number {
  return calendarDayOfWeek(date, calendarKurdishToAbsolutePersian);
}

function calendarKurdishDayOfWeekName(date: DateArray): string {
  return calendarKurdishDayNameArray[calendarKurdishDayOfWeek(date)];
}
