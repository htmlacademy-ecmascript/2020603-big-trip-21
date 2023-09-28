import AbstractView from '../../framework/view/abstract-view';
import { createTemplate } from './loading-template.js';

export default class LoadingView extends AbstractView {
  get template() {
    return createTemplate();
  }
}
