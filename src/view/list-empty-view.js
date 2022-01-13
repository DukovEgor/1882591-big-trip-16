import { createElement } from '../render.js';
import { tripControlsFilters } from '../main.js';

const messageVocabulary = {
  past: 'There are no past events now',
  everything: 'Click New Event to create your first point',
  future: 'There are no future events now',
};

const createEmptyMessage = () => {
  const filterFormCheckedInput = tripControlsFilters.querySelector('input:checked');
  return `<p class="trip-events__msg">${messageVocabulary[filterFormCheckedInput.value]}</p>`;
};

export default class EmptyMessageView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createEmptyMessage();
  }

  removeElement() {
    this.#element = null;
  }
}
