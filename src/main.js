import PointsModel from './models/points-model.js';
import OffersModel from './models/offers-model.js';
import DestinationsModel from './models/destinations-model.js';
import MockService from './service/mock-service.js';
import HeaderPresenter from './presenters/header-presenter.js';
import BoardPresenter from './presenters/board-presenter.js';

const headerElement = document.querySelector('.page-header');
const tripMainElement = headerElement.querySelector('.trip-main');
const filtersContainerElement = tripMainElement.querySelector('.trip-controls__filters');
const pointsSectionElement = document.querySelector('.trip-events');

const mockService = new MockService();
const pointsModel = new PointsModel(mockService);
const offersModel = new OffersModel(mockService);
const destinationsModel = new DestinationsModel(mockService);

const boardPresenter = new BoardPresenter({
  boardContainer: pointsSectionElement,
  destinationsModel,
  pointsModel,
  offersModel
});
const headerPresenter = new HeaderPresenter({
  filtersContainerElement,
  tripMainElement,
  pointsModel
});

headerPresenter.init();
boardPresenter.init();
