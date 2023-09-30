import { UpdateType, UserAction } from '../const';
import { RenderPosition, remove, render } from '../framework/render';
import { isEscapeKeydown } from '../utils/common.js';
import FormView from '../views/points-view/form-view';

export default class NewPointPresenter {
  #pointsListContainer = null;
  #formComponent = null;

  #offers = null;
  #destinations = null;

  #handleDataChange = null;
  #handleDestroy = null;

  constructor({ pointsListContainer, offers, destinations, onDataChange, onDestroy}) {
    this.#pointsListContainer = pointsListContainer;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleCloseClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (isEscapeKeydown(evt.key)) {
      evt.preventDefault();
      this.destroy();
    }
  };

  init() {
    if (this.#formComponent !== null) {
      return;
    }

    this.#formComponent = new FormView({
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleCloseClick,
      onCloseClick: this.#handleCloseClick,
    });

    render(this.#formComponent, this.#pointsListContainer, RenderPosition.AFTERBEGIN);
    this.#formComponent.setDatePicker();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#formComponent === null) {
      return;
    }


    remove(this.#formComponent);
    this.#formComponent = null;
    this.#handleDestroy();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#formComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#formComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#formComponent.shake(resetFormState);
  }
}
