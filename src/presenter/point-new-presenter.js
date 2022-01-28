import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { UpdateType, UserAction } from '../utils/const';
import { remove, render, RenderPosition } from '../utils/render';
import EditFormView from '../view/edit-view';

const BLANK_POINT = {
  dateFrom: dayjs().toDate(),
  dateTo: dayjs().toDate(),
  type: 'train',
  reachPoint: '',
  photos: [],
  price: 0,
};

export default class PointNewPresenter {
  #pointListContainer = null;
  #changeData = null;
  #pointEditComponent = null;
  _newPointButton = document.querySelector('.trip-main__event-add-btn');

  constructor(pointListContainer, changeData) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
  }

  init = () => {
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new EditFormView(BLANK_POINT, true);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#pointListContainer, this.#pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: nanoid(), ...point},
    );
    this.destroy();
    this._newPointButton.disabled = false;
  }

  #handleDeleteClick = () => {
    this.destroy();
    this._newPointButton.disabled = false;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}
