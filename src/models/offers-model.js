export default class OffersModel {
  #service = null;
  #offers = null;

  constructor(service) {
    this.#service = service;
    this.#offers = this.#service.getOffers();
  }

  get offers() {
    return this.#offers;
  }

  getByType(type) {
    return this.#offers
      .find((item) => item.type === type);
  }
}
