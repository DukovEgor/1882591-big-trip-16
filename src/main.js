import RouteView from './view/route-total-view.js';
import SiteMenuView from './view/menu-view.js';
import SiteFilterView from './view/filter-view.js';
import { render, RenderPosition } from './render.js';
import SiteSortView from './view/sort-view.js';
import ContentListView from './view/content-list.js';
import NewPointView from './view/creation-form-view.js';
import EditFormView from './view/edit-form-view.js';
import PointView from './view/point-in-list-view.js';
import { generatePoint } from './mock/point.js';

const pageHeader = document.querySelector('.page-header');
const tripMain = pageHeader.querySelector('.trip-main');
const tripControlsNavigation = pageHeader.querySelector('.trip-controls__navigation');
const tripControlsFilters = pageHeader.querySelector('.trip-controls__filters');
const main = document.querySelector('main');
const mainContent = main.querySelector('.trip-events');
const MOCK_COUNTER = 30;
const mockArray = [];

for (let i = 0; i < MOCK_COUNTER; i++) {
  mockArray.push(generatePoint());
}


render(tripMain, new RouteView(mockArray).element, RenderPosition.AFTERBEGIN);

render(tripControlsNavigation, new SiteMenuView().element, RenderPosition.BEFOREEND);

render(tripControlsFilters, new SiteFilterView().element, RenderPosition.BEFOREEND);
render(mainContent, new SiteSortView().element, RenderPosition.BEFOREEND);
render(mainContent, new ContentListView().element, RenderPosition.BEFOREEND);


const contentList = mainContent.querySelector('.trip-events__list');

render(contentList, new NewPointView().element, RenderPosition.AFTERBEGIN);


const totalPrice = tripMain.querySelector('.trip-info__cost-value');

let offerTotal = 0;

mockArray.forEach((point) => {
  offerTotal += point.price;
});


totalPrice.textContent = offerTotal;
render(contentList, new EditFormView(mockArray[0]).element, RenderPosition.BEFOREEND);

for (let i = 1; i < mockArray.length - 1; i++) {
  render(contentList, new PointView(mockArray[i]).element, RenderPosition.BEFOREEND);
}
