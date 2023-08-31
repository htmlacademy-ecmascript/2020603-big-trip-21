import AbstractView from '../../framework/view/abstract-view.js';
import { createPointTemplate } from './point-template.js';
import { POINT_EMPTY } from '../../const.js';

export default class PointView extends AbstractView {
  #point = null;
  #pointDestination = null;
  #pointOffers = null;
  #handleEditClick = null;

  constructor({ point = POINT_EMPTY, pointDestination, pointOffers, onEditClick }) {
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;
    this.#handleEditClick = onEditClick; // метод вызова формы редактирования

    this.element.querySelector('.event__rollup-btn') // находим кнопку в элементе
      .addEventListener('click', this.#editClickHandler); // вешаем обработчик
  }

  get template() {
    return createPointTemplate({
      point: this.#point,
      pointDestination: this.#pointDestination,
      pointOffers: this.#pointOffers
    });
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

}
