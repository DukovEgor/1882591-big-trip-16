import AbstractView from './absract-view';


const createContentList = () => (
  '<ul class="trip-events__list"></ul>'
);

export default class ContentListView extends AbstractView{

  get template() {
    return createContentList();
  }
}
