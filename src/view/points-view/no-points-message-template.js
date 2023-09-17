import { FilterType } from '../../const.js';

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
};

function createNoPointsMessageTemplate(filterType) {
  const noPointTextValue = NoPointsTextType[filterType];

  return `
    <p class="trip-events__msg">
      ${noPointTextValue}
    </p>
  `;
}

export { createNoPointsMessageTemplate };
