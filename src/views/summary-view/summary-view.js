import AbstractView from '../../framework/view/abstract-view.js';
import { createTemplate } from './summary-template.js';

export default class SummaryView extends AbstractView {
  #cities = '';
  #dates = '';
  #wholePrice = 0;

  constructor ({cities, dates, wholePrice}) {
    super();
    this.#cities = cities;
    this.#dates = dates;
    this.#wholePrice = wholePrice;
  }

  get template() {
    return createTemplate(this.#cities, this.#dates, this.#wholePrice);
  }
}
