import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { POINT_EMPTY } from '../../const.js';
import { createPointEditTemplate } from './point-edit-template.js';
import flatpickr from 'flatpickr';
import he from 'he';
import 'flatpickr/dist/flatpickr.min.css';

export default class PointEditView extends AbstractStatefulView {
  #pointDestinations = null;
  #pointOffers = null;

  #handleFormSubmit = null;
  #handleCloseClick = null;
  #handleDeleteClick = null;

  #datepickerFrom = null;
  #datepickerTo = null;
  #isNewPoint = false;

  constructor({ point = POINT_EMPTY, pointDestinations, pointOffers, onFormSubmit, onCloseClick, onDeleteClick, isNewPoint }) {
    super();
    this._setState(PointEditView.parsePointToState(point));

    this.#pointDestinations = pointDestinations;
    this.#pointOffers = pointOffers;
    this.#isNewPoint = isNewPoint;
    this._restoreHandlers();

    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseClick = onCloseClick;
    this.#handleDeleteClick = onDeleteClick;
  }

  get template() {
    return createPointEditTemplate({
      point: this._state,
      pointDestinations: this.#pointDestinations,
      pointOffers: this.#pointOffers,
      isNewPoint: this.#isNewPoint
    });
  }

  // Обработчики START
  #typeChangeHandler = (evt) => { // Обработчик события "смена типа точки". Например, тип Ship меняем на Train
    evt.preventDefault();

    this.updateElement({
      type: evt.target.value,
      offers: [] // При смене типа точки все выбранные офферы (отмечены синим цветом) сбрасываются
    });
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();

    const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState(
      { offers: checkedBoxes.map((item) => item.id) }
    );
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();

    const selectedDestination = this.#pointDestinations.find((item) => item.name === evt.target.value);
    const selectedDestinationId = (selectedDestination)
      ? selectedDestination.id
      : null;

    this.updateElement({
      destination: selectedDestinationId
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();

    const newPrice = parseInt(he.encode(evt.target.value), 10);

    if (newPrice < 0) {
      this.updateElement({
        basePrice: Math.abs(newPrice)
      });
      return;
    }

    this.updateElement({
      basePrice: (Number.isNaN(newPrice) ? 0 : newPrice)
    });

    // this._setState({
    //   basePrice: newPrice,
    // });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointEditView.parseStateToPoint(this._state));
    this.#isNewPoint = null;
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseClick();
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(PointEditView.parseStateToPoint(this._state));
  };

  #dateFromCloseHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate,
    });
    this.#datepickerTo.set('minDate', this._state.dateFrom);
  };

  #dateToCloseHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate,
    });
    this.#datepickerFrom.set('maxDate', this._state.dateTo);
  };
  // Обработчики END

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
    this.element
      .querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    
    this.element
      .querySelector('.event__reset-btn')
      .addEventListener('click', this.#deleteClickHandler);
    
    if (!this.#isNewPoint) {
      this.element
        .querySelector('.event__rollup-btn')
        .addEventListener('click', this.#closeClickHandler);
    }

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
    
    this.element
      .querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);

    const pointTypes = this.element.querySelectorAll('.event__type-input');
    pointTypes.forEach((element) =>
      element.addEventListener('change', this.#typeChangeHandler)
    );

    const pointOffers = this.element.querySelectorAll('.event__offer-checkbox');
    pointOffers.forEach((element) =>
      element.addEventListener('change', this.#offerChangeHandler)
    );

    this.#setDatepicker();
  }

  #setDatepicker() {
    const dateStartElement = this.element.querySelector('#event-start-time-1');
    const dateEndElement = this.element.querySelector('#event-end-time-1');
    const commonConfig = {
      enableTime: true,
      dateFormat: 'd/m/y H:i',
      minuteIncrement: 1,
      locale: {
        firstDayOfWeek: 1,
      },
      'time_24hr': true,
    };

    this.#datepickerFrom = flatpickr(
      dateStartElement,
      {
        ...commonConfig,
        // minDate: 'today',
        maxDate: this._state.dateTo,
        defaultDate: this._state.dateFrom,
        onClose: this.#dateFromCloseHandler,
      },
    );

    this.#datepickerTo = flatpickr(
      dateEndElement,
      {
        ...commonConfig,
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onClose: this.#dateToCloseHandler,
      },
    );
  }

  static parsePointToState(point) {
    return { ...point };
  }

  static parseStateToPoint(state) {
    return { ...state };
  }
}
