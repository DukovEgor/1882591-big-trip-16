import { generatePoint } from './mock/point.js';
import FilterModel from './model/filter-model.js';
import PointsModel from './model/points-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';
import { render, RenderPosition } from './utils/render.js';
import SiteMenuView from './view/menu-view.js';


const MOCK_COUNTER = 10;
const points = Array.from({ length: MOCK_COUNTER }, generatePoint);

const pointsModel = new PointsModel();
pointsModel.points = points;

const filterModel = new FilterModel();

const pageHeader = document.querySelector('.page-header');
const tripControlsNavigation = pageHeader.querySelector('.trip-controls__navigation');
const tripControlsFilters = pageHeader.querySelector('.trip-controls__filters');


render(tripControlsNavigation, new SiteMenuView, RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(pointsModel, filterModel);
const filterPresenter = new FilterPresenter(tripControlsFilters, filterModel, pointsModel);

filterPresenter.init();
tripPresenter.init();


