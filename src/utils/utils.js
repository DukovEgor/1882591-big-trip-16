import dayjs from 'dayjs';

const MILIESECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = 3600;
const HOURS_IN_DAY = 24;
const CALCULUS_SYSTEM = 10;

const howManyCities = (arr) => {
  if (arr.length === 1) {
    return `${arr[0].reachPoint}`;
  } else if (arr.length === 2) {
    return `${arr[0].reachPoint} &mdash; ${arr[1].reachPoint}`;
  }
  return `${arr[0]?.reachPoint} &mdash; ${arr.length > 3 ? '...' : arr[1]?.reachPoint} &mdash; ${arr[arr.length - 1]?.reachPoint}`;
};


export const formatPointDueDate = (dueDate) => dueDate ? dayjs(dueDate).format('MMM D') : '';
export const formatPointTimes = (dueTime) => dueTime ? dayjs(dueTime).format('HH:mm') : '';


const getDiffTime = (dateFrom, dateTo) => {
  const from = dayjs(dateFrom);
  const to = dayjs(dateTo);
  return to.diff(from);
};

const humanizeTime = (n) => {
  const day = parseInt(n / (HOURS_IN_DAY * SECONDS_IN_HOUR), CALCULUS_SYSTEM);

  n = n % (HOURS_IN_DAY * SECONDS_IN_HOUR);
  const hour = parseInt(n / SECONDS_IN_HOUR, CALCULUS_SYSTEM);

  n %= SECONDS_IN_HOUR;
  const minutes = n / SECONDS_IN_MINUTE;
  return [day, hour, minutes.toFixed()];
};

const getDuration = (dateFrom, dateTo) => {
  const ms = getDiffTime(dateFrom, dateTo);
  const humanTimeFormat = humanizeTime(ms / MILIESECONDS_IN_SECOND);

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

const isDatesEqual = (dateA, dateB) => dayjs(dateA).isSame(dateB, 'm');
const isPricesEqual = (priceA, priceB) => priceA === priceB;
const isOffersEqual = (offersA, offersB) => offersA === offersB;

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

const sortByDay = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
};

const sortByPrice = (a, b) => b.price - a.price;

const sortByTime = (firstPoint, secondPoint) => (dayjs(secondPoint.dateTo) - dayjs(firstPoint.dateTo)) - (dayjs(secondPoint.dateFrom) - dayjs(firstPoint.dateFrom));

const sortByTypeCount = (a, b) => b.count - a.count;

const sortByDuration = (a, b) => b.duration - a.duration;

const offerToObject = (offer) => ({'id': Number(offer.id), 'title': offer.value, 'price': Number(offer.dataset.price)});

export { howManyCities, sortByDay, sortByPrice, sortByTime, sortByTypeCount, sortByDuration, getDiffTime, getDuration, isDatesEqual, isPricesEqual, isOffersEqual, humanizeTime, offerToObject };
