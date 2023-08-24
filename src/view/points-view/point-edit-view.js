import { createElement } from '../../render.js';
import { createPointEditTemplate } from './point-edit-template.js';
import { POINT_EMPTY } from '../../const.js';

export default class PointEditView {
  constructor({ point = POINT_EMPTY, pointDestination, pointOffers }) {
    this.point = point;
    this.pointDestination = pointDestination;
    this.pointOffers = pointOffers;
  }

  getTemplate() {
    return createPointEditTemplate({
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
