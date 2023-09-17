import { render, RenderPosition } from '../framework/render';
import InfoView from '../view/info-view/info-view.js';
import FilterPresenter from './filter-presenter';

export default class HeaderPresenter {
  #pointsModel = null;
  #filterModel = null;

  #tripMainElement = null;
  #filtersContainer = null;

  constructor({ filtersContainer, tripMainElement, pointsModel, filterModel }) {
    this.#tripMainElement = tripMainElement;
    this.#filtersContainer = filtersContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
  }

  #renderInfo() {
    render(new InfoView(), this.#tripMainElement, RenderPosition.AFTERBEGIN);
  }

  #renderFilter() {
    const filterPresenter = new FilterPresenter({
      filtersContainer: this.#filtersContainer,
      filterModel: this.#filterModel,
      pointsModel: this.#pointsModel,
    });

    filterPresenter.init();
  }

  #renderHeader() {
    this.#renderFilter();
    this.#renderInfo();
  }

  init() {
    this.#renderHeader();
  }
}

