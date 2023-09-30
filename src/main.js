import { AUTHORIZATION, END_POINT } from './const.js';
import PointsModel from './models/points-model.js';
import PointsApiService from './points-api-service.js';
import OffersModel from './models/offers-model.js';
import DestinationsModel from './models/destinations-model.js';
import FilterModel from './models/filter-model.js';
import BoardPresenter from './presenters/board-presenter.js';
import SummaryPresenter from './presenters/summary-presenter.js';
import FilterPresenter from './presenters/filter-presenter.js';

const headerContainer = document.querySelector('.trip-main');
const summaryContainer = headerContainer.querySelector('.trip-controls');
const filterContainer = headerContainer.querySelector('.trip-controls__filters');
const boardContainer = document.querySelector('.trip-events');

const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel({ pointsApiService });
const offersModel = new OffersModel({ pointsApiService });
const destinationsModel = new DestinationsModel({ pointsApiService });
const filterModel = new FilterModel();

Promise.all([
  offersModel.init(),
  destinationsModel.init()
]).then(() => pointsModel.init());

const summaryPresenter = new SummaryPresenter({
  summaryContainer,
  pointsModel,
  offersModel,
  destinationsModel
});
summaryPresenter.init();

const filterPresenter = new FilterPresenter({
  filterContainer,
  filterModel,
  pointsModel
});
filterPresenter.init();

const boardPresenter = new BoardPresenter({
  boardContainer,
  headerContainer,
  pointsModel,
  offersModel,
  destinationsModel,
  filterModel
});
boardPresenter.init();
