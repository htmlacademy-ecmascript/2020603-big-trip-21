import { isFutureDate, isPastDate, isTodayDate } from './dates.js';

export function showAll(point) {
  return point;
}

export function showFuture(point) {
  return isFutureDate(point.dateFrom);
}

export function showPresent(point) {
  return (isPastDate(point.dateFrom) || isTodayDate(point.dateFrom)) && (isFutureDate(point.dateTo) || isTodayDate(point.dateTo));
}

export function showPast(point) {
  return isPastDate(point.dateTo);
}
