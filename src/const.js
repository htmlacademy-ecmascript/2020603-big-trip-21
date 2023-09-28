import { showAll, showFuture, showPast, showPresent } from './utils/filters';
import { compareByDateFrom, compareByPrice, compareByDuration } from './utils/sorting';

export const AUTHORIZATION = 'Basic loremipsum2023';
export const END_POINT = 'https://21.objects.pages.academy/big-trip';

const DEFAULT_TYPE = 'flight';

export const POINT_EMPTY = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: '',
  isFavorite: false,
  offers: [],
  type: DEFAULT_TYPE
};

export const POINT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

export const NO_POINTS_MESSAGE = 'Failed to load latest route information';

export const FILTER_OPTIONS = [
  {
    name: 'everything',
    filterCb: showAll,
    noPointsMessage: 'Click New Event to create your first point',
  },
  {
    name: 'future',
    filterCb: showFuture,
    noPointsMessage: 'There are no future events now',
  },
  {
    name: 'present',
    filterCb: showPresent,
    noPointsMessage: 'There are no present events now',
  },
  {
    name: 'past',
    filterCb: showPast,
    noPointsMessage: 'There are no past events now',
  },
];

export const DEFAULT_FILTER_OPTION = FILTER_OPTIONS[0];

export const SORT_OPTIONS = [
  {
    name: 'day',
    sortCb: compareByDateFrom,
    isDisable: false,
  },
  {
    name: 'event',
    sortCb: null,
    isDisable: true,
  },
  {
    name: 'time',
    sortCb: compareByDuration,
    isDisable: false,
  },
  {
    name: 'price',
    sortCb: compareByPrice,
    isDisable: false,
  },
  {
    name: 'offers',
    sortCb: null,
    isDisable: true,
  },
];

export const DEFAULT_SORT_OPTION = SORT_OPTIONS[0];

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const UrlPath = {
  POINTS: 'points',
  OFFERS: 'offers',
  DESTINATIONS: 'destinations',
};

export const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};
