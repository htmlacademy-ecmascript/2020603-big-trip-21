import { RenderPosition, render } from './render.js';

import PointsPresenter from './presenters/points-presenter.js';
import InfoView from './view/info-view/info-view.js';
import FilterView from './view/filter-view/filter-view.js';

import MockService from './service/mock-service.js';
import DestinationsModel from './models/destinations-model.js';
import OffersModel from './models/offers-model.js';
import PointsModel from './models/points-model.js';

const headerElement = document.querySelector('.page-header');
const tripMainElement = headerElement.querySelector('.trip-main');
const filtersContainerElement = tripMainElement.querySelector('.trip-controls__filters');
const pointsSectionElement = document.querySelector('.trip-events');

const mockService = new MockService();
const destinationsModel = new DestinationsModel(mockService);
const offersModel = new OffersModel(mockService);
const pointsModel = new PointsModel(mockService);

const pointsPresenter = new PointsPresenter({
  pointsContainer: pointsSectionElement,
  destinationsModel,
  offersModel,
  pointsModel
});

render(new InfoView, tripMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), filtersContainerElement);

pointsPresenter.init();
