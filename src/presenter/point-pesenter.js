import { render, RenderPosition, replace } from '../utils/render';
import EditFormView from '../view/edit-form-view';
import PointView from '../view/point-in-list-view';

export default class PointPresenter {
  #listComponent = null;
  #pointComponent = null;
  #pointEditComponent = null;

  constructor(listComponent) {
    this.#listComponent = listComponent;
  }

  init = (point) => {
    this.#pointComponent = new PointView(point);
    this.#pointEditComponent = new EditFormView(point);

    this.#pointComponent.setClickHandler(() => {
      this.#replaceCardToForm();
      document.addEventListener('keydown', this.#onEscKeyDown);
    });

    this.#pointEditComponent.setFormSubmitHandler(() => {
      this.#replaceFormToCard();
      document.addEventListener('keydown', this.#onEscKeyDown);
    });

    render(this.#listComponent, this.#pointComponent, RenderPosition.BEFOREEND);
  }

  #replaceCardToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
  }

  #replaceFormToCard = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #setFavoriteHandler = (pointComponent) => {
    const favoriteButton = pointComponent.element.querySelector('.event__favorite-btn');
    favoriteButton.addEventListener('change', () => {

    });
  }
}
