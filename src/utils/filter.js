import dayjs from 'dayjs';
import { FilterType } from '../const.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => [...points],
  [FilterType.FUTURE]: (points) => points.filter(
    (item) => dayjs().isBefore(dayjs(item.dateFrom))
  ),
  [FilterType.PAST]: (points) => points.filter(
    (item) => dayjs().isAfter(dayjs(item.dateTo))
  ),
  [FilterType.PRESENT]: (points) => points.filter(
    (item) => dayjs().isAfter(dayjs(item.dateFrom)) && dayjs().isBefore(dayjs(item.dateTo))
  )
};

export { filter };
