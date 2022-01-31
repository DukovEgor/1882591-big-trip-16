import AbstractView from './absract-view';

const createNoPointTemplate = () => (
  '<p class="trip-events__msg">Loading...</p>'
);

export default class LoadingView extends AbstractView {
  get template() {
    return createNoPointTemplate();
  }
}
