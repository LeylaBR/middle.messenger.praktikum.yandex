import BaseAPI from './BaseAPI';
import HTTP from '../services/HTTPTransport';

const chatAPIInstance = new HTTP();
const host = 'https://ya-praktikum.tech/api/v2';

class SettingsAPI extends BaseAPI {
  create(data) {
    const options = {
      data,
    };

    return chatAPIInstance.post(`${host}/auth/signup`, options).then((data) => {
      return JSON.parse(data.response);
    });
  }

  uploadAvatar(data) {
    const options = {
      data,
    };

    return chatAPIInstance
      .put(`${host}/user/profile/avatar`, options)
      .then((data) => {
        return data.response;
      });
  }

  updateProfile(data) {
    const options = {
      data,
    };
    return chatAPIInstance.put(`${host}/user/profile`, options).then((data) => {
      return data.response;
    });
  }

  updatePassword(data) {
    const options = {
      data,
    };
    return chatAPIInstance
      .put(`${host}/user/password`, options)
      .then((data) => {
        return data.response;
      });
  }

  request() {
    return chatAPIInstance.get('/full');
  }
}

export default SettingsAPI;
