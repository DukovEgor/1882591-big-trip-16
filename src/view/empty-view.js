import { tripControlsFilters } from '../main.js';
import AbstractView from './absract-view.js';

const messageVocabulary = {
  past: 'There are no past events now',
  everything: 'Click New Event to create your first point',
  future: 'There are no future events now',
};

const createEmptyMessage = () => {
  const filterFormCheckedInput = tripControlsFilters.querySelector('input:checked');
  return `<p class="trip-events__msg">${messageVocabulary[filterFormCheckedInput.value]}</p>`;
};

export default class EmptyMessageView extends AbstractView{

  get template() {
    return createEmptyMessage();
  }
}
