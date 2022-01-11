import { createElement } from '../render.js';

const createContentList = () => ('<ul class="trip-events__list"></ul>');

export default class ContentListView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createContentList();
  }

  get ul() {
    return this.element.querySelector('.trip-events__list');
  }

  removeElement() {
    this.#element = null;
  }
}
