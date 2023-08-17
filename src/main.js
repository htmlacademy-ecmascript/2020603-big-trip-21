import { RenderPosition, render } from './render.js';
import WaypointsPresenter from './presenters/waypoints-presenter.js';
import InfoView from './view/info-view/info-view.js';
import FilterView from './view/filter-view/filter-view.js';

const headerElement = document.querySelector('.page-header');
const tripMainElement = headerElement.querySelector('.trip-main');
const filtersContainerElement = tripMainElement.querySelector('.trip-controls__filters');
const waypointsSectionElement = document.querySelector('.trip-events');

const waypointsPresenter = new WaypointsPresenter({ waypointsContainer: waypointsSectionElement });

render(new InfoView, tripMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), filtersContainerElement);

waypointsPresenter.init();
