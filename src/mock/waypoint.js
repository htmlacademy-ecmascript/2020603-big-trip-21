import { getRandomInteger } from '../utils.js';
import { Price } from '../const.js';
import { getDate } from '../utils.js';

function generateWaypoint(type, destinationId, offerIds) {
  return {
    id: crypto.randomUUID(),
    basePrice: getRandomInteger(Price.MIN, Price.MAX),
    dateFrom: getDate({next: false}),
    dateTo: getDate({next: true}),
    destination: destinationId,
    isFavorite: !!getRandomInteger(0, 1),
    offers: offerIds,
    type
  };
}

export { generateWaypoint };
