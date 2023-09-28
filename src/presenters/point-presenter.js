import FormView from '../views/points-view/form-view';
import PointView from '../views/points-view/point-view';
import { UserAction, UpdateType, Mode } from '../const.js';
import { remove, render, replace } from '../framework/render';
import { isEscapeKeydown } from '../utils/common.js';

export default class PointPresenter {
  #pointsListContainer = null;
  #point = null;
  #pointComponent = null;
  #formComponent = null;

  #offersModel = null;
  #destinationsModel = null;

  #handlePointChange = null;
  #handleModeChange = null;

  #mode = Mode.DEFAULT;

  constructor({ pointsListContainer, offersModel, destinationsModel, onPointChange, onModeChange }) {
    this.#pointsListContainer = pointsListContainer;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handlePointChange = onPointChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevFormComponent = this.#formComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      offers: this.#offersModel.getOffersByIds(this.#point.offers),
      destination: this.#destinationsModel.getDestinationById(this.#point.destination),
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick
    });

    this.#formComponent = new FormView({
      point: this.#point,
      offers: this.#offersModel.offers,
      destinations: this.#destinationsModel.destinations,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      onCloseClick: this.#handleCloseClick
    });

    if (prevPointComponent === null || prevFormComponent === null) {
      render(this.#pointComponent, this.#pointsListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointComponent, prevFormComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevFormComponent);
  }

  destroy() {
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    remove(this.#pointComponent);
    remove(this.#formComponent);
  }

  closeForm() {
    this.#formComponent.reset(this.#point);
    this.#replaceFormToPoint();
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#formComponent.updateElement({
        isDisabled: true,
        isSaving: true
      });
    }
  }

  setDeleting() {
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    if (this.#mode === Mode.EDITING) {
      this.#formComponent.updateElement({
        isDisabled: true,
        isDeleting: true
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#formComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#formComponent.shake(resetFormState);
  }

  #replacePointToForm() {
    replace(this.#formComponent, this.#pointComponent);
    this.#formComponent.setDatePicker();
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.EDITING;
    this.#handleModeChange(this.#point.id);
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#formComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
    this.#handleModeChange(this.#point.id, this.#mode);
  }

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleFormSubmit = (point) => {
    this.#handlePointChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleFavoriteClick = () => {
    this.#handlePointChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  };

  #handleDeleteClick = (point) => {
    this.#handlePointChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleCloseClick = () => {
    this.closeForm();
  };

  #escKeyDownHandler = (evt) => {
    if(!isEscapeKeydown(evt.key)) {
      return;
    }
    evt.preventDefault();
    this.closeForm();
  };

}
