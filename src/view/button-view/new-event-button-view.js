import AbstractView from '../../framework/view/abstract-view.js';
import { renderNewEventButtonTemplate } from './new-event-button-template.js';

export default class NewEventButtonView extends AbstractView {
  get template() {
    return renderNewEventButtonTemplate();
  }
}
