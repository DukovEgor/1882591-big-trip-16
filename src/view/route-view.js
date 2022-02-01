
import dayjs from 'dayjs';
import { howManyCities } from '../utils/utils.js';
import AbstractView from './absract-view.js';

const calcTotal = (arr) => {
  const initialValue = 0;
  return arr.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price + currentValue?.options?.reduce((acc, curVal) => acc + curVal?.price, initialValue),
    initialValue
  );
};

const showTripDuration = (arr) => {
  const firstDate = dayjs(arr[0].dateFrom).format('MMM D');
  const lastDate = arr.length > 1 ? dayjs(arr[arr.length - 1].dateTo).format('MMM D'): null;
  return `${firstDate}${lastDate !== null ? `&nbsp;&mdash;&nbsp;${dayjs(lastDate).isSame(dayjs(firstDate), 'M') ? dayjs(lastDate).format('D') : lastDate}` : ''}`;
};


const createRoute = (arr) => (
  `<section class="trip-main__trip-info  trip-info">
<div class="trip-info__main">
  <h1 class="trip-info__title">${howManyCities(arr)}</h1>

  <p class="trip-info__dates">${showTripDuration(arr)}</p>
</div>

<p class="trip-info__cost">
  Total: &euro;&nbsp;<span class="trip-info__cost-value">${calcTotal(arr)}</span>
</p>
</section>`);


export default class RouteView extends AbstractView{
  #cities = null;

  constructor(cities) {
    super();
    this.#cities = cities;
  }

  get template() {
    return createRoute(this.#cities);
  }
}
