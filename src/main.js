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
import EmptyMessageView from './view/list-empty-view.js';

const pageHeader = document.querySelector('.page-header');
const tripMain = pageHeader.querySelector('.trip-main');
const tripControlsNavigation = pageHeader.querySelector('.trip-controls__navigation');
const tripControlsFilters = pageHeader.querySelector('.trip-controls__filters');
const main = document.querySelector('main');
const mainContent = main.querySelector('.trip-events');
const MOCK_COUNTER = 15;
const mockArray = [];

const renderPoint = (listElement, point) => {
  const pointComponent = new PointView(point);
  const pointEditComponent = new EditFormView(point);

  const replaceCardToForm = () => {
    listElement.replaceChild(pointEditComponent.element, pointComponent.element);
  };

  const replaceFormToCard = () => {
    listElement.replaceChild(pointComponent.element, pointEditComponent.element);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pointComponent.rollupButton.addEventListener('click', () => {
    replaceCardToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  pointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.addEventListener('keydown', onEscKeyDown);
  });

  render(listElement, pointComponent.element, RenderPosition.BEFOREEND);
};


for (let i = 0; i < MOCK_COUNTER; i++) {
  mockArray.push(generatePoint());
}


const filterFormComponent = new SiteFilterView();
render(tripControlsNavigation, new SiteMenuView().element, RenderPosition.BEFOREEND);
render(tripControlsFilters, filterFormComponent.element, RenderPosition.BEFOREEND);


const filterFormHandler = () => {
  const filterForm = tripControlsFilters.querySelector('.trip-filters');
  filterForm.addEventListener('change', () => {//СМЕНИТЬ НА ГЕТТЕР КЛАССА НЕ ПОЛУЧАЕТСЯ ПО АНАЛОГИИ С КНОПКОЙ СТРЕЛКОЙ
    if (!mockArray.length > 0) {//Выдает Form is null (ХОТЯ КНОПКА-СТРЕЛКА ПОЛУЧАЕТСЯ, КОД ТОЧНО ТАКОЙ ЖЕ)
      mainContent.innerHTML = '';
      render(mainContent, new EmptyMessageView().element, RenderPosition.BEFOREEND);
    }
  });
};
filterFormHandler();


if (mockArray.length > 0) {
  render(tripMain, new RouteView(mockArray).element, RenderPosition.AFTERBEGIN);
  render(mainContent, new SiteSortView().element, RenderPosition.BEFOREEND);
  render(mainContent, new ContentListView().element, RenderPosition.BEFOREEND);
  const contentList = mainContent.querySelector('.trip-events__list');
  render(contentList, new NewPointView().element, RenderPosition.AFTERBEGIN);

  for (let i = 0; i < mockArray.length - 1; i++) {
    renderPoint(contentList, mockArray[i]);
  }
} else {
  render(mainContent, new EmptyMessageView().element, RenderPosition.BEFOREEND);
}

export { tripControlsFilters };
