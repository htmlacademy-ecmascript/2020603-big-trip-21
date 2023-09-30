import AbstractView from '../../framework/view/abstract-view.js';
import { createTemplate } from './summary-template.js';

export default class SummaryView extends AbstractView {
  #cities = '';
  #dates = '';
  #totalPrice = 0;

  constructor({ cities, dates, totalPrice }) {
    super();
    this.#cities = cities;
    this.#dates = dates;
    this.#totalPrice = totalPrice;
  }

  get template() {
    return createTemplate(this.#cities, this.#dates, this.#totalPrice);
  }
}
