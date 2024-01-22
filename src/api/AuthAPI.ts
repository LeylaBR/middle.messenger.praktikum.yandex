import Base from './BaseAPI';
import HTTP from '../services/HTTPTransport';
import { showError } from './utils';

const chatAPIInstance = new HTTP();
const host = 'https://ya-praktikum.tech/api/v2';

interface AuthDataArg {
  login: string;
  password: string;
}

class AuthAPI extends Base {
  signin(authData: AuthDataArg) {
    const options = {
      data: authData,
    };

    return chatAPIInstance
      .post(`${host}/auth/signin`, options)
      .then((response: any) => {
        if (response.status === 200) {
          return response.response;
        }
        throw new Error(JSON.parse(response.response).reason);
      })
      .catch((error) => {
        showError(error.message);
      });
  }

  logout() {
    return chatAPIInstance
      .post(`${host}/auth/logout`)
      .then((data: any) => data.response);
  }

  request() {
    return chatAPIInstance.get('/full');
  }
}

export default AuthAPI;
