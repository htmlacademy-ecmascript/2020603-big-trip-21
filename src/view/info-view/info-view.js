import AbstractView from '../../framework/view/abstract-view.js';
import { renderInfoTemplate } from './info-template.js';

export default class InfoView extends AbstractView {
  get template() {
    return renderInfoTemplate();
  }
}
