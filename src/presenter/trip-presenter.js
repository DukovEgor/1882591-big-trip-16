import { remove, render, RenderPosition } from '../utils/render.js';
import EmptyMessageView from '../view/empty-view.js';
import ContentListView from '../view/list-view.js';
import RouteView from '../view/route-view';
import SiteSortView, { SortType } from '../view/sort-view.js';
import NewPointView from '../view/form-view.js';
import PointPresenter from './point-pesenter.js';
import { sortByDay, sortByPrice, sortByTime } from '../utils/utils.js';
import { UpdateType, UserAction } from '../utils/const.js';

const mainContent = document.querySelector('.trip-events');
const tripMain = document.querySelector('.trip-main');

export default class TripPresenter {
  #pointsModel = null;

  #sortComponent = null;
  #routeComponent = null;
  #emptyMessageComponent = null;

  #listComponent = new ContentListView;
  #newPointComponent = new NewPointView;

  #pointPresenter = new Map();

  #currentSortType = SortType.DAY;

  constructor(pointsModel) {
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
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
    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #renderTotalRoute = () => {
    this.#routeComponent = new RouteView(this.points.sort(sortByDay));
    render(tripMain, this.#routeComponent, RenderPosition.AFTERBEGIN);
  }

  #setFilterHandler = () => {
    document.querySelector('.trip-filters').addEventListener('change', () => {
      if (!this.points.length > 0) {
        mainContent.innerHTML = '';
        this.#renderEmptyMessage();
      }
    });
  }

  #renderSort = () => {
    this.#sortComponent = new SiteSortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(mainContent, this.#sortComponent, RenderPosition.AFTERBEGIN);
  }

  #renderNewPointForm = () => {
    render(this.#listComponent, this.#newPointComponent, RenderPosition.AFTERBEGIN);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#listComponent, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderEmptyMessage = () => {
    this.#emptyMessageComponent = new EmptyMessageView;
    render(mainContent, this.#emptyMessageComponent, RenderPosition.BEFOREEND);
  }

  #renderList = () => {
    render(mainContent, this.#listComponent, RenderPosition.BEFOREEND);
  }

  #clearBoard = ({resetSortType = false} = {}) => {

    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#routeComponent);
    remove(this.#emptyMessageComponent);


    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderBoard = () => {
    if (this.points.length === 0) {
      this.#renderEmptyMessage();
      return;
    }
    this.#renderTotalRoute();
    this.#renderSort();
    this.#renderPoints(this.points);
    this.#renderList();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  }

}

