import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { POINT_EMPTY } from '../../const.js';
import { createPointEditTemplate } from './point-edit-template.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

export default class PointEditView extends AbstractStatefulView {
  #pointDestinations = null;
  #pointOffers = null;
  #handleFormSubmit = null;
  #handleCloseClick = null;
  #handleDeleteClick = null;

  #datepickerTo = null;
  #datepickerFrom = null;

  constructor({ point = POINT_EMPTY, pointDestinations, pointOffers, onFormSubmit, onCloseClick, onDeleteClick }) {
    super();
    this._setState(PointEditView.parsePointToState(point));
    this.#pointDestinations = pointDestinations;
    this.#pointOffers = pointOffers;

    this._restoreHandlers();

    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseClick = onCloseClick;
    this.#handleDeleteClick = onDeleteClick;
  }

  get template() {
    return createPointEditTemplate({
      point: this._state,
      pointDestinations: this.#pointDestinations,
      pointOffers: this.#pointOffers
    });
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset(point) {
    this.updateElement(
      PointEditView.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeClickHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);

    const eventTypes = this.element.querySelectorAll('.event__type-input');
    eventTypes.forEach((element) =>
      element.addEventListener('change', this.#typeChangeHandler)
    );

    const eventOffers = this.element.querySelectorAll('.event__offer-checkbox');
    eventOffers.forEach((element) =>
      element.addEventListener('change', this.#offerChangeHandler)
    );

    this.#setDatepicker();
  }

  #typeChangeHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      type: evt.target.value, offers: []
    });
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState(
      {offers: checkedBoxes.map((item) => item.id)}
    );
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    const priceValue = evt.target.value;

    if (isNaN(priceValue) || priceValue <= 0 || String(priceValue).includes('.')) {
      evt.target.value = '';
      return;
    }

    this.updateElement({
      basePrice: priceValue,
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const selectedDestination = this.#pointDestinations.find((item) => item.name === evt.target.value);

    if(!selectedDestination) {
      evt.target.value = '';
      return;
    }

    this.updateElement({
      destination: selectedDestination.id
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointEditView.parseStateToPoint(this._state));
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseClick();
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick();
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDatepicker() {
    if (this._state.dateFrom && this._state.dateTo) {

      const pointStartTime = this.element.querySelector('#event-start-time-1');
      const pointEndTime = this.element.querySelector('#event-end-time-1');

      this.#datepickerFrom = flatpickr(
        pointStartTime,
        {
          dateFormat: 'd/m/y H:i',
          enableTime: true,
          minDate: 'today',
          defaultDate: this._state.dateFrom,
          onChange: this.#dateFromChangeHandler,
        },
      );

      this.#datepickerTo = flatpickr(
        pointEndTime,
        {
          dateFormat: 'd/m/y H:i',
          enableTime: true,
          minDate: 'today',
          defaultDate: this._state.dateTo,
          onChange: this.#dateToChangeHandler,
        },
      );

    }
  }

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint = (state) => {
    const point = {...state};
    return point;
  };
}

