import { render } from '../framework/render';
import SortView from '../view/sort-view/sort-view.js';
import PointsListView from '../view/points-view/points-list-view.js';
import NoPointsMessageView from '../view/points-view/no-points-message-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #pointsListComponent = new PointsListView();
  #noPointsMessageComponent = new NoPointsMessageView();
  #sortComponent = null;
  #points = [];
  #pointPresenters = new Map();

  constructor({boardContainer, pointsModel, offersModel, destinationsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#points = [...this.#pointsModel.points];
    this.#renderSort();
  }

  #handleModeChange = () => { // метод, который сбросит представление у всех презентеров точек маршрута на представление по умолчанию
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handlePointDeletedChange = (point) => {
    const filterPoints = this.#points.filter((item) => item.id !== point.id);
    this.#points = filterPoints;
  };

  #renderSort() {
    this.#sortComponent = new SortView();
    render(this.#sortComponent, this.#boardContainer);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#pointsListComponent,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
      onDeletedDataChange: this.#handlePointDeletedChange
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPointsList() {
    if (this.#points.length) {
      render(this.#pointsListComponent, this.#boardContainer);

      this.#points.forEach((point) => {
        this.#renderPoint(point);
      });
    }
  }

  #renderNoPointsMessage() {
    render(this.#noPointsMessageComponent, this.#boardContainer);
  }

  #renderBoard() {
    if (this.#points.length === 0) {
      this.#renderNoPointsMessage();
      return;
    }
    this.#renderPointsList();
  }

  init() {
    this.#renderBoard();
  }
}
