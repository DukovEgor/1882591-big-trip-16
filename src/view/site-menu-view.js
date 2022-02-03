import { MenuItem } from '../utils/const';
import AbstractView from './absract-view';

const createSiteMenuTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
<a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-menu-item="${MenuItem.POINTS}">Table</a>
<a class="trip-tabs__btn" href="#" data-menu-item="${MenuItem.STATS}">Stats</a>
</nav>`
);

export default class SiteMenuView extends AbstractView{

  get template() {
    return createSiteMenuTemplate();
  }

  setMenuClickHandler = (callback) => {
    this._callback.menuClick = callback;
    this.element.addEventListener('click', this.#menuClickHandler);
  }

  setMenuItem = (menuItem) => {
    const item = this.element.querySelector(`[data-menu-item=${menuItem}]`);
    const items = this.element.children;
    if (item !== null) {
      for (const index of items) {index.classList.remove('trip-tabs__btn--active');}
      item.classList.add('trip-tabs__btn--active');
    }
  }

  #menuClickHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.menuItem);
  }
}
