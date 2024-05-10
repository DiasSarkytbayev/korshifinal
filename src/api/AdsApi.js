import ApiModel from '@/api/ApiModel.js';

export default class AdsApi {
  static getAll() {
    return ApiModel.get('/advertisements');
  }

  static getAllUserAds() {
    return ApiModel.get('/advertisements/user');
  }

  static getOne(adId) {
    return ApiModel.get(`/advertisements/${adId}`);
  }

  static deleteOne(adId) {
    return ApiModel.delete(`/advertisements/${adId}`);
  }

  static create(data) {
    return ApiModel.post('/advertisements', data);
  }

  static update(adId, data) {
    return ApiModel.put(`/advertisements/${adId}`, data);
  }

  static addToFavs(adId) {
    return ApiModel.post(`/advertisements/${adId}/like`);
  }

  static removeFromFavs(adId) {
    return ApiModel.post(`/advertisements/${adId}/dislike`);
  }

  static favourites(data) {
    return ApiModel.get('/advertisements/user/favourite', data);
  }
}
