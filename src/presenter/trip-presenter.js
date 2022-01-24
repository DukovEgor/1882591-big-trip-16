import { render, RenderPosition } from '../utils/render.js';
import SiteFilterView from '../view/filter-view.js';
import SiteMenuView from '../view/menu-view.js';
import EmptyMessageView from '../view/empty-view.js';
import ContentListView from '../view/list-view.js';
import RouteView from '../view/route-view';
import SiteSortView, { SortType } from '../view/sort-view.js';
import NewPointView from '../view/form-view.js';
import PointPresenter from './point-pesenter.js';
import { sortByDay, sortByPrice, updateItem } from '../utils/utils.js';

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
  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;
  #sourcedPoints = [];

  constructor(points) {
    this.#points = [...points];
    this.#sourcedPoints = [...points];
  }

  init = () => {


    this.#renderMenu();
    this.#renderFilter();
    this.#setFilterHandler();

    if (this.#points.length > 0) {
      this.#renderTotalRoute(this.#points);
      this.#renderSort();
      // this.#renderNewPointForm();
      this.#sortPoints(this.#currentSortType);
      this.#renderPoints();
      this.#renderList();

    } else {
      this.#renderEmptyMessage();
    }

  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
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
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderNewPointForm = () => {
    render(this.#listComponent, this.#newPointComponent, RenderPosition.AFTERBEGIN);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#listComponent, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
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

  #clearList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#sourcedPoints = updateItem(this.#sourcedPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.DAY:
        this.#points.sort(sortByDay);
        break;
      case SortType.PRICE:
        this.#points.sort(sortByPrice);
        break;
      default:
        this.#points = [...this.#sourcedPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#clearList();
    this.#renderList();
    this.#renderPoints();
  }

}
export { tripControlsFilters };
