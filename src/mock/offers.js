import { getRandomInt } from '../utils/common.js';
import { Price } from '../const.js';

function generateMockOffers(type) {
  return {
    id: crypto.randomUUID(),
    title: `Offer ${type}`,
    price: getRandomInt(Price.MIN, Price.MAX)
  };
}

export { generateMockOffers };
