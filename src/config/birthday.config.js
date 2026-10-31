/**
 * Centralized Birthday Configuration for POOJA
 *
 * NOTE: Strictly date-only. No birth year, age, or years-lived properties.
 */

export const birthdayConfig = {
  name: "POOJA",
  birthdayMonth: 11, // November
  birthdayDay: 1,    // 1st
  timezone: "Asia/Kolkata",
  displayDate: "1 NOVEMBER",
  displayDateShort: "1 NOV",
  greetingHeadline: "Happy Birthday POOJA",
  marqueeTitle: "NOW SHOWING",
  marqueeSub: "a celebration for POOJA, live November 1st",
  tickerText: "SAVE THE DATE · NOVEMBER 1 ·",
  doorsText: "doors open at midnight, IST"
};

const IST_OFFSET_MS = 5.5 * 3600 * 1000;

/**
 * Returns the timestamp for the next November 1 at 00:00:00 IST.
 * If today in IST is November 1, indicates isBirthdayToday = true.
 * If November 1 has passed in the current year, targets November 1 of the next year.
 */
export function getNextBirthdayIST(customNow) {
  const now = customNow ? new Date(customNow) : new Date();
  const istNow = new Date(now.getTime() + IST_OFFSET_MS);
  const currentYear = istNow.getUTCFullYear();

  // Nov 1 00:00:00 IST in UTC = Oct 31, 18:30:00 UTC
  const targetUtcThisYear = Date.UTC(currentYear, 9, 31, 18, 30, 0);
  // Nov 1 23:59:59 IST in UTC = Nov 1, 18:29:59 UTC
  const targetEndUtcThisYear = Date.UTC(currentYear, 10, 1, 18, 29, 59, 999);

  const nowMs = now.getTime();

  // If today is November 1 in IST
  if (nowMs >= targetUtcThisYear && nowMs <= targetEndUtcThisYear) {
    return {
      targetMs: targetUtcThisYear,
      isBirthdayToday: true,
      hasPassedThisYear: false
    };
  }

  // If before November 1 this year
  if (nowMs < targetUtcThisYear) {
    return {
      targetMs: targetUtcThisYear,
      isBirthdayToday: false,
      hasPassedThisYear: false
    };
  }

  // If after November 1 this year, target next year
  const targetUtcNextYear = Date.UTC(currentYear + 1, 9, 31, 18, 30, 0);
  return {
    targetMs: targetUtcNextYear,
    isBirthdayToday: false,
    hasPassedThisYear: true
  };
}

/**
 * Calculates remaining countdown parts without any negative values.
 */
export function getTimeUntilNextBirthday(customNow) {
  const { targetMs, isBirthdayToday } = getNextBirthdayIST(customNow);
  const nowMs = customNow ? new Date(customNow).getTime() : Date.now();

  if (isBirthdayToday) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      total: 0,
      isBirthdayToday: true
    };
  }

  const diff = Math.max(0, targetMs - nowMs);
  const totalSec = Math.floor(diff / 1000);

  return {
    total: totalSec,
    days: Math.floor(totalSec / 86400),
    hours: Math.floor((totalSec % 86400) / 3600),
    minutes: Math.floor((totalSec % 3600) / 60),
    seconds: totalSec % 60,
    isBirthdayToday: false
  };
}
