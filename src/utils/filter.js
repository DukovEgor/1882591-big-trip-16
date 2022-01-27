import dayjs from 'dayjs';
import { FilterType } from './const';

const isPointInPast = (dateTo) => {
  dayjs().isAfter(dateTo, 'm');
};

const isPointInFuture = (dateFrom) => {
  dayjs().isBefore(dateFrom, 'm');
};

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointInFuture(point.dateFrom)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointInPast(point.dateTo)),
};
