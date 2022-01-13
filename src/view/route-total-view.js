
import { howManyCities } from '../utils/utils.js';
import AbstractView from './absract-view.js';

const calcTotal = (arr) => {
  const initialValue = 0;
  return arr.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    initialValue
  );
};


const createRoute = (arr) => (
  `<section class="trip-main__trip-info  trip-info">
<div class="trip-info__main">
  <h1 class="trip-info__title">${howManyCities(arr)}</h1>

  <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
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
