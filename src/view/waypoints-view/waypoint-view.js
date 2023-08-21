import { createElement } from '../../render.js';
import { createWaypointTemplate } from './waypoint-template.js';
import { POINT_EMPTY } from '../../const.js';

export default class PointView {
  constructor({ waypoint = POINT_EMPTY, waypointDestination, waypointOffers}) {
    this.waypoint = waypoint;
    this.waypointDestination = waypointDestination;
    this.waypointOffers = waypointOffers;
  }

  getTemplate() {
    return createWaypointTemplate({
      waypoint: this.waypoint,
      waypointDestination: this.waypointDestination,
      waypointOffers: this.waypointOffers
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
