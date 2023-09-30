import dayjs from 'dayjs';

export function getFormattedDate(date, dateFormat) {
  return date ? dayjs(date).format(dateFormat) : '';
}

export function getDuration(date1, date2) {
  const startDate = dayjs(date1);
  const endDate = dayjs(date2);
  return endDate.diff(startDate, 'minute');
}

export function isFutureDate(date) {
  return date && dayjs(date).isAfter(dayjs(), 'D');
}

export function isTodayDate(date) {
  return date && dayjs(date).isSame(dayjs(), 'D');
}

export function isPastDate(date) {
  return date && dayjs(date).isBefore(dayjs(), 'D');
}
