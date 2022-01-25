import dayjs from 'dayjs';

const howManyCities = (arr) => {
  if (arr.length === 1) {
    return `${arr[0].reachPoint}`;
  } else if (arr.length === 2) {
    return `${arr[0].reachPoint} &mdash; ${arr[1].reachPoint}`;
  }
  return `${arr[0].reachPoint} &mdash; ${arr.length > 3 ? '...' : arr[1].reachPoint} &mdash; ${arr[arr.length - 1].reachPoint}`;
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export const formatPointDueDate = (dueDate) => dueDate ? dayjs(dueDate).format('MMM D') : '';
export const formatPointTimes = (dueTime) => dueTime ? dayjs(dueTime).format('HH:mm') : '';


const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortByDay = (taskA, taskB) => {
  const weight = getWeightForNullDate(taskA.dateFrom, taskB.dateFrom);

  return weight ?? dayjs(taskA.dateFrom).diff(dayjs(taskB.dateFrom));
};

const sortByDayDown = (taskA, taskB) => {
  const weight = getWeightForNullDate(taskA.dateFrom, taskB.dateFrom);

  return weight ?? dayjs(taskB.dateFrom).diff(dayjs(taskA.dateFrom));
};

const sortByPrice = (a, b) => a.price - b.price;

const getDiffTime = (dateFrom, dateTo) => {
  const from = dayjs(dateFrom);
  const to = dayjs(dateTo);

  return to.diff(from);
};

const sortByTime = (firstPoint, secondPoint) => (dayjs(firstPoint.dateTo).unix() - dayjs(secondPoint.dateTo).unix()) - (dayjs(firstPoint.dateFrom).unix() - dayjs(secondPoint.dateFrom).unix());

export { howManyCities, updateItem, sortByDay, sortByDayDown, sortByPrice, sortByTime, getDiffTime };
