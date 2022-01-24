import { formatTaskDueDate } from '../utils/utils';
import AbstractView from './absract-view';

const createPoint = (obj) => {
  const {type, reachPoint, options, price, isFavorite, dueDate} = obj;
  const date = formatTaskDueDate(dueDate);

  return `<li class="trip-events__item">
   <div class="event">
     <time class="event__date" datetime="2019-03-18">${date}</time>
     <div class="event__type">
       <img class="event__type-icon" src="img/icons/${type}.png" alt="Event type icon" width="42" height="42">
     </div>
     <h3 class="event__title">${type} ${reachPoint}</h3>
     <div class="event__schedule">
       <p class="event__time">
         <time class="event__start-time" datetime="2019-03-18T14:30">14:30</time>
         —
         <time class="event__end-time" datetime="2019-03-18T16:05">16:05</time>
       </p>
       <p class="event__duration">01H 35M</p>
     </div>
     <p class="event__price">
       €&nbsp;<span class="event__price-value">${price}</span>
     </p>
     <h4 class="visually-hidden">Offers:</h4>
     <ul class="event__selected-offers">
       <li class="event__offer">
         <span class="event__offer-title">${options.offers[0].title}</span>
         +€&nbsp;
         <span class="event__offer-price">${options.offers[0].price}</span>
       </li>
       <li class="event__offer">
         <span class="event__offer-title">${options.offers[1].title}</span>
         +€&nbsp;
         <span class="event__offer-price">${options.offers[1].price}</span>
       </li>
     </ul>
     <button class="event__favorite-btn  ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
       <span class="visually-hidden">Add to favorite</span>
       <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
         <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
       </svg>
     </button>
     <button class="event__rollup-btn" type="button">
       <span class="visually-hidden">Open event</span>
     </button>
   </div>
 </li>`;
};

export default class PointView extends AbstractView{
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  get template() {
    return createPoint(this.#point);
  }
}
