import { TYPES } from './const';
import { getDiffTime } from './utils';

export const getStatsData = (points) => {
  const statsData = [];

  TYPES.forEach((type) => {
    const filteredByType = points.filter((point) => point.type === type);
    const price = filteredByType.slice().reduce((accumulator, index) => accumulator + index.price, 0);
    const count = filteredByType.length;
    const duration = filteredByType.slice().reduce((accamulator = 0, index) => accamulator + getDiffTime(index.dateFrom, index.dateTo), 0);
    statsData.push({'type': type, 'price': price, 'count': count, 'duration': duration});
  });

  return statsData;
};
