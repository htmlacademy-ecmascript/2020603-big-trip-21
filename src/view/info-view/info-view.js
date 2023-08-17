import { createElement } from '../../render.js';
import { createInfoTemplate } from './info-template.js';

export default class InfoView {
  getTemplate() {
    return createInfoTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
