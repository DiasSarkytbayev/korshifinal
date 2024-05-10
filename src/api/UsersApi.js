import ApiModel from '@/api/ApiModel.js';

export default class UsersApi {
  static login(data) {
    return ApiModel.post('/login', data);
  }

  static register(data) {
    return ApiModel.post('/register', data);
  }

  static loadUserProfile(userId) {
    return ApiModel.get(`/users/${userId}`);
  }

  static updateUserProfile(userId, data) {
    return ApiModel.put(`/update/users/${userId}`, data);
  }

  static changePassword(userId, data) {
    return ApiModel.post(`/users/${userId}/password`, data);
  }
}
