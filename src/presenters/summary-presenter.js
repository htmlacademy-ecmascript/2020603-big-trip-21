import dayjs from 'dayjs';
import { RenderPosition, remove, render, replace } from '../framework/render';
import { compareByDateFrom, compareByDateTo } from '../utils/sorting.js';
import SummaryView from '../views/summary-view/summary-view.js';

export default class SummaryPresenter {
  #summaryComponent = null;
  #summaryContainer = null;

  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  constructor({ summaryContainer, pointsModel, offersModel, destinationsModel }) {
    this.#summaryContainer = summaryContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #getCities() {
    const points = this.#pointsModel.points.sort(compareByDateFrom);
    const allCities = points.reduce((accumulator, point) => [...accumulator, this.#destinationsModel.getDestinationById(point.destination).name], []);

    if (allCities.length > 3) {
      return `${allCities[0]} &mdash; ... &mdash; ${allCities.at(-1)}`;
    }

    return allCities.join(' &mdash; ');
  }

  #getDates() {
    const points = this.#pointsModel.points;
    const firstDateFrom = points.sort(compareByDateFrom)[0].dateFrom;
    const lastDateTo = points.sort(compareByDateTo).at(-1).dateTo;

    return `${dayjs(firstDateFrom).format('DD MMM')}&nbsp;&mdash;&nbsp;${dayjs(lastDateTo).format('DD MMM')}`;
  }

  #getTotalPrice() {
    const points = this.#pointsModel.points;
    const allPointsPrice = points.reduce((sum, point) => sum + point.basePrice, 0);

    const allOffersIds = points.reduce((accumulator, point) => [...accumulator, ...point.offers], []);
    const allOffers = this.#offersModel.getOffersByIds(allOffersIds);
    const allOffersSum = allOffers.reduce((sum, offer) => sum + offer.price, 0);

    return allPointsPrice + allOffersSum;
  }

  init() {
    if (this.#pointsModel.points.length === 0 || this.#pointsModel.isFailed || this.#offersModel.isFailed || this.#destinationsModel.isFailed) {
      remove(this.#summaryComponent);
      return;
    }

    const prevSummaryComponent = this.#summaryComponent;
    this.#summaryComponent = new SummaryView({
      cities: this.#getCities(),
      dates: this.#getDates(),
      totalPrice: this.#getTotalPrice()
    });

    if (prevSummaryComponent === null) {
      render(this.#summaryComponent, this.#summaryContainer, RenderPosition.BEFOREBEGIN);
      return;
    }

    replace(this.#summaryComponent, prevSummaryComponent);
    remove(prevSummaryComponent);
  }
}
