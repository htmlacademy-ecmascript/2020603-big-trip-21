import AbstractView from '../../framework/view/abstract-view.js';
import { createNoPointsMessageTemplate } from './no-points-message-template.js';

export default class NoPointsMessageView extends AbstractView {
  get template() {
    return createNoPointsMessageTemplate();
  }
}
