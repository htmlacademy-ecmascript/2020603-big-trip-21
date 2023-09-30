import AbstractView from '../../framework/view/abstract-view.js';
import { createTemplate } from './sort-template.js';

export default class SortView extends AbstractView {
  #handleOptionChange = null;
  #currentOptionName = null;

  constructor({ currentOptionName, onOptionChange }) {
    super();
    this.#currentOptionName = currentOptionName;
    this.#handleOptionChange = onOptionChange;

    this.element.addEventListener('change', this.#optionChangeHandler);
  }

  get template() {
    return createTemplate(this.#currentOptionName);
  }

  #optionChangeHandler = (evt) => {
    this.#handleOptionChange(evt.target.dataset.sortName);
  };
}
