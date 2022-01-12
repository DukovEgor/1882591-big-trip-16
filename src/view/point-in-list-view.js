import { createElement } from '../render.js';
const createPoint = (obj) => {
  const {type, reachPoint, options, price} = obj;
  return `<li class="trip-events__item">
   <div class="event">
     <time class="event__date" datetime="2019-03-18">MAR 18</time>
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
         <span class="event__offer-title">${options.offers[1].title}</span>
         +€&nbsp;
         <span class="event__offer-price">${options.offers[1].price}</span>
       </li>
     </ul>
     <button class="event__favorite-btn  event__favorite-btn--active" type="button">
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

export default class PointView {
  #element = null;
  #point = null;

  constructor(point) {
    this.#point = point;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createPoint(this.#point);
  }

  removeElement() {
    this.#element = null;
  }
}
