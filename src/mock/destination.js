import { getRandomArrayElement } from '../utils.js';
import { CITIES, DESCRIPTIONS } from '../const.js';

function generateDestination() {
  const city = getRandomArrayElement(CITIES);
  const description = getRandomArrayElement(DESCRIPTIONS);

  return {
    id: crypto.randomUUID(),
    name: city,
    description,
    pictures: [
      {
        'src': `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
        'description': `${city} description`
      }
    ]
  };
}

export { generateDestination };
