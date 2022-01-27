import { generatePoint } from './mock/point.js';
import FilterModel from './model/filter-model.js';
import PointsModel from './model/points-model.js';
import TripPresenter from './presenter/trip-presenter.js';
import { render, RenderPosition } from './utils/render.js';
import SiteFilterView from './view/filter-view.js';
import SiteMenuView from './view/menu-view.js';


const MOCK_COUNTER = 10;
const points = Array.from({ length: MOCK_COUNTER }, generatePoint);
const filters = [
  {
    type: 'everything',
    name: 'EVERITHING',
  },
  {
    type: 'future',
    name: 'FUTURE',
  },
  {
    type: 'past',
    name: 'PAST',
  },
];

const pointsModel = new PointsModel();
pointsModel.points = points;

const filterModel = new FilterModel();

const pageHeader = document.querySelector('.page-header');
const tripControlsNavigation = pageHeader.querySelector('.trip-controls__navigation');
export const tripControlsFilters = pageHeader.querySelector('.trip-controls__filters');

const tripPresenter = new TripPresenter(pointsModel);

render(tripControlsNavigation, new SiteMenuView, RenderPosition.BEFOREEND);
render(tripControlsFilters, new SiteFilterView(filters, 'everything'), RenderPosition.BEFOREEND);

tripPresenter.init();


