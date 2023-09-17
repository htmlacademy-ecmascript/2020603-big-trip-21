import he from 'he';
import { humanizeDate } from '../../utils/dates.js';
import { convertFirstLetterToUpperCase } from '../../utils/common.js';
import { DateFormat, POINT_EMPTY } from '../../const.js';

function createListOffers(offers, point) {
  return offers.map((item) => {
    const isChecked = point.offers.includes(item.id);
    const checked = isChecked ? 'checked' : '';

    return `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="${item.id}" type="checkbox" name="${item.id}" ${checked}>
        <label class="event__offer-label" for="${item.id}">
        <span class="event__offer-title">${item.title}</span>
          &plus;&euro;&nbsp;
        <span class="event__offer-price">${item.price}</span>
        </label>
      </div>
    `;
  }).join('');
}

function createPictures(pictures) {
  if (pictures) {
    return `
    <div class="event__photos-tape">
      ${(pictures).map((picture) =>
        `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('')}
    </div>
    `;
  } else {
    return '';
  }
}

function createDatalistElement(destinations) {
  const datalistElement = (destinations.length === 0)
    ? ''
    : destinations.map((item) =>
      `<option value="${item.name}"></option>`).join('');

  return `
    <datalist id="destination-list-1">
      ${datalistElement}
    </datalist>
  `;
}

function createTypesList(offerTypes, type) {
  const offerType = (offerTypes.length === 0) ? '' :
    offerTypes.map((item) => (
      `<div class="event__type-item">
        <input
          id="event-type-${item.type}-1"
          class="event__type-input  visually-hidden"
          type="radio"
          name="event-type"
          value="${item.type}"
          ${(item.type === type) ? 'checked' : ''}
        >
        <label class="event__type-label  event__type-label--${item.type}" for="event-type-${item.type}-1">${convertFirstLetterToUpperCase(item.type)}</label>
      </div>`)).join('');

  return `
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
            ${offerType}
      </div>
    </div>
  `;
}

function createPointEditTemplate({ point = POINT_EMPTY, pointDestinations, pointOffers, isNewPoint }) {
  const { dateFrom, dateTo, type, basePrice, destination } = point;
  const offersByType = pointOffers.find((item) => item.type === type).offers;
  const currentDestination = pointDestinations.find((item) => item.id === destination);

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
        ${createTypesList(pointOffers, type)}

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
            </label>
            <input class="event__input  event__input--destination"
              id="event-destination-1"
              type="text" 
              name="event-destination" 
              autocomplete="off" 
              value="${he.encode((currentDestination) ? currentDestination.name : '')}" 
              list="destination-list-1" required>

            ${createDatalistElement(pointDestinations)}
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time"
              id="event-start-time-1"
              type="text"
              name="event-start-time"
              value="${he.encode(humanizeDate(dateFrom, DateFormat.FULL_DATE))}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time"
              id="event-end-time-1"
              type="text"
              name="event-end-time"
              value="${he.encode(humanizeDate(dateTo, DateFormat.FULL_DATE))}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price"
              id="event-price-1"
              type="text"
              name="event-price"
              value="${basePrice}" 
              min="1" 
              autocomplete="off" 
              required>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${(isNewPoint) ? 'Cancel' : 'Delete'}</button>
          ${(isNewPoint) ? '' :
          `<button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>`}
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
            ${createListOffers(offersByType, point)}
            </div>
          </section>
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${(currentDestination) ? currentDestination.description : ''}</p>
            <div class="event__photos-container">
              ${createPictures((currentDestination) ? currentDestination.pictures : '')}
            </div>
          </section>
        </section>
      </form>
    </li>
  `;
}
export { createPointEditTemplate };
