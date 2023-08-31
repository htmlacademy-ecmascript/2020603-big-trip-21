import AbstractView from '../../framework/view/abstract-view.js';
import { createInfoTemplate } from './info-template.js';

export default class InfoView extends AbstractView {
  get template() {
    return createInfoTemplate();
  }
}
