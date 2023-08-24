import { createElement } from '../../render.js';
import { createPointTemplate } from './point-template.js';
import { POINT_EMPTY } from '../../const.js';

export default class PointView {
  constructor({ point = POINT_EMPTY, pointDestination, pointOffers}) {
    this.point = point;
    this.pointDestination = pointDestination;
    this.pointOffers = pointOffers;
  }

  getTemplate() {
    return createPointTemplate({
      point: this.point,
      pointDestination: this.pointDestination,
      pointOffers: this.pointOffers
    });
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
