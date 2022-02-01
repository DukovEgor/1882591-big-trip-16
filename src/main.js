import ApiService from './api-service.js';
import FilterModel from './model/filter-model.js';
import PointsModel from './model/points-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';
import { MenuItem } from './utils/const.js';
import { remove, render, RenderPosition } from './utils/render.js';
import SiteMenuView from './view/menu-view.js';
import StatsView from './view/stats-view.js';

const AUTHORIZATION = 'Basic iddQd12345ed';
const END_POINT = 'https://16.ecmascript.pages.academy/big-trip';

const pointsModel = new PointsModel(new ApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();

const pageHeader = document.querySelector('.page-header');
const tripControlsNavigation = pageHeader.querySelector('.trip-controls__navigation');
const tripControlsFilters = pageHeader.querySelector('.trip-controls__filters');
const bodyContainer = document.querySelector('main>.page-body__container');
const addNewButton = document.querySelector('.trip-main__event-add-btn');

const siteMenuComponent = new SiteMenuView();
const tripPresenter = new TripPresenter(pointsModel, filterModel);
const filterPresenter = new FilterPresenter(tripControlsFilters, filterModel, pointsModel);

const handlePointNewFormClose = () => {
  siteMenuComponent.setMenuItem(MenuItem.POINTS);
};

let statsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_POINT:
      remove(statsComponent);
      filterPresenter.destroy();
      filterPresenter.init();
      tripPresenter.destroy();
      tripPresenter.init();
      tripPresenter.createPoint(handlePointNewFormClose);
      siteMenuComponent.setMenuItem(MenuItem.POINTS);
      break;
    case MenuItem.POINTS:
      remove(statsComponent);
      siteMenuComponent.setMenuItem(MenuItem.POINTS);
      filterPresenter.init();
      tripPresenter.destroy();
      tripPresenter.init();
      addNewButton.disabled = false;
      break;
    case MenuItem.STATS:
      siteMenuComponent.setMenuItem(MenuItem.STATS);
      filterPresenter.destroy();
      tripPresenter.destroy();
      tripPresenter.renderTotalRoute();
      addNewButton.disabled = false;
      statsComponent = new StatsView(pointsModel.points);
      render(bodyContainer, statsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

pointsModel.init().finally(() => {
  render(tripControlsNavigation, siteMenuComponent, RenderPosition.BEFOREEND);
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
});
filterPresenter.init();
tripPresenter.init();

addNewButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  handleSiteMenuClick(MenuItem.ADD_NEW_POINT);
  evt.target.disabled = true;
  tripPresenter.createPoint();
});

