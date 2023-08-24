import { POINT_EMPTY } from '../../const.js';
import { formatStringToDateTime } from '../../utils.js';

function createTypesListTemplate(offerTypes, type) {
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
        <label class="event__type-label  event__type-label--${item.type}" for="event-type-${item.type}-1">${item.type}</label>
      </div>`)).join('');

  return (
    `<div class="event__type-wrapper">
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
     </div>`);
}

function createListOffers(offers) {
  return offers.map((offer) => {
    const isChecked = !offers.includes(offer.id);
    const checked = isChecked ? 'checked' : '';

    return (
      `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="${offer.id}" type="checkbox" name="${offer.id}" ${checked}>
    <label class="event__offer-label" for="${offer.id}">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
      </div>`
    );
  }).join('');
}

function createPhotos(photos) {
  return photos.map((photo) => (`<img class="event__photo" src=${photo.src} alt="${photo.description}">`)).join('');
}

function createPointEditTemplate({ point = POINT_EMPTY, pointDestination, pointOffers }) {
  const { dateFrom, dateTo, type, basePrice } = point;
  const offersByType = pointOffers.find((item) => item.type === type).offers;
  const currentDestination = pointDestination.find((item) => item.id === point.destination);

  return `
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        ${createTypesListTemplate(pointOffers, type)}

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${currentDestination.name}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatStringToDateTime(dateFrom)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatStringToDateTime(dateTo)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${createListOffers(offersByType)}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${currentDestination.description}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${createPhotos(pointDestination[0].pictures)}
            </div>
          </div>
        </section>
      </section>
    </form>
  </li>
  `;
}

export { createPointEditTemplate };
