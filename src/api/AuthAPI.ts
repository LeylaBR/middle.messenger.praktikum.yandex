import BaseAPI from './BaseAPI';
import HTTP from '../services/HTTPTransport';

const chatAPIInstance = new HTTP();
const host = 'https://ya-praktikum.tech/api/v2';

class AuthAPI extends BaseAPI {
  create(data) {
    const options = {
      data,
    };

    return chatAPIInstance.post(`${host}/auth/signin`, options).then((data) => {
      return data.response;
    });
  }

  logout() {
    return chatAPIInstance.post(`${host}/auth/logout`).then((data) => {
      return data.response;
    });
  }

  request() {
    return chatAPIInstance.get('/full');
  }
}

export default AuthAPI;
