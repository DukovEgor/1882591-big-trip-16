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


  pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
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


render(tripMain, new RouteView(mockArray).element, RenderPosition.AFTERBEGIN);

render(tripControlsNavigation, new SiteMenuView().element, RenderPosition.BEFOREEND);

render(tripControlsFilters, new SiteFilterView().element, RenderPosition.BEFOREEND);
render(mainContent, new SiteSortView().element, RenderPosition.BEFOREEND);
render(mainContent, new ContentListView().element, RenderPosition.BEFOREEND);


const contentList = mainContent.querySelector('.trip-events__list');
const pointsListComponent = new ContentListView();


<<<<<<< HEAD
render(contentList, new NewPointView().element, RenderPosition.AFTERBEGIN);


const totalPrice = tripMain.querySelector('.trip-info__cost-value');

let offerTotal = 0;

mockArray.forEach((point) => {
  offerTotal += point.price;
});


totalPrice.textContent = offerTotal;
=======
renderTemplate(contentList, addNewPoint(), RenderPosition.AFTERBEGIN);
renderTemplate(contentList, editPoint(mockArray[0]), RenderPosition.BEFOREEND);
>>>>>>> ec99fcd25f00db7fa82b5073a12f714e78ee33dc

for (let i = 0; i < mockArray.length - 1; i++) {
  renderPoint(contentList, mockArray[i]);
}
