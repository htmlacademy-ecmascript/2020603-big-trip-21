import AbstractView from '../../framework/view/abstract-view.js';
import { renderFiltersTemplate } from './fitlers-template.js';

export default class FiltersView extends AbstractView {
  #filters = [];

  constructor({ filters }) {
    super();
    this.#filters = filters;
  }

  get template() {
    return renderFiltersTemplate(this.#filters);
  }
}
