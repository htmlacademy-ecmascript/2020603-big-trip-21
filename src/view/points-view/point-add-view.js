import { createElement } from '../../render.js';
import { createPointAddTemplate } from './point-add-template.js';

export default class PointAddView {
  // constructor({point, pointDestination, pointOffers}) {
  //   this.point = point;
  //   this.pointDestination = pointDestination;
  //   this.pointOffers = pointOffers;
  // }

  getTemplate() {
    return createPointAddTemplate();
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
