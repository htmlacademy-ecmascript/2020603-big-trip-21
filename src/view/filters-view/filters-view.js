import AbstractView from '../../framework/view/abstract-view.js';
import { renderFiltersTemplate } from './fitlers-template.js';

export default class FiltersView extends AbstractView {
  get template() {
    return renderFiltersTemplate();
  }
}
