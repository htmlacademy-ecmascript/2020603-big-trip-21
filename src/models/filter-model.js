import Observable from '../framework/observable.js';
import { DEFAULT_FILTER_OPTION, FILTER_OPTIONS } from '../const.js';

export default class FilterModel extends Observable {
  #currentOption = DEFAULT_FILTER_OPTION;

  get currentOption() {
    return this.#currentOption;
  }

  setOption(updateType, filterName) {
    this.#currentOption = FILTER_OPTIONS.find((option) => option.name === filterName);
    this._notify(updateType, filterName);
  }
}
