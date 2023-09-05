import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Duration, MSEC_IN_DAY, MSEC_IN_HOUR } from '../const.js';
import { getRandomInt } from './common.js';

dayjs.extend(duration);
dayjs.extend(relativeTime);

function getDate({next}) {
  let date = dayjs().subtract(getRandomInt(0, Duration.DAY), 'day').toDate();
  const minsGap = getRandomInt(0, Duration.MIN);
  const hoursGap = getRandomInt(0, Duration.HOUR);
  const daysGap = getRandomInt(0, Duration.DAY);

  if (next) {
    date = dayjs()
      .add(minsGap, 'minute')
      .add(hoursGap, 'hour')
      .subtract(daysGap, 'day').toDate();
  }

  return date;
}

function humanizeDate(date, dateFormat) {
  return date ? dayjs(date).format(dateFormat) : '';
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

export { getDate, humanizeDate, getPointDuration };
