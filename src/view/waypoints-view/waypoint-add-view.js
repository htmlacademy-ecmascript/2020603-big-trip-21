import { createElement } from '../../render.js';
import { createWaypointAddTemplate } from './waypoint-add-template.js';

export default class WaypointAddView {
  getTemplate() {
    return createWaypointAddTemplate();
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
