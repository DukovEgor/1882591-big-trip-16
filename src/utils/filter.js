import dayjs from 'dayjs';
import { FilterType } from './const';

// const isPointInPast = (dateTo) => {
//   dayjs().isAfter(dayjs(dateTo));
// };

// const isPointInFuture = (dateFrom) => {
//   dayjs().isBefore(dayjs(dateFrom));
// };

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => point.dateFrom >= dayjs()),
  [FilterType.PAST]: (points) => points.filter((point) => point.dateTo < dayjs()),
};
