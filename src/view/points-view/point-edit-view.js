import AbstractView from '../../framework/view/abstract-view.js';
import { createPointEditTemplate } from './point-edit-template.js';
import { POINT_EMPTY } from '../../const.js';

export default class PointEditView extends AbstractView {
  #point = null;
  #pointDestination = null;
  #pointOffers = null;
  #handleFormSubmit = null;
  #handleCloseClick = null;
  #handleDeleteClick = null;

  constructor({ point = POINT_EMPTY, pointDestination, pointOffers, onFormSubmit, onCloseClick, onDeleteClick }) {
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;
    this.#handleFormSubmit = onFormSubmit; // сохранение формы
    this.#handleCloseClick = onCloseClick; // закрытие формы
    this.#handleDeleteClick = onDeleteClick; // удаление формы и, соответственно, точки маршрута

    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeClickHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
  }

  get template() {
    return createPointEditTemplate({
      point: this.#point,
      pointDestination: this.#pointDestination,
      pointOffers: this.#pointOffers
    });
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseClick();
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick();
  };

}
