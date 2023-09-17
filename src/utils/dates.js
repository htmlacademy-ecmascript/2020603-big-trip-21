import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import { getRandomInt } from './common.js';

dayjs.extend(duration);
dayjs.extend(relativeTime);

function humanizeDate(date, dataFormat) {
  return date ? dayjs(date).format(dataFormat) : '';
}

function addLeadZero(time) {
  return time.toString().padStart(2, '0');
}

function getRandomDate() {
  const index = Boolean(getRandomInt(0, 1));

  if (index) {
    return dayjs()
      .add(getRandomInt(0, 7), 'day')
      .add(getRandomInt(1, 23), 'hour')
      .add(getRandomInt(1, 59), 'minute');
  }

  return dayjs().subtract(getRandomInt(0, 7), 'day');
}

function getPointDates() {
  const date1 = getRandomDate();
  const date2 = getRandomDate();

  if (!date2.isAfter(date1)) {
    return {
      dateFrom: date2.toISOString(),
      dateTo: date1.toISOString()
    };
  }

  return {
    dateFrom: date1.toISOString(),
    dateTo: date2.toISOString()
  };
}

function getPointDurationMessage(dateFrom, dateTo) {
  const startTime = dayjs(dateFrom);
  const endTime = dayjs(dateTo);
  const timeDiff = dayjs.duration(endTime.diff(startTime));
  const days = addLeadZero(timeDiff.days());
  const hours = addLeadZero(timeDiff.hours());
  const minutes = addLeadZero(timeDiff.minutes());

  let pointDurationMessage;

  if (days > 0) {
    pointDurationMessage = `${days}D ${hours}H ${minutes}M`;
  } else if (hours > 0) {
    pointDurationMessage = `${hours}H ${minutes}M`;
  } else {
    pointDurationMessage = `${minutes}M`;
  }

  return pointDurationMessage;
}

function isDatesEqual(dateA, dateB) {
  const pointDateA = dayjs(dateA).valueOf();
  const pointDateB = dayjs(dateB).valueOf();

  return (dateA === null && dateB === null) || (pointDateA === pointDateB);
}

export { getPointDates, humanizeDate, getPointDurationMessage, isDatesEqual };