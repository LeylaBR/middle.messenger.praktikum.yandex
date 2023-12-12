import BaseAPI from './BaseAPI';
import HTTP from '../services/HTTPTransport';

const chatAPIInstance = new HTTP();
const host = 'https://ya-praktikum.tech/api/v2';

class RegistrationAPI extends BaseAPI {
  create(data) {
    const options = {
      data,
    };

    return chatAPIInstance.post(`${host}/auth/signup`, options).then((data) => {
      return JSON.parse(data.response);
    });
  }

  request() {
    return chatAPIInstance.get('/full');
  }
}

export default RegistrationAPI;
