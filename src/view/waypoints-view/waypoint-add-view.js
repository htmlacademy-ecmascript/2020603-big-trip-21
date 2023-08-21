import { createElement } from '../../render.js';
import { createWaypointAddTemplate } from './waypoint-add-template.js';

export default class PointAddView {
  // constructor({waypoint, waypointDestination, waypointOffers}) {
  //   this.waypoint = waypoint;
  //   this.waypointDestination = waypointDestination;
  //   this.waypointOffers = waypointOffers;
  // }

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
