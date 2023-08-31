import AbstractView from '../../framework/view/abstract-view.js';
import { createPointsListTemplate } from './points-list-template.js';

export default class PointsListView extends AbstractView {
  get template() {
    return createPointsListTemplate();
  }
}
