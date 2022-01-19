import { remove, render, RenderPosition, replace } from '../utils/render';
import EditFormView from '../view/edit-form-view';
import PointView from '../view/point-in-list-view';

export default class PointPresenter {
  #listComponent = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #changeData = null;
  #point = null;

  constructor(listComponent, changeData) {
    this.#listComponent = listComponent;
    this.#changeData = changeData;
  }

  init = (point) => {
    this.#point = point;
    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView(point);
    this.#pointEditComponent = new EditFormView(point);

    this.#pointComponent.setClickHandler(() => {
      this.#replaceCardToForm();
      document.addEventListener('keydown', this.#onEscKeyDown);
    });

    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    this.#pointEditComponent.setFormSubmitHandler(() => {
      this.#replaceFormToCard();
      document.addEventListener('keydown', this.#onEscKeyDown);
    });


    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#listComponent, this.#pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#listComponent.element.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#listComponent.element.contains(prevPointEditComponent.element)) {
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

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  }

  #handleFormSubmit = (point) => {
    this.#changeData(point);
    this.#replaceFormToCard();
  }
}
