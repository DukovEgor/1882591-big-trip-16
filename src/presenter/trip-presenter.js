import { render, replace, RenderPosition } from '../utils/render.js';
import SiteFilterView from '../view/filter-view.js';
import SiteMenuView from '../view/menu-view.js';
import EmptyMessageView from '../view/list-empty-view.js';
import ContentListView from '../view/content-list.js';
import RouteView from '../view/route-total-view';
import SiteSortView from '../view/sort-view.js';
import NewPointView from '../view/creation-form-view.js';
import PointView from '../view/point-in-list-view.js';
import EditFormView from '../view/edit-form-view';

const pageHeader = document.querySelector('.page-header');
const tripMain = pageHeader.querySelector('.trip-main');
const tripControlsNavigation = pageHeader.querySelector('.trip-controls__navigation');
const tripControlsFilters = pageHeader.querySelector('.trip-controls__filters');
const mainContent = document.querySelector('.trip-events');


export default class TripPresenter {
  #menuComponent = new SiteMenuView;
  #filterComponent = new SiteFilterView;
  #listComponent = new ContentListView;
  #sortComponent = new SiteSortView;
  #newPointComponent = new NewPointView;

  #points = [];

  constructor(points) {
    this.#points = points;
  }

  init = () => {
    this.#renderMenu();
    this.#renderFilter();
    this.#setFilterHandler();

    if (this.#points.length > 0) {
      this.#renderTotalRoute(this.#points);
      this.#renderSort();
      this.#renderNewPointForm();

      this.#renderPoints();

      this.#renderList();

    } else {
      this.#renderEmptyMessage();
    }

  }

  #renderTotalRoute = () => {
    render(tripMain, new RouteView(this.#points), RenderPosition.AFTERBEGIN);
  }

  #renderMenu = () => {
    render(tripControlsNavigation, this.#menuComponent, RenderPosition.BEFOREEND);
  }

  #renderFilter = () => {
    render(tripControlsFilters, this.#filterComponent, RenderPosition.BEFOREEND);
  }

  #setFilterHandler = () => {
    this.#filterComponent.element.addEventListener('change', () => {
      if (!this.#points.length > 0) {
        mainContent.innerHTML = '';
        this.#renderEmptyMessage();
      }
    });
  }

  #renderSort = () => {
    render(mainContent, this.#sortComponent, RenderPosition.BEFOREEND);
  }

  #renderNewPointForm = () => {
    render(this.#listComponent, this.#newPointComponent, RenderPosition.AFTERBEGIN);
  }

  #renderPoint = (point) => {
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

    render(this.#listComponent, pointComponent, RenderPosition.BEFOREEND);
  }

  #renderPoints = () => {
    for (let i = 0; i < this.#points.length - 1; i++) {
      this.#renderPoint(this.#points[i]);
    }
  }

  #renderEmptyMessage = () => {
    render(mainContent, new EmptyMessageView, RenderPosition.BEFOREEND);
  }

  #renderList = () => {
    render(mainContent, this.#listComponent, RenderPosition.BEFOREEND);
  }
}
export { tripControlsFilters };
