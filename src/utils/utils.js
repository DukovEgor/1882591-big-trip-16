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

export const formatTaskDueDate = (dueDate) => dueDate ? dayjs(dueDate).format('MMM D') : '';

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
  const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

  return weight ?? dayjs(taskA.dateFrom).diff(dayjs(taskB.dateFrom));
};

const sortByDayDown = (taskA, taskB) => {
  const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

  return weight ?? dayjs(taskB.dueDate).diff(dayjs(taskA.dueDate));
};

const sortByPrice = (a, b) => a.price - b.price;


export { howManyCities, updateItem, sortByDay, sortByDayDown, sortByPrice };
