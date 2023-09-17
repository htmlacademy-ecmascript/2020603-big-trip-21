import PointsModel from './models/points-model.js';
import OffersModel from './models/offers-model.js';
import FilterModel from './models/filter-model.js';
import DestinationsModel from './models/destinations-model.js';
import MockService from './mock/mock-service.js';
import NewEventButtonView from './view/button-view/new-point-button-view.js';
import HeaderPresenter from './presenters/header-presenter.js';
import BoardPresenter from './presenters/board-presenter.js';
import { render } from './framework/render.js';

const headerElement = document.querySelector('.page-header');
const tripMainElement = headerElement.querySelector('.trip-main');
const filtersContainer = tripMainElement.querySelector('.trip-controls__filters');
const boardContainer = document.querySelector('.trip-events');

const mockService = new MockService();

const pointsModel = new PointsModel(mockService);
const offersModel = new OffersModel(mockService);
const destinationsModel = new DestinationsModel(mockService);
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter({
  boardContainer,
  destinationsModel,
  pointsModel,
  offersModel,
  filterModel,
  onNewPointDestroy: newPointFormCloseHandler
});

const headerPresenter = new HeaderPresenter({
  pointsModel,
  filterModel,
  filtersContainer,
  tripMainElement,
});

const newEventButtonComponent = new NewEventButtonView({
  onClick: newEventButtonClickHandler
});

function newPointFormCloseHandler() {
  newEventButtonComponent.element.disabled = false;
}

function newEventButtonClickHandler() {
  boardPresenter.createNewPoint();
  newEventButtonComponent.element.disabled = true;
}

render(newEventButtonComponent, tripMainElement);
headerPresenter.init();
boardPresenter.init();
