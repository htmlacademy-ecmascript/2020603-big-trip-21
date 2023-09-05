import { render, RenderPosition } from '../framework/render';
import NewEventButtonView from '../view/button-view/new-event-button-view.js';
import InfoView from '../view/info-view/info-view.js';
import FiltersView from '../view/filters-view/filters-view.js';
import { generateFilters } from '../mock/filter.js';

export default class HeaderPresenter {
  #tripMainElement = null;
  #filtersContainerElement = null;
  #pointsModel = null;
  #filters = [];

  constructor({ filtersContainerElement, tripMainElement, pointsModel }) {
    this.#tripMainElement = tripMainElement;
    this.#filtersContainerElement = filtersContainerElement;
    this.#pointsModel = pointsModel;
    this.#filters = generateFilters(this.#pointsModel.points);
  }

  #renderFilters() {
    render(new FiltersView({ filters: this.#filters }), this.#filtersContainerElement);
  }

  #renderInfo() {
    render(new InfoView(), this.#tripMainElement, RenderPosition.AFTERBEGIN);
  }

  #renderNewEventButton() {
    render(new NewEventButtonView(), this.#tripMainElement);
  }

  #renderHeader() {
    this.#renderFilters();
    this.#renderInfo();
    // this.#renderNewEventButton();
  }

  init() {
    this.#renderHeader();
  }
}
