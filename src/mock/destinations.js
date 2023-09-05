import { getRandomArrayElement, getRandomInt } from '../utils/common.js';
import { CITIES, DESTINATIONS_DESCRIPTIONS, PICTURES_DESCRIPTIONS } from '../const.js';

function createPicture() {
  return {
    src: `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
    description: getRandomArrayElement(PICTURES_DESCRIPTIONS)
  };
}

function generateMockDestinations() {
  const city = getRandomArrayElement(CITIES);
  const description = getRandomArrayElement(DESTINATIONS_DESCRIPTIONS);

  return {
    id: crypto.randomUUID(),
    description: `${city} ${description}`,
    name: city,
    pictures: Array.from({ length: getRandomInt(0, 5) }, createPicture)
  };
}

export { generateMockDestinations };
