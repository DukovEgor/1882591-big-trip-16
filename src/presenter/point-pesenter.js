import { render, RenderPosition, replace } from '../utils/render';
import EditFormView from '../view/edit-form-view';
import PointView from '../view/point-in-list-view';

export default class PointPresenter {

  renderPoint = (listComponent, point) => {
    const pointComponent = new PointView(point);
    const pointEditComponent = new EditFormView(point);

    const replaceCardToForm = () => {
      replace(pointEditComponent, pointComponent);
    };

    const replaceFormToCard = () => {
      replace(pointComponent, pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setClickHandler(() => {
      replaceCardToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToCard();
      document.addEventListener('keydown', onEscKeyDown);
    });

    render(listComponent, pointComponent, RenderPosition.BEFOREEND);
  }
}
