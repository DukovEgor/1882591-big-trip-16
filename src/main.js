import RouteView from './view/route-total-view.js';
import SiteMenuView from './view/menu-view.js';
import SiteFilterView from './view/filter-view.js';
import { render, RenderPosition, replace } from './utils/render.js';
import SiteSortView from './view/sort-view.js';
import ContentListView from './view/content-list.js';
import NewPointView from './view/creation-form-view.js';
import EditFormView from './view/edit-form-view.js';
import PointView from './view/point-in-list-view.js';
import { generatePoint } from './mock/point.js';
import EmptyMessageView from './view/list-empty-view.js';

const pageHeader = document.querySelector('.page-header');
const tripMain = pageHeader.querySelector('.trip-main');
const tripControlsNavigation = pageHeader.querySelector('.trip-controls__navigation');
const tripControlsFilters = pageHeader.querySelector('.trip-controls__filters');
const main = document.querySelector('main');
const mainContent = main.querySelector('.trip-events');
const MOCK_COUNTER = 0;
const mockArray = [];

const renderPoint = (listElement, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new EditFormView(point);

  const replaceCardToForm = () => {
    replace(pointEditComponent, pointComponent);
  };

  const replaceFormToCard = () => {
    replace(pointComponent, pointEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.setClickHandler(() => {
    replaceCardToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.setFormSubmitHandler(() => {
    replaceFormToCard();
    document.addEventListener('keydown', onEscKeyDown);
  });

  render(listElement, pointComponent, RenderPosition.BEFOREEND);
};


for (let i = 0; i < MOCK_COUNTER; i++) {
  mockArray.push(generatePoint());
}


const filterFormComponent = new SiteFilterView();

render(tripControlsNavigation, new SiteMenuView(), RenderPosition.BEFOREEND);
render(tripControlsFilters, filterFormComponent, RenderPosition.BEFOREEND);


const filterFormHandler = () => {
  filterFormComponent.element.addEventListener('change', () => {
    if (!mockArray.length > 0) {
      mainContent.innerHTML = '';
      render(mainContent, new EmptyMessageView, RenderPosition.BEFOREEND);
    }
  });
};
filterFormHandler();

const contentList = new ContentListView;
if (mockArray.length > 0) {
  render(tripMain, new RouteView(mockArray), RenderPosition.AFTERBEGIN);
  render(mainContent, new SiteSortView(), RenderPosition.BEFOREEND);
  render(contentList, new NewPointView(), RenderPosition.AFTERBEGIN);

  for (let i = 0; i < mockArray.length - 1; i++) {
    renderPoint(contentList, mockArray[i]);
  }

  render(mainContent, contentList, RenderPosition.BEFOREEND);

} else {
  render(mainContent, new EmptyMessageView(), RenderPosition.BEFOREEND);
}

export { tripControlsFilters };
