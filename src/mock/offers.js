import { getRandomInt } from '../utils/common.js';
import { OfferPrice } from '../const.js';

function generateMockOffers(type) {
  return {
    id: crypto.randomUUID(),
    title: `Offer ${type}`,
    price: getRandomInt(OfferPrice.MIN, OfferPrice.MAX)
  };
}

export { generateMockOffers };
