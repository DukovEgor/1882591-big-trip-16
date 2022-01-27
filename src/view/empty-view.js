import { FilterType } from '../utils/const.js';
import AbstractView from './absract-view.js';

const messageVocabulary = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

const createEmptyMessage = (data) => (
  `<p class="trip-events__msg">${messageVocabulary[data]}</p>`
);

export default class EmptyMessageView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  get template() {
    return createEmptyMessage(this._data);
  }
}
