import { getRandomDates } from '../utils/dates.js';
import { getRandomInt } from '../utils/common.js';

function generateMockPoints(type, destinationId, offerIds) {
  const { dateFrom, dateTo } = getRandomDates();

  return {
    id: crypto.randomUUID(),
    basePrice: getRandomInt(1, 3000),
    dateFrom,
    dateTo,
    destination: destinationId,
    isFavorite: !!getRandomInt(0, 1),
    offers: offerIds,
    type
  };
}

export { generateMockPoints };
