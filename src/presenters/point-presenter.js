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
  #handleDeletedDataChange = null;

  constructor({ pointsListContainer, offersModel, destinationsModel, onDataChange, onModeChange, onDeletedDataChange }) {
    this.#pointsListContainer = pointsListContainer;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#handleDeletedDataChange = onDeletedDataChange;
  }

  destroy() {
    remove(this.#pointEditComponent);
    remove(this.#pointComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
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

  #handleFormSubmit = (point) => {
    this.#replaceFormToPoint();
    this.#handleDataChange(point);
  };

  #handleCloseClick = () => {
    this.#replaceFormToPoint();
  };

  #handleDeleteClick = () => {
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    remove(this.#pointEditComponent);
    this.#handleDeletedDataChange({...this.#point});
  };

  #handleOpenClick = () => {
    this.#replacePointToForm();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({ ...this.#point, isFavorite: !this.#point.isFavorite });
  };

  init(point) {
    this.#point = point;

    const prevPointEditComponent = this.#pointEditComponent;
    const prevPointComponent = this.#pointComponent;

    this.#pointEditComponent = new PointEditView({ // компонент формы редактирования точки
      point: this.#point,
      pointDestinations: this.#destinationsModel.destinations,
      pointOffers: this.#offersModel.offers,
      onFormSubmit: this.#handleFormSubmit,
      onCloseClick: this.#handleCloseClick,
      onDeleteClick: this.#handleDeleteClick,
    });

    this.#pointComponent = new PointView({ // компонент точки маршрута
      point: this.#point,
      pointDestination: this.#destinationsModel.getById(this.#point.destination),
      pointOffer: this.#offersModel.getByType(this.#point.type),
      onOpenClick: this.#handleOpenClick,
      onFavoriteClick: this.#handleFavoriteClick
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
