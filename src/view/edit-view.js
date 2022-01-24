import { allCities, allOffers } from '../mock/point.js';
import SmartView from './smart-view.js';
const editPoint = (obj) => {
  const { type, reachPoint, price } = obj;
  const offer = allOffers.find((index) => index.type === type);
  const city = allCities.find((index) => index.name === reachPoint);

  const getOffer = (opt) => (
    `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${opt.id}" type="checkbox" name="event-offer-luggage">
    <label class="event__offer-label" for="event-offer-luggage-${opt.id}">
      <span class="event__offer-title">${opt.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${opt.price}</span>
    </label>
  </div>`
  );

  const getOffers = () => {
    if (offer.offers.length > 0) {
      return `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
      ${offer.offers.map((option) => getOffer(option)).join('')}
      </div>
    </section>`;
    }
    return '';
  };

  const getPhoto = (pic) => (`<img class="event__photo" src="${pic.src}" alt="${pic.description}"></img>`);

  const getPhotos = () => {
    if (city.pictures.length > 0) {
      return `<div class="event__photos-container">
      <div class="event__photos-tape">
      ${city.pictures.map((pic) => getPhoto(pic)).join('')}
      </div>
    </div>`;
    }
  };

  const getCities = () => allCities.map((index) => `<option value="${index.name}"></option>`).join('');

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>

          <div class="event__type-item">
            <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
            <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
            <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
            <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
            <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
            <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight">
            <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
            <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
            <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
          </div>

          <div class="event__type-item">
            <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
            <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
          </div>
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${reachPoint}" list="destination-list-1">
      <datalist id="destination-list-1" class="destlist">
      ${getCities()}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>
  <section class="event__details">
    ${getOffers()}
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${city.description}</p>
      ${getPhotos()}
    </section>
  </section>
</form>
</li>`;
};

export default class EditFormView extends SmartView {
  #point = null;

  constructor(point) {
    super();
    this._data = EditFormView.parsePointToData(point);

    this.#setInnerHandlers();
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditFormView.parseDataToPoint(this._data));
  }

  setExitClickHandler = (callback) => {
    this._callback.exitClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#exitClickHandler);
  }

  #exitClickHandler = () => {
    this._callback.exitClick();
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group').addEventListener('click', this.#typeChooserHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#cityChooserHandler);
  }

  #typeChooserHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    this._data.type = evt.target.value;
    this.updateData({
      type: this._data.type,
    });
  }

  #cityChooserHandler = (evt) => {
    this._data.reachPoint = evt.target.value;
    this.updateData({
      reachPoint: this._data.reachPoint,
    });
  }

  reset = (task) => {
    this.updateData(
      EditFormView.parsePointToData(task),
    );
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setExitClickHandler(this._callback.exitClick);
  }

  static parsePointToData = (point) => ({ ...point });

  static parseDataToPoint = (data) => {
    const point = { ...data };

    return point;
  }

  get template() {
    return editPoint(this._data);
  }
}
