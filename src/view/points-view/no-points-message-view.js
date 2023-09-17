import AbstractView from '../../framework/view/abstract-view';
import { createNoPointsMessageTemplate } from './no-points-message-template.js';

export default class NoPointsMessageView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointsMessageTemplate(this.#filterType);
  }
}
