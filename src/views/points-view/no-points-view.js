import AbstractView from '../../framework/view/abstract-view.js';
import { NO_POINTS_MESSAGE } from '../../const.js';
import { createTemplate } from './no-points-template.js';

export default class NoPointsView extends AbstractView {
  #message = NO_POINTS_MESSAGE;

  get template() {
    return createTemplate(this.#message);
  }

  setMessage(message = NO_POINTS_MESSAGE) {
    this.#message = message;
  }
}
