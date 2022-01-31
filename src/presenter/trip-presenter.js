import { remove, render, RenderPosition } from '../utils/render.js';
import EmptyMessageView from '../view/empty-view.js';
import ContentListView from '../view/list-view.js';
import RouteView from '../view/route-view';
import SiteSortView, { SortType } from '../view/sort-view.js';
import PointPresenter from './point-pesenter.js';
import { sortByDay, sortByPrice, sortByTime } from '../utils/utils.js';
import { FilterType, UpdateType, UserAction } from '../utils/const.js';
import { filter } from '../utils/filter.js';
import PointNewPresenter from './point-new-presenter.js';
import LoadingView from '../view/loading-view.js';

const mainContent = document.querySelector('.trip-events');
const tripMain = document.querySelector('.trip-main');

export default class TripPresenter {
  #pointsModel = null;
  #filterModel = null;

  #sortComponent = null;
  #routeComponent = null;
  #emptyMessageComponent = null;

  #listComponent = new ContentListView;
  #loadingComponent = new LoadingView();

  #pointPresenter = new Map();
  #pointNewPresenter = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;

  constructor(pointsModel, filterModel) {
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointNewPresenter = new PointNewPresenter(this.#listComponent, this.#handleViewAction);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortByDay);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
    }

    return filteredPoints;
  }

  get destinations() {
    return this.#pointsModel.destinations;
  }

  get offers() {
    return this.#pointsModel.offers;
  }

  init = () => {
    this.#renderList();

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#renderBoard();
  }

  destroy = () => {
    this.#clearBoard({ resetSortType: true });

    remove(this.#listComponent);

    this.#pointsModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);
  }

  createPoint = (callback) => {
    this.#pointNewPresenter.init(callback, this.#emptyMessageComponent, this.#renderEmptyMessage, this.destinations, this.offers);
  }

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  renderTotalRoute = () => {
    this.#routeComponent = new RouteView(this.points.sort(sortByDay));
    render(tripMain, this.#routeComponent, RenderPosition.AFTERBEGIN);
  }

  #renderSort = () => {
    this.#sortComponent = new SiteSortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(mainContent, this.#sortComponent, RenderPosition.AFTERBEGIN);
  }

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#listComponent, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point, this.destinations, this.offers);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderLoading = () => {
    render(mainContent, this.#loadingComponent, RenderPosition.AFTERBEGIN);
  }

  #renderEmptyMessage = () => {
    if (this.points.length === 0) {
      this.#emptyMessageComponent = new EmptyMessageView(this.#filterType);
      render(mainContent, this.#emptyMessageComponent, RenderPosition.BEFOREEND);
    }
  }

  #renderList = () => {
    render(mainContent, this.#listComponent, RenderPosition.BEFOREEND);
  }

  #clearBoard = ({ resetSortType = false } = {}) => {

    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#loadingComponent);
    remove(this.#sortComponent);
    remove(this.#routeComponent);

    if (this.#emptyMessageComponent) {
      remove(this.#emptyMessageComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderBoard = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    if (this.points.length === 0) {
      this.#renderEmptyMessage();
      return;
    }
    this.renderTotalRoute();
    this.#renderSort();
    this.#renderPoints(this.points);
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
        this.#pointPresenter.get(data.id).init(data, this.destinations, this.offers);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
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

