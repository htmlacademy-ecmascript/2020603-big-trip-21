import { isFormValid } from '../../utils/common.js';
import { POINT_TYPES } from '../../const.js';
import dayjs from 'dayjs';
import he from 'he';

function createOffersTemplate(point, offers) {
  const offersByType = offers.find((offer) => offer.type === point.type).offers;

  if (offersByType.length === 0) {
    return '';
  }

  const disableStatus = point.isDisabled ? 'disabled' : '';

  const offersTemplate = offersByType.map((offer) => /*html*/`
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" type="checkbox" name="event-offer-luggage"
        id="event-offer-${point.id ? he.encode(point.id) : ''}-${he.encode(offer.id)}"
        value="${he.encode(offer.id)}"
        ${point.offers.includes(offer.id) ? 'checked' : ''} "
        ${disableStatus}
      >
      <label class="event__offer-label" for="event-offer-${point.id ? he.encode(point.id) : ''}-${he.encode(offer.id)}">
        <span class="event__offer-title">${he.encode(offer.title)}</span>
        +&euro;&nbsp;
        <span class="event__offer-price">${he.encode(String(offer.price))}</span>
      </label>
    </div>
  `).join(' ');

  return /*html*/`
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offersTemplate}
      </div>
    </section>
  `;
}

function createPicturesTemplate(pictures) {
  if (pictures.length === 0) {
    return '';
  }
  const picturesTemplate = pictures.map(({ src, description }) => /*html*/`
    <img class="event__photo" src="${he.encode(src)}" alt="${he.encode(description)}"></img>
  `).join(' ');

  return /*html*/`
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${picturesTemplate}
      </div>
    </div>`;
}

function createDestinationTemplate(pointDestination) {
  if (!pointDestination) {
    return '';
  }

  if (pointDestination.description.length === 0 && pointDestination.pictures.length === 0) {
    return '';
  }

  const descriptionTemplate = pointDestination.description.length === 0 ? '' :
    `<p class="event__destination-description">
      ${he.encode(pointDestination.description)}
    </p>`;

  return /*html*/`
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      ${descriptionTemplate}
      ${createPicturesTemplate(pointDestination.pictures)}
    </section>
  `;
}

function getSubmitButtonName(point) {
  if (!point.id) {
    return 'Cancel';
  }

  return (point.isDeleting ? 'Deleting...' : 'Delete');
}

export function createTemplate(point, allOffers, allDestinations) {
  const pointId = point.id ? he.encode(point.id) : '';
  const pointType = he.encode(point.type);
  const pointPrice = he.encode(String(point.basePrice));
  const pointDestinationInfo = allDestinations.find((destination) => destination.id === point.destination);
  const dateFromFormated = !point.dateFrom ? '' : dayjs(point.dateFrom).format('DD/MM/YY HH:mm');
  const dateToFormated = !point.dateTo ? '' : dayjs(point.dateTo).format('DD/MM/YY HH:mm');

  const disableStatus = point.isDisabled ? 'disabled' : '';

  const pointIconTemplate = POINT_TYPES.map((type) => /*html*/`
      <div class="event__type-item">
        <input class="event__type-input  visually-hidden" type="radio" name="event-type"
          id="event-type-${type.toLowerCase()}-${pointId}"
          value="${type}"
          ${pointType === type.toLowerCase() ? 'checked' : ''}
        >
        <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-${pointId}">${type}</label>
      </div>
    `).join(' ');

  const destinationsNamesTemplate = allDestinations.map((destination) => /*html*/`
    <option value="${he.encode(destination.name)}"></option>
    `).join(' ');

  return /*html*/`
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${pointId}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${pointType}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" type="checkbox"
              id="event-type-toggle-${pointId}"
              ${disableStatus}
            >

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${pointIconTemplate}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${pointType}
            </label>
            <input required class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" list="destination-list-1" required
              value="${he.encode(pointDestinationInfo?.name ?? '')}"
              ${disableStatus}
            >
            <datalist id="destination-list-1">
              ${destinationsNamesTemplate}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" required
              value="${dateFromFormated ?? ''}"
              ${disableStatus}
            >
            —
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" required
              value="${dateToFormated ?? ''}"
              ${disableStatus}
            >
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" min="1" required
              value="${pointPrice}"
              ${disableStatus}
            >
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit"
            ${isFormValid(point) && !point.isDisabled ? '' : 'disabled'}
          >
            ${point.isSaving ? 'Saving...' : 'Save'}
          </button>
          <button class="event__reset-btn" type="reset"
            ${disableStatus}
          >
            ${getSubmitButtonName(point)}
           </button>
           ${!pointId ? '' : `<button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>`}
        </header>
        <section class="event__details">
          ${createOffersTemplate(point, allOffers)}
          ${createDestinationTemplate(pointDestinationInfo)}
        </section>
      </form>
    </li>
  `;
}
