import { createSiteMenuTemplate } from './view/menu-view.js';
import { createSiteFilterTemplate } from './view/filter-view.js';
import { renderTemplate, RenderPosition } from './render.js';
import { createSiteSortTemplate } from './view/sort-view.js';
import { createContentlist } from './view/content-list.js';
import { addNewPoint } from './view/creation-form-view.js';
import { editPoint } from './view/edit-form-view.js';
import { createPoint } from './view/point-in-list-view.js';

const pageHeader = document.querySelector('.page-header');
const tripControlsNavigation = pageHeader.querySelector('.trip-controls__navigation');
const tripControlsFilters = pageHeader.querySelector('.trip-controls__filters');
const main = document.querySelector('main');
const mainContent = main.querySelector('.trip-events');
const POINTS_COUNTER = 3;


renderTemplate(tripControlsNavigation, createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripControlsFilters, createSiteFilterTemplate(), RenderPosition.BEFOREEND);
renderTemplate(mainContent, createSiteSortTemplate(), RenderPosition.BEFOREEND);
renderTemplate(mainContent, createContentlist(), RenderPosition.BEFOREEND);


const contentList = mainContent.querySelector('.trip-events__list');

renderTemplate(contentList, addNewPoint(), RenderPosition.BEFOREEND);
renderTemplate(contentList, editPoint(), RenderPosition.AFTERBEGIN);

for (let i = 0; i < POINTS_COUNTER; i++) {
  renderTemplate(contentList, createPoint(), RenderPosition.BEFOREEND);
};
