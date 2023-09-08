import PointEditView from '../view/points-view/point-edit-view.js';
import PointView from '../view/points-view/point-view.js';
import { render, replace, remove } from '../framework/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointsListContainer = null;
  #offersModel = null;
  #destinationsModel = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #pointEditComponent = null;
  #pointComponent = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor({ pointsListContainer, offersModel, destinationsModel, onDataChange, onModeChange }) {
    this.#pointsListContainer = pointsListContainer;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  // Обработчики START
  #escKeydownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#resetPoint();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeydownHandler);
    }
  };

  #formSubmitHandler = (point) => {
    this.#replaceFormToPoint();
    this.#handleDataChange(point);
  };

  #closeClickHandler = () => {
    this.#resetPoint();
    this.#replaceFormToPoint();
  };

  #deleteClickHandler = () => {
    document.removeEventListener('keydown', this.#escKeydownHandler);
    remove(this.#pointEditComponent);
  };

  #openClickHandler = () => {
    this.#replacePointToForm();
  };

  #favoriteClickHandler = () => {
    this.#handleDataChange({ ...this.#point, isFavorite: !this.#point.isFavorite });
  };
  // Обработчики END

  destroy() {
    remove(this.#pointEditComponent);
    remove(this.#pointComponent);
  }

  #resetPoint() {
    this.#pointEditComponent.reset(this.#point);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#resetPoint();
      this.#replaceFormToPoint();
    }
  }

  #replacePointToForm() { // скрываем точку и открываем форму редактирования
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeydownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() { // скрываем форму редактирования и открываем точку
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeydownHandler);
    this.#mode = Mode.DEFAULT;
  }

  init(point) {
    this.#point = point;

    const prevPointEditComponent = this.#pointEditComponent;
    const prevPointComponent = this.#pointComponent;

    this.#pointEditComponent = new PointEditView({ // компонент формы редактирования точки
      point: this.#point,
      pointDestinations: this.#destinationsModel.destinations,
      pointOffers: this.#offersModel.offers,
      onFormSubmit: this.#formSubmitHandler,
      onCloseClick: this.#closeClickHandler,
      onDeleteClick: this.#deleteClickHandler,
    });

    this.#pointComponent = new PointView({ // компонент точки маршрута
      point: this.#point,
      pointDestination: this.#destinationsModel.getById(this.#point.destination),
      pointOffer: this.#offersModel.getByType(this.#point.type),
      onOpenClick: this.#openClickHandler,
      onFavoriteClick: this.#favoriteClickHandler
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
}
