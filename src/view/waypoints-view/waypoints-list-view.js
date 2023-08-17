import { createElement } from '../../render.js';
import { createWaypointsListTemplate } from './waypoints-list-template.js';

export default class WaypointsListView {
  getTemplate() {
    return createWaypointsListTemplate();
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
