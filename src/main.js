import { generatePoint } from './mock/point.js';
import FilterModel from './model/filter-model.js';
import PointsModel from './model/points-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';
import { MenuItem } from './utils/const.js';
import { render, RenderPosition } from './utils/render.js';
import SiteMenuView from './view/menu-view.js';


const MOCK_COUNTER = 4;
const points = Array.from({ length: MOCK_COUNTER }, generatePoint);

const pointsModel = new PointsModel();
pointsModel.points = points;

const filterModel = new FilterModel();

const pageHeader = document.querySelector('.page-header');
const tripControlsNavigation = pageHeader.querySelector('.trip-controls__navigation');
const tripControlsFilters = pageHeader.querySelector('.trip-controls__filters');

const siteMenuComponent = new SiteMenuView();
render(tripControlsNavigation, siteMenuComponent, RenderPosition.BEFOREEND);
const addNewButton = document.querySelector('.trip-main__event-add-btn');

const tripPresenter = new TripPresenter(pointsModel, filterModel);
const filterPresenter = new FilterPresenter(tripControlsFilters, filterModel, pointsModel);

const handleTaskNewFormClose = () => {
  siteMenuComponent.setMenuItem(MenuItem.POINTS);
};

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_POINT:
      // Скрыть статистику
      filterPresenter.destroy();
      filterPresenter.init();
      tripPresenter.destroy();
      tripPresenter.init();
      tripPresenter.createPoint(handleTaskNewFormClose);
      break;
    case MenuItem.POINTS:
      siteMenuComponent.setMenuItem(MenuItem.POINTS);
      filterPresenter.init();
      tripPresenter.destroy();
      tripPresenter.init();
      addNewButton.disabled = false;
      // Скрыть статистику
      break;
    case MenuItem.STATS:
      siteMenuComponent.setMenuItem(MenuItem.STATS);
      filterPresenter.destroy();
      tripPresenter.destroy();
      tripPresenter.renderTotalRoute();
      addNewButton.disabled = false;
      // Показать статистику
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);


filterPresenter.init();
tripPresenter.init();

addNewButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  handleSiteMenuClick(MenuItem.ADD_NEW_POINT);
  evt.target.disabled = true;
  tripPresenter.createPoint();
});

