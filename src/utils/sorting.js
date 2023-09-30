import { getDuration } from './dates';

export function compareByDateFrom(pointA, pointB) {
  return pointA.dateFrom - pointB.dateFrom;
}

export function compareByDateTo(pointA, pointB) {
  return pointA.dateTo - pointB.dateTo;
}

export function compareByDuration(pointA, pointB) {
  return getDuration(pointB.dateFrom, pointB.dateTo) - getDuration(pointA.dateFrom, pointA.dateTo);
}

export function compareByPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}
