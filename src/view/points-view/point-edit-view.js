import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { POINT_EMPTY } from '../../const.js';
import { renderPointEditTemplate } from './point-edit-template.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default class PointEditView extends AbstractStatefulView {
  #pointDestinations = null;
  #pointOffers = null;
  #handleFormSubmit = null;
  #handleCloseClick = null;
  #handleDeleteClick = null;

  #datepickerFrom = null;
  #datepickerTo = null;

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
    return renderPointEditTemplate({
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
    this.element
      .querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#closeClickHandler);
    this.element
      .querySelector('.event__reset-btn')
      .addEventListener('click', this.#deleteClickHandler);
    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
    this.element
      .querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);

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
      {offers: checkedBoxes.map((item) => item.id)}
    );
  };

  #priceChangeHandler = (evt) => { // Обработчик события "изменение цены"
    evt.preventDefault();
    const priceValue = evt.target.value;

    if (isNaN(priceValue) || priceValue <= 0 || String(priceValue).includes('.')) {
      evt.target.value = '';
      return;
    }

    this._setState({
      basePrice: priceValue,
    });
  };

  #destinationChangeHandler = (evt) => { // Обработчик события "смена направления (города) точки"
    evt.preventDefault();
    const selectedDestination = this.#pointDestinations
      .find((pointDestination) => pointDestination.name === evt.target.value);

    if(!selectedDestination) {
      evt.target.value = '';
      this.element.querySelector('.event__save-btn').disabled = true;
      return;
    }

    this.element.querySelector('.event__save-btn').disabled = false;

    this.updateElement({
      destination: selectedDestination.id
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointEditView.parseStateToPoint(this._state));
  };

  #closeClickHandler = (evt) => { // Обработчик события "клик по стрелке вверх"
    evt.preventDefault();
    this.#handleCloseClick();
  };

  #deleteClickHandler = (evt) => { // Обработчик события "удаление формы редактирования точки"
    evt.preventDefault();
    this.#handleDeleteClick();
  };

  #dateFromCloseHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate
    });
    this.#datepickerTo.set('minDate', this._state.dateFrom);
  };

  #dateToCloseHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate
    });
    this.#datepickerFrom.set('maxDate', this._state.dateTo);
  };

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

    this.#datepickerFrom = flatpickr(dateStartElement,
      {
        ...commonConfig,
        // minDate: 'today',
        maxDate: this._state.dateTo,
        defaultDate: this._state.dateFrom,
        onClose: this.#dateFromCloseHandler,
      },
    );

    this.#datepickerTo = flatpickr(dateEndElement,
      {
        ...commonConfig,
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onClose: this.#dateToCloseHandler,
      },
    );
  }

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    return { ...state };
  }
}

