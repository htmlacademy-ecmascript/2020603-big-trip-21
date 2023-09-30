import ApiService from './framework/api-service.js';
import PointAdapter from './point-adapter.js';
import { Method, UrlPath } from './const.js';

export default class PointsApiService extends ApiService {
  get points() {
    return this._load({ url: UrlPath.POINTS })
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({ url: UrlPath.DESTINATIONS })
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({ url: UrlPath.OFFERS })
      .then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `${UrlPath.POINTS}/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(PointAdapter.adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'})
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async addPoint(point) {
    const response = await this._load({
      url: UrlPath.POINTS,
      method: Method.POST,
      body: JSON.stringify(PointAdapter.adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'})
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deletePoint(point) {
    const response = await this._load({
      url: `${UrlPath.POINTS}/${point.id}`,
      method: Method.DELETE
    });

    return response;
  }
}
