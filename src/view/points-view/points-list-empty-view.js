import AbstractView from '../../framework/view/abstract-view.js';
import { createPointsListEmptyTemplate } from './points-list-empty-template.js';

export default class PointsListEmptyView extends AbstractView {
  get template() {
    return createPointsListEmptyTemplate();
  }
}
