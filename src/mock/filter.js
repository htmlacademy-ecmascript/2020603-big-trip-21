import { filter } from '../utils/filter.js';

function generateFilters(points) {
  return Object.entries(filter).map(
    ([filterType, filterEvents]) => ({
      type: filterType,
      count: filterEvents(points).length,
    }),
  );
}

export { generateFilters };
