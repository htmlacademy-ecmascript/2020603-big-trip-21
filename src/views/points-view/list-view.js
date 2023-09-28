import AbstractView from '../../framework/view/abstract-view.js';
import { createTemplate } from './list-template.js';

export default class ListView extends AbstractView {

  get template() {
    return createTemplate();
  }
}
