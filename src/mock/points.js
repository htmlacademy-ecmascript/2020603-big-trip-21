import { getDate } from '../utils/dates.js';
import { getRandomInt } from '../utils/common.js';

function generateMockPoints(type, destinationId, offerIds) {
  return {
    id: crypto.randomUUID(),
    basePrice: getRandomInt(1, 3000),
    dateFrom: getDate({ next: false }),
    dateTo: getDate({ next: true }),
    destination: destinationId,
    isFavorite: !!getRandomInt(0, 1),
    offers: offerIds,
    type
  };
}

export { generateMockPoints };
