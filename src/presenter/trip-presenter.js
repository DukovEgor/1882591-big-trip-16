import { render, RenderPosition } from '../utils/render.js';
import SiteFilterView from '../view/filter-view.js';
import EmptyMessageView from '../view/empty-view.js';
import ContentListView from '../view/list-view.js';
import RouteView from '../view/route-view';
import SiteSortView, { SortType } from '../view/sort-view.js';
import NewPointView from '../view/form-view.js';
import PointPresenter from './point-pesenter.js';
import { sortByDay, sortByPrice, sortByTime } from '../utils/utils.js';

const mainContent = document.querySelector('.trip-events');
const tripMain = document.querySelector('.trip-main');

export default class TripPresenter {
  #pointsModel = null;

  #filterComponent = new SiteFilterView;
  #listComponent = new ContentListView;
  #sortComponent = new SiteSortView;
  #newPointComponent = new NewPointView;
  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;

  constructor(pointsModel) {
    this.#pointsModel = pointsModel;
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...this.#pointsModel.points].sort(sortByDay);
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortByPrice);
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortByTime);
    }

    return this.#pointsModel.points;
  }

  init = () => {
    this.#setFilterHandler();

    if (this.points.length > 0) {
      this.#renderTotalRoute(this.points);
      this.#renderSort();
      // this.#renderNewPointForm();
      this.#renderPoints(this.points);
      this.#renderList();

    } else {
      this.#renderEmptyMessage();
    }

  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #renderTotalRoute = () => {
    render(tripMain, new RouteView(this.points), RenderPosition.AFTERBEGIN);
  }

  #setFilterHandler = () => {
    this.#filterComponent.element.addEventListener('change', () => {
      if (!this.points.length > 0) {
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

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
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

    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }


  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearList();
    this.#renderList();
    this.#renderPoints(this.points);
  }

}

