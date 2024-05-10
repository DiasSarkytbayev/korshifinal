import ApiModel from '@/api/ApiModel.js';

export default class CommentsApi {
  static getProductComments(query) {
    return ApiModel.get('/comments', query);
  }

  static sendComment(data) {
    return ApiModel.post('/comments', data);
  }
}
