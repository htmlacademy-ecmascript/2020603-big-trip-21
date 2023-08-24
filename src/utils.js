import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

import { Duration } from './const.js';

const MSEC_IN_SEC = 1000;
const SEC_IN_MIN = 60;
const MIN_IN_HOUR = 60;
const HOUR_IN_DAY = 24;

const MSEC_IN_HOUR = MSEC_IN_SEC * SEC_IN_MIN * MIN_IN_HOUR;
const MSEC_IN_DAY = MSEC_IN_HOUR * HOUR_IN_DAY;

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInteger(a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
}

function formatStringToDateTime(date) {
  return dayjs(date).format('DD/MM/YY HH:mm');
}

function formatStringToShortDate(date) {
  return dayjs(date).format('MMM DD');
}

function formatStringToTime(date) {
  return dayjs(date).format('HH:mm');
}

function getPointDuration(dateFrom, dateTo) {
  const pointStartTime = dayjs(dateFrom);
  const pointEndTime = dayjs(dateTo);

  const timeDiff = pointEndTime.diff(pointStartTime);

  let pointDuration = 0;

  switch (true) {
    case (timeDiff <= 0):
      return 'WRONG DATE!';
    case (timeDiff >= MSEC_IN_DAY):
      pointDuration = dayjs.duration(timeDiff).format('DD[D] HH[H] mm[M]');
      break;
    case (timeDiff >= MSEC_IN_HOUR):
      pointDuration = dayjs.duration(timeDiff).format('HH[H] mm[M]');
      break;
    case (timeDiff < MSEC_IN_HOUR):
      pointDuration = dayjs.duration(timeDiff).format('mm[M]');
      break;
    default:
      break;
  }

  return pointDuration;
}

function getDate({ next }) {
  let date = dayjs().subtract(getRandomInteger(0, Duration.DAY), 'day').toDate();
  const minsGap = getRandomInteger(0, Duration.MIN);
  const hoursGap = getRandomInteger(0, Duration.HOUR);
  const daysGap = getRandomInteger(0, Duration.DAY);

  if (next) {
    date = dayjs()
      .add(minsGap, 'minute')
      .add(hoursGap, 'hour')
      .subtract(daysGap, 'day')
      .toDate();
  }

  return date;
}

export { getRandomArrayElement, getRandomInteger, getPointDuration, getDate, formatStringToDateTime, formatStringToTime, formatStringToShortDate };
