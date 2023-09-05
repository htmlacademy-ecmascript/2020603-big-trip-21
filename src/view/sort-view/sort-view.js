import AbstractView from '../../framework/view/abstract-view.js';
import { renderSortTemplate } from './sort-template.js';

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #sortItems = [];

  constructor({onSortTypeChange, items}) {
    super();
    this.#sortItems = items;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return renderSortTemplate(this.#sortItems);
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
