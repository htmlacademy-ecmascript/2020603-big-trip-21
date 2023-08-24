import { generateDestination } from '../mock/destination.js';
import { generateOffer } from '../mock/offers.js';
import { generatePoint } from '../mock/point.js';

import { POINTS_TYPES, DESTINATIONS_COUNT, POINTS_COUNT, OFFERS_COUNT } from '../const.js';
import { getRandomInteger, getRandomArrayElement } from '../utils.js';

export default class MockService {
  destinations = [];
  offers = [];
  points = [];

  constructor() {
    this.destinations = this.generateDestinations();
    this.offers = this.generateOffers();
    this.points = this.generatePoints();
  }

  generateDestinations() {
    return Array.from({ length: DESTINATIONS_COUNT }, () => generateDestination());
  }

  generateOffers() {
    return POINTS_TYPES.map((type) => ({
      type,
      offers: Array.from({ length: getRandomInteger(0, OFFERS_COUNT)}, () => generateOffer(type))
    }));
  }

  generatePoints() {
    return Array.from({ length: POINTS_COUNT }, () => {
      const type = getRandomArrayElement(POINTS_TYPES);
      const destination = getRandomArrayElement(this.destinations);

      const hasOffers = getRandomInteger(0, 1); // значение приведётся к false или true далее в условии

      const offersByType = this.offers.find((offer) => offer.type === type);

      const offerIds = (hasOffers)
        ? offersByType.offers
          .slice(0, getRandomInteger(0, OFFERS_COUNT))
          .map((offer) => offer.id)
        : [];

      return generatePoint(type, destination.id, offerIds);
    });
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getPoints() {
    return this.points;
  }
}
