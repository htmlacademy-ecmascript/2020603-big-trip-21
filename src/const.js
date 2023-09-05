const CITIES = [
  'Geneva',
  'Krasnoyarsk',
  'Oslo',
  'Moscow',
  'Kyzyl',
  'Rome',
  'Tokio'
];

const PICTURES_DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet.',
  'Phasellus eros mauris.',
  'In rutrum ac purus sit amet tempus.'
];

const DESTINATIONS_DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
];

const TYPEPOINTS = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const Price = {
  MIN: 1,
  MAX: 100
};

const DateFormat = {
  FULL_DATE: 'DD/MM/YY HH:mm',
  HOUR_MINUTE: 'HH:mm',
  MONTH_DAY: 'MMM DD',
};

const DEFAULT_TYPE = 'flight';

const POINT_EMPTY = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: DEFAULT_TYPE,
};

const Duration = {
  MIN: 59,
  DAY: 7,
  HOUR: 23
};

const MSEC_IN_SEC = 1000;
const SEC_IN_MIN = 60;
const MIN_IN_HOUR = 60;
const HOUR_IN_DAY = 24;

const MSEC_IN_HOUR = MSEC_IN_SEC * SEC_IN_MIN * MIN_IN_HOUR;
const MSEC_IN_DAY = MSEC_IN_HOUR * HOUR_IN_DAY;

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

export {
  TYPEPOINTS,
  DateFormat,
  DEFAULT_TYPE,
  CITIES,
  DESTINATIONS_DESCRIPTIONS,
  POINT_EMPTY,
  Price,
  PICTURES_DESCRIPTIONS,
  Duration,
  MSEC_IN_HOUR,
  MSEC_IN_DAY,
  FilterType,
};
