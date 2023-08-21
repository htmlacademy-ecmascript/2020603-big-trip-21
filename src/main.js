import { RenderPosition, render } from './render.js';

import WaypointsPresenter from './presenters/waypoints-presenter.js';
import InfoView from './view/info-view/info-view.js';
import FilterView from './view/filter-view/filter-view.js';

import MockService from './service/mock-service.js';
import DestinationsModel from './models/destinations-model.js';
import OffersModel from './models/offers-model.js';
import WaypointsModel from './models/waypoints-model.js';

const headerElement = document.querySelector('.page-header');
const tripMainElement = headerElement.querySelector('.trip-main');
const filtersContainerElement = tripMainElement.querySelector('.trip-controls__filters');
const waypointsSectionElement = document.querySelector('.trip-events');

const mockService = new MockService();
const destinationsModel = new DestinationsModel(mockService);
const offersModel = new OffersModel(mockService);
const waypointsModel = new WaypointsModel(mockService);

const waypointsPresenter = new WaypointsPresenter({
  waypointsContainer: waypointsSectionElement,
  destinationsModel,
  offersModel,
  waypointsModel
});

render(new InfoView, tripMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), filtersContainerElement);

waypointsPresenter.init();
