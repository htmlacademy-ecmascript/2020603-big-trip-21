// презентер, отвечающий за рендер точек маршрута (waypoints), формы создания и редактирования точки, а также кнопок сортировки списка точек маршрута
import { render } from '../render.js';
import WaypointView from '../view/waypoints-view/waypoint-view.js';
import WaypointAddView from '../view/waypoints-view/waypoint-add-view.js';
import WaypointsListView from '../view/waypoints-view/waypoints-list-view.js';
import SortView from '../view/sort-view/sort-view.js';

const RENDER_COUNT = 3;

export default class WaypointsPresenter {
  waypointsListComponent = new WaypointsListView();

  constructor({ waypointsContainer }) {
    this.waypointsContainer = waypointsContainer;
  }

  init() {
    render(new SortView(), this.waypointsContainer);
    render(new WaypointAddView(), this.waypointsListComponent.getElement()); // форма создания точки маршрута
    render(this.waypointsListComponent, this.waypointsContainer);

    for (let i = 0; i < RENDER_COUNT; i++) {
      render(new WaypointView(), this.waypointsListComponent.getElement());
    }
  }
}
