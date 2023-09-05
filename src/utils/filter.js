import dayjs from 'dayjs';
import { FilterType } from '../const';

const filter = {
  [FilterType.EVERYTHING]: (points) => [...points],
  [FilterType.FUTURE]: (points) => points.filter((item) => dayjs(item.dateFrom).isAfter(dayjs())),
  [FilterType.PAST]: (points) => points.filter((item) => dayjs(item.dateFrom).isBefore(dayjs())),
  [FilterType.PRESENT]: (points) => points.filter((item) => dayjs(item.dateFrom).isSame(dayjs())),
};

export { filter };
