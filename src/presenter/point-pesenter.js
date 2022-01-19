import { remove, render, RenderPosition, replace } from '../utils/render';
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
    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

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

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#listComponent, this.#pointComponent, RenderPosition.BEFOREEND);
    }

    if (this.#listComponent.element.contains(prevPointComponent)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#listComponent.element.contains(prevPointEditComponent)) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
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
