const CITIES = [
  'Geneva',
  'Krasnoyarsk',
  'Oslo',
  'Moscow',
  'London',
  'Rome',
  'Tokio'
];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
];

const POINTS_TYPES = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

const DESTINATIONS_COUNT = 5;
const POINTS_COUNT = 5;
const OFFERS_COUNT = 5;

const DEFAULT_TYPE = 'flight';

const DateFormat = {
  FULL_DATE: 'DD/MM/YY HH:mm',
  HOUR_MINUTE: 'HH:mm',
  MONTH_DAY: 'MMM DD',
};

const POINT_EMPTY = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: DEFAULT_TYPE,
};

const Price = {
  MIN: 1,
  MAX: 100
};

const Duration = {
  DAY: 7,
  HOUR: 23,
  MIN: 59
};

export { POINTS_TYPES, DateFormat, DEFAULT_TYPE, CITIES, DESCRIPTIONS, DESTINATIONS_COUNT, POINTS_COUNT, OFFERS_COUNT, POINT_EMPTY, Price, Duration };
