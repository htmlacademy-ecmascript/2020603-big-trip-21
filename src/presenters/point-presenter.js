import { render, replace, remove } from '../framework/render';
import PointEditView from '../view/points-view/point-edit-view.js';
import PointView from '../view/points-view/point-view.js';
import { UserAction, UpdateType } from '../const.js';
import { isDatesEqual } from '../utils/dates.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointsListContainer = null;
  #point = null;
  #pointComponent = null;
  #pointEditComponent = null;

  #offersModel = null;
  #destinationsModel = null;

  #handleDataChange = null;
  #handleModeChange = null;

  #mode = Mode.DEFAULT;

  constructor({ pointsListContainer, offersModel, destinationsModel, onDataChange, onModeChange }) {
    this.#pointsListContainer = pointsListContainer;

    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  // Обработчики START
  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#resetPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #formSubmitHandler = (update) => {
    // Проверяем, поменялись ли в задаче данные, которые попадают под фильтрацию,
    // а значит требуют перерисовки списка - если таких нет, это PATCH-обновление
    const isMinorUpdate =
      !isDatesEqual(this.#point.dateFrom, update.dateFrom) ||
      !isDatesEqual(this.#point.dateTo, update.dateTo);

    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update
    );
    this.#replaceFormToPoint();
  };

  #closeClickHandler = () => {
    this.#resetPoint();
  };

  #deleteClickHandler = (point) => {
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #openClickHandler = () => {
    this.#replacePointToForm();
  };

  #favoriteClickHandler = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {
        ...this.#point,
        isFavorite: !this.#point.isFavorite
      });
  };
  // Обработчики END

  #resetPoint() {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceFormToPoint();
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#resetPoint();
    }
  }

  #replacePointToForm() { // скрываем точку и открываем форму редактирования
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() { // скрываем форму редактирования и открываем точку
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  init(point) {
    this.#point = point;

    const prevPointEditComponent = this.#pointEditComponent;
    const prevPointComponent = this.#pointComponent;

    this.#pointComponent = new PointView({ // компонент точки маршрута
      point: this.#point,
      pointDestination: this.#destinationsModel.getById(this.#point.destination),
      pointOffer: this.#offersModel.getByType(this.#point.type),
      onOpenClick: this.#openClickHandler,
      onFavoriteClick: this.#favoriteClickHandler
    });

    this.#pointEditComponent = new PointEditView({ // компонент формы редактирования точки маршрута
      point: this.#point,
      pointDestinations: this.#destinationsModel.destinations,
      pointOffers: this.#offersModel.offers,
      onFormSubmit: this.#formSubmitHandler,
      onCloseClick: this.#closeClickHandler,
      onDeleteClick: this.#deleteClickHandler
    });

    if (prevPointEditComponent === null || prevPointComponent === null) {
      render(this.#pointComponent, this.#pointsListContainer.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointEditComponent);
    remove(this.#pointComponent);
  }
}
