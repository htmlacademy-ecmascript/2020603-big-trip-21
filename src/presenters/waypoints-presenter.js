// презентер, отвечающий за рендер точек маршрута (waypoints), формы создания и редактирования точки, а также кнопок сортировки списка точек маршрута
import { render } from '../render.js';
import PointView from '../view/waypoints-view/waypoint-view.js';
import PointAddView from '../view/waypoints-view/waypoint-add-view.js';
import PointsListView from '../view/waypoints-view/points-list-view.js';
import SortView from '../view/sort-view/sort-view.js';

export default class WaypointsPresenter {
  sortComponent = new SortView();
  pointsListComponent = new PointsListView();

  constructor({ waypointsContainer, destinationsModel, offersModel, waypointsModel }) {
    this.waypointsContainer = waypointsContainer;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
    this.waypointsModel = waypointsModel;

    this.waypoints = [...waypointsModel.get()];
  }

  init() {
    render(this.sortComponent, this.waypointsContainer);
    render(this.pointsListComponent, this.waypointsContainer);

    render(new PointAddView(), this.pointsListComponent.getElement()); // форма создания точки маршрута

    this.waypoints.forEach((waypoint) => {
      render(
        new PointView({
          waypoint,
          waypointDestination: this.destinationsModel.getById(waypoint.destination),
          waypointOffers: this.offersModel.getByType(waypoint.type)
        }),
        this.pointsListComponent.getElement()
      );
    });
    // for (let i = 0; i < WAYPOINT_RENDER_COUNT; i++) {
    //   render(new WaypointView(), this.waypointsListComponent.getElement());
    // }
  }
}
