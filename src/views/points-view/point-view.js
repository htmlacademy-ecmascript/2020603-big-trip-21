import AbstractView from '../../framework/view/abstract-view.js';
import { createTemplate } from './point-template.js';

export default class PointView extends AbstractView {
  #point = {};
  #offers = [];
  #destination = {};
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({ point, offers, destination, onEditClick, onFavoriteClick }) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destination = destination;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn ').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createTemplate(this.#point, this.#offers, this.#destination);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
