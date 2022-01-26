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


const getDiffTime = (dateFrom, dateTo) => {
  const from = dayjs(dateFrom);
  const to = dayjs(dateTo);

  return to.diff(from);
};

const humanizeTime = (n) => {
  const day = parseInt(n / (24 * 3600), 10);

  n = n % (24 * 3600);
  const hour = parseInt(n / 3600, 10);

  n %= 3600;
  const minutes = n / 60;
  return [day, hour, minutes.toFixed()];
};

const getDuration = (dateFrom, dateTo) => {
  const ms = getDiffTime(dateFrom, dateTo);
  const humanTimeFormat = humanizeTime(ms / 1000);

  let days = '';
  let hours = '';
  let minutes = `${humanTimeFormat[2]}M`;

  if (humanTimeFormat[0] !== 0) {
    days = `${humanTimeFormat[0] < 10 ? '0' : ''}${humanTimeFormat[0]}D`;
  }


  if (humanTimeFormat[1] === 0 && days !== '') {
    hours = '00H';
  }

  if (humanTimeFormat[1] !== 0) {
    hours = `${humanTimeFormat[1] < 10 ? '0' : ''}${humanTimeFormat[1]}H`;
  }

  minutes = `${humanTimeFormat[2] < 10 ? '0' : ''}${humanTimeFormat[2]}M`;

  return `${days} ${hours} ${minutes}`;
};


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


const sortByTime = (firstPoint, secondPoint) => (dayjs(firstPoint.dateTo) - dayjs(secondPoint.dateTo)) - (dayjs(firstPoint.dateFrom) - dayjs(secondPoint.dateFrom));

export { howManyCities, updateItem, sortByDay, sortByDayDown, sortByPrice, sortByTime, getDiffTime, getDuration };
