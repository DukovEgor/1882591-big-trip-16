import SmartView from './smart-view.js';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import he from 'he';
import { offerToObject } from '../utils/utils.js';
import { TYPES, TYPES_LABELS } from '../utils/const.js';

const editPoint = (obj, isNew, destinations, offers) => {
  const { type, reachPoint, price, dateFrom, dateTo, options, isDisabled, isSaving, isDeleting } = obj;

  const offersForType = offers.find((index) => index.type === type);

  const destinationForCity = destinations.find((index) => index.name === reachPoint);

  const getOffer = (opt) => (
    `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="${opt.id}" type="checkbox" value="${opt.title}" data-price="${opt.price}" name="event-offer-luggage" ${options && options.length > 0 ? `${options.find((el) => el.id === opt.id)?.id === opt.id ? 'checked' : ''}` : ''} ${isDisabled || isSaving || isDeleting ? 'disabled' : ''}>
    <label class="event__offer-label" for="${opt.id}">
      <span class="event__offer-title">${opt.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${opt.price}</span>
    </label>
  </div>`
  );

  const getOffers = () => {
    if (offersForType.offers?.length > 0) {
      return `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
      ${offersForType.offers.map((offer) => getOffer(offer)).join('')}
      </div>
    </section>`;
    }
    return '';
  };

  const getPhoto = (pic) => (`<img class="event__photo" src="${pic.src}" alt="${pic.description}"></img>`);

  const getPhotos = () => {
    if (destinationForCity.pictures?.length > 0) {
      return `<div class="event__photos-container">
      <div class="event__photos-tape">
      ${destinationForCity.pictures.map((pic) => getPhoto(pic)).join('')}
      </div>
    </div>`;
    }
    return '';
  };

  const getCities = () => destinations.map((index) => `<option value="${index.name}"></option>`).join('');

  const getDestinationSection = () => {
    if (destinationForCity?.pictures || destinationForCity?.description) {
      return `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destinationForCity.description ? destinationForCity.description : ''}</p>
      ${getPhotos()}
    </section>`;
    }
    return '';
  };

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post" ${isDisabled || isSaving || isDeleting ? 'disabled' : ''}>
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled || isSaving || isDeleting ? 'disabled' : ''}>

      <div class="event__type-list">
        <fieldset class="event__type-group" ${isDisabled || isSaving || isDeleting ? 'disabled' : ''}>
          <legend class="visually-hidden">Event type</legend>
          ${TYPES.map((typeName) => `<div class="event__type-item">
          <input id="event-type-${typeName}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeName}" ${typeName === type ? 'checked' : ''} ${isDisabled || isSaving || isDeleting ? 'disabled' : ''}>
          <label class="event__type-label  event__type-label--${typeName}" for="event-type-${typeName}-1">${TYPES_LABELS[String(typeName)]}</label>
        </div>`).join('')}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(reachPoint)}" list="destination-list-1" required ${isDisabled || isSaving || isDeleting ? 'disabled' : ''}>
      <datalist id="destination-list-1" class="destlist" ${isDisabled || isSaving || isDeleting ? 'disabled' : ''}>
      ${getCities()}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time event__input--time-from" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom}" ${isDisabled || isSaving || isDeleting ? 'disabled' : ''}>
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time event__input--time-to" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo}" ${isDisabled || isSaving || isDeleting ? 'disabled' : ''}>
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="number" min="1" name="event-price" value="${he.encode(String(price))}" ${isDisabled || isSaving || isDeleting ? 'disabled' : ''}>
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled || isSaving || isDeleting ? 'disabled' : ''}>${isSaving ? 'Saving' : 'Save'}</button>
    <button class="event__reset-btn" type="reset" ${isDisabled || isSaving || isDeleting ? 'disabled' : ''}>${isNew ? 'Cancel' : `${isDeleting ? 'Deleting' : 'Delete'}`}</button>
${isNew ? '' : `<button class="event__rollup-btn" type="button">
<span class="visually-hidden">Open event</span>
</button>`}
  </header>
  <section class="event__details">
    ${getOffers()}
    ${getDestinationSection()}
    </section>
  </section>
</form>
</li>`;
};

export default class EditFormView extends SmartView {
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor(point, isNew = false, destinations, offers) {
    super();
    this._data = EditFormView.parsePointToData(point);
    this._isNew = isNew;
    this._destinations = destinations;
    this._offers = offers;

    this.#setInnerHandlers();
    this.#setDatepicker();
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditFormView.parseDataToPoint(this._data));
  }

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  }

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(EditFormView.parseDataToPoint(this._data));
  }

  setExitClickHandler = (callback) => {
    this._callback.exitClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#exitClickHandler);
  }

  #exitClickHandler = () => {
    this._callback.exitClick();
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceEnterHandler);
    this.element.querySelector('.event__type-group').addEventListener('click', this.#typeChooserHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#cityChooserHandler);
    if (this.element.querySelector('.event__available-offers')) {
      this.element.querySelector('.event__available-offers').addEventListener('click', this.#offerPickHandler);
    }
  }

  #offerPickHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    const checkedOffers = this.element.querySelector('.event__available-offers').querySelectorAll('input:checked');
    const pointOffers = [];
    for (const offer of checkedOffers) {
      pointOffers.push(offerToObject(offer));
    }
    this._data.options = [...pointOffers];
    this.updateData({
      options: this._data.options,
    });
  }

  #priceEnterHandler = (evt) => {
    this._data.price = evt.target.value;
    this.updateData({
      price: Number(this._data.price),
    });
  }

  #typeChooserHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    this._data.type = evt.target.value;
    this.element.querySelector('.event__type-icon').src = `img/icons/${evt.target.value}.png`;
    this.element.querySelector('.event__type-toggle').checked = false;
    this.element.querySelector('.event__type-output').textContent = `${evt.target.value}`;

    this.updateData({
      type: this._data.type,
      options: [],
    });
  }

  #cityChooserHandler = (evt) => {
    this._data.reachPoint = evt.target.value;
    this.updateData({
      reachPoint: this._data.reachPoint,
    });
  }

  #setDatepicker = () => {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('.event__input--time-from'),
      {
        enableTime: true,
        dateFormat: 'd/m/y h:i',
        defaultDate: this._data.dateFrom,
        onChange: this.#dateFromChangeHandler,
      },
    );
    this.#datepickerTo = flatpickr(
      this.element.querySelector('.event__input--time-to'),
      {
        enableTime: true,
        minDate: this._data.dateFrom,
        dateFormat: 'd/m/y h:i',
        defaultDate: this._data.dateTo,
        onChange: this.#dateToChangeHandler,
      },
    );
  }

  #dateFromChangeHandler = ([userDate]) => {
    this.updateData({
      dateFrom: userDate,
    });
  }

  #dateToChangeHandler = ([userDate]) => {
    this.updateData({
      dateTo: userDate,
    }, true);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset = (point) => {
    this.updateData(
      EditFormView.parsePointToData(point),
    );
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);

    if (!this._isNew) {
      this.setExitClickHandler(this._callback.exitClick);
    }

    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  static parsePointToData = (point) => ({ ...point });

  static parseDataToPoint = (data) => {
    const point = { ...data };


    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }

  get template() {
    return editPoint(this._data, this._isNew, this._destinations, this._offers, true);
  }
}
