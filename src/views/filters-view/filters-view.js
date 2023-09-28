import { createTemplate } from './filters-template.js';
import AbstractView from '../../framework/view/abstract-view.js';

export default class FilterView extends AbstractView {
  #filters = null;
  #currentOptionName = null;
  #handleOptionChange = null;

  constructor ({ filters, currentOptionName, onOptionChange }) {
    super();
    this.#filters = filters;
    this.#currentOptionName = currentOptionName;
    this.#handleOptionChange = onOptionChange;

    this.element.addEventListener('change', this.#optionChangeHandler);
  }

  get template() {
    return createTemplate(this.#filters, this.#currentOptionName);
  }

  #optionChangeHandler = (evt) => {
    this.#handleOptionChange(evt.target.value);
  };
}
