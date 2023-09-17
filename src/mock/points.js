import { getPointDates } from '../utils/dates.js';
import { getRandomInt } from '../utils/common.js';

function generateMockPoint(type, destinationId, offerIds) {
  const { dateFrom, dateTo } = getPointDates();

  return {
    id: crypto.randomUUID(),
    basePrice: getRandomInt(1000, 3000),
    dateFrom,
    dateTo,
    destination: destinationId,
    isFavorite: !!getRandomInt(0, 1),
    offers: offerIds,
    type
  };
}

export { generateMockPoint };
