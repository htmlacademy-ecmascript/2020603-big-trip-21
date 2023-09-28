import FilterView from '../views/filters-view/filters-view.js';
import { render, replace, remove } from '../framework/render.js';
import { FILTER_OPTIONS, UpdateType } from '../const.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;

  #filterComponent = null;

  constructor({ filterContainer, filterModel, pointsModel }) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#pointsModel.points;

    return FILTER_OPTIONS.reduce((accumulator, option) => {
      accumulator[option.name] = Boolean(points.filter(option.filterCb).length);
      return accumulator;
    }, {});
  }

  init() {
    const prevFilterComponent = this.#filterComponent;
    this.#filterComponent = new FilterView({
      filters: this.filters,
      currentOptionName: this.#filterModel.currentOption.name,
      onOptionChange: this.#handleFilterOptionChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterOptionChange = (optionName) => {
    this.#filterModel.setOption(UpdateType.MAJOR, optionName);
  };
}
