// презентер, отвечающий за рендер точек маршрута (points), формы создания и редактирования точки, а также кнопок сортировки списка точек маршрута
import { render } from '../render.js';
import PointView from '../view/points-view/point-view.js';
import PointAddView from '../view/points-view/point-add-view.js';
import PointsListView from '../view/points-view/points-list-view.js';
import SortView from '../view/sort-view/sort-view.js';

export default class PointsPresenter {
  sortComponent = new SortView();
  pointsListComponent = new PointsListView();

  constructor({ pointsContainer, destinationsModel, offersModel, pointsModel }) {
    this.pointsContainer = pointsContainer;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
    this.pointsModel = pointsModel;

    this.points = [...pointsModel.get()];
  }

  init() {
    render(this.sortComponent, this.pointsContainer);
    render(this.pointsListComponent, this.pointsContainer);

    render(new PointAddView(), this.pointsListComponent.getElement()); // форма создания точки маршрута

    this.points.forEach((point) => {
      render(
        new PointView({
          point,
          pointDestination: this.destinationsModel.getById(point.destination),
          pointOffers: this.offersModel.getByType(point.type)
        }),
        this.pointsListComponent.getElement()
      );
    });
  }
}
