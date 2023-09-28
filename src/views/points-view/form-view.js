import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { POINT_EMPTY } from '../../const.js';
import { isFormValid } from '../../utils/common.js';
import { createTemplate } from './form-template.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default class FormView extends AbstractStatefulView {
  #offers = [];
  #destinations = [];
  #handleFormSubmit = null;
  #datepickerTo = null;
  #datepickerFrom = null;
  #handleDeleteClick = null;
  #handleCloseClick = null;

  constructor({ point = POINT_EMPTY, offers, destinations, onFormSubmit, onDeleteClick, onCloseClick = null }) {
    super();
    this._setState(FormView.parsePointToState(point));
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;
    this.#handleCloseClick = onCloseClick;

    this._restoreHandlers();
  }

  get template() {
    return createTemplate(this._state, this.#offers, this.#destinations);
  }

  updateElement(update) {
    super.updateElement(update);
    this.setDatePicker();
  }

  removeElement() {
    super.removeElement();

    if(this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if(this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.element.querySelector('.event__details').addEventListener('click', this.#offersChangeHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    this.element.querySelector('.event__rollup-btn')?.addEventListener('click', this.#formCloseClickHandler);
  }

  reset(point) {
    this.updateElement(FormView.parsePointToState(point),);
  }

  #validateForm() {
    this.element.querySelector('.event__save-btn').disabled = !isFormValid(this._state);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(FormView.parseStateToPoint(this._state));
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    if (this._state.id) {
      this.#handleDeleteClick(FormView.parseStateToPoint(this._state));
      return;
    }
    this.#handleDeleteClick();
  };

  #formCloseClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseClick();
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({type: evt.target.value.toLowerCase(), offers: []});
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const chosenDestination = this.#destinations.find((destination) => destination.name === evt.target.value);
    const chosenDestinationId = chosenDestination ? chosenDestination.id : '';

    this.updateElement({destination: chosenDestinationId});
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({ basePrice: evt.target.valueAsNumber });
    this.#validateForm();
  };

  #offersChangeHandler = (evt) => {
    if (!evt.target.classList.contains('event__offer-checkbox')) {
      return;
    }

    const chosenOffers = this._state.offers;
    const offerId = evt.target.value;
    const offerIndex = chosenOffers.indexOf(offerId);

    if (offerIndex >= 0) {
      chosenOffers.splice(offerIndex, 1);
    } else {
      chosenOffers.push(offerId);
    }

    this._setState({offers: chosenOffers});
  };

  #dateFromChangeHandler = ([userDate]) => {
    this._setState({dateFrom: userDate});
    this.#datepickerTo.set({minDate: this._state.dateFrom});
    this.#validateForm();
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({dateTo: userDate});
    this.#datepickerFrom.set({maxDate: this._state.dateTo});
    this.#validateForm();
  };

  setDatePicker() {
    const commonSettings = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: {firstDayOfWeek: 1},
      'time_24hr': true,
    };

    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        ...commonSettings,
        defaultDate: this._state.dateFrom,
        onClose: this.#dateFromChangeHandler,
        maxDate: this._state.dateTo,
      },
    );

    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        ...commonSettings,
        defaultDate: this._state.dateTo,
        onClose: this.#dateToChangeHandler,
        minDate: this._state.dateFrom,
      },
    );
  }

  static parsePointToState(point) {
    return {
      ...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = { ...state };

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }
}
