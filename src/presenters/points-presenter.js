// презентер, отвечающий за рендер точек маршрута (points), формы создания и редактирования точки, а также кнопок сортировки списка точек маршрута
import PointView from '../view/points-view/point-view.js';
import PointEditView from '../view/points-view/point-edit-view.js';
import PointsListView from '../view/points-view/points-list-view.js';
import PointsListEmptyView from '../view/points-view/points-list-empty-view.js';
import SortView from '../view/sort-view/sort-view.js';

import { render, replace, remove } from '../framework/render.js';

export default class PointsPresenter {
  #pointsContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #points = [];

  #sortComponent = new SortView();
  #pointsListComponent = new PointsListView();

  constructor({ pointsContainer, destinationsModel, offersModel, pointsModel }) {
    this.#pointsContainer = pointsContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;

    this.#points = [...this.#pointsModel.get()];
  }

  #renderPoint(point) { // отрисовка точки маршрута
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {// если нажата клавиша Esc, то ...
        evt.preventDefault();// отменяем действия по умолчанию
        replaceFormToPoint();// скрываем форму редактирования и открываем точку
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({ // компонент точки маршрута
      point,
      pointDestination: this.#destinationsModel.getById(point.destination),
      pointOffers: this.#offersModel.getByType(point.type),
      onEditClick: () => { // обработчик клика по стрелке
        replacePointToForm(); // скрываем точку и открываем форму
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new PointEditView({ // компонент формы редактирования точки
      point,
      pointDestination: this.#destinationsModel.get(),
      pointOffers: this.#offersModel.get(),
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onCloseClick: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onDeleteClick: () => {
        document.removeEventListener('keydown', escKeyDownHandler);
        remove(pointEditComponent);
      },
    });

    function replacePointToForm() { //скрываем точку и открываем форму редактирования
      replace(pointEditComponent, pointComponent);
    }
    function replaceFormToPoint() { //скрываем форму редактирования и открываем точку
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#pointsListComponent.element); // отрисовываем точки в контейнер
  }

  #renderPointsList() { // отрисовка всех точек маршрута
    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  init() {
    if (this.#points.length === 0) { // если точек нет, то рисуем заглушку и выходим из функции
      render(new PointsListEmptyView(), this.#pointsContainer);
      return;
    }
    render(this.#sortComponent, this.#pointsContainer); // компонент кнопок сортировки
    render(this.#pointsListComponent, this.#pointsContainer); // компонент точек маршрута
    this.#renderPointsList();
  }
}
