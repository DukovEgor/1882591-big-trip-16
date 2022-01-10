import { createRoute } from './view/route-total-view.js';
import { createSiteMenuTemplate } from './view/menu-view.js';
import { createSiteFilterTemplate } from './view/filter-view.js';
import { renderTemplate, RenderPosition } from './render.js';
import { createSiteSortTemplate } from './view/sort-view.js';
import { createContentlist } from './view/content-list.js';
import { addNewPoint } from './view/creation-form-view.js';
import { editPoint } from './view/edit-form-view.js';
import { createPoint } from './view/point-in-list-view.js';
import { generatePoint } from './mock/point.js';

const pageHeader = document.querySelector('.page-header');
const tripMain = pageHeader.querySelector('.trip-main');
const tripControlsNavigation = pageHeader.querySelector('.trip-controls__navigation');
const tripControlsFilters = pageHeader.querySelector('.trip-controls__filters');
const main = document.querySelector('main');
const mainContent = main.querySelector('.trip-events');
const MOCK_COUNTER = 2;
const mockArray = [];

for (let i = 0; i < MOCK_COUNTER; i++) {
  mockArray.push(generatePoint());
}


renderTemplate(tripMain, createRoute(mockArray), RenderPosition.AFTERBEGIN);
renderTemplate(tripControlsNavigation, createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripControlsFilters, createSiteFilterTemplate(), RenderPosition.BEFOREEND);
renderTemplate(mainContent, createSiteSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(mainContent, createContentlist(), RenderPosition.BEFOREEND);


const contentList = mainContent.querySelector('.trip-events__list');

renderTemplate(contentList, addNewPoint(), RenderPosition.AFTERBEGIN);

const calcTotal = () => {
  const totalPrice = tripMain.querySelector('.trip-info__cost-value');
  const initialValue = 0;
  const sum = mockArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    initialValue
  );
  totalPrice.textContent = sum;
};
calcTotal();


renderTemplate(contentList, editPoint(mockArray[0]), RenderPosition.BEFOREEND);

for (let i = 1; i < mockArray.length - 1; i++) {
  renderTemplate(contentList, createPoint(mockArray[i]), RenderPosition.BEFOREEND);
}
