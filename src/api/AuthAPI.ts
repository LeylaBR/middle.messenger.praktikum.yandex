import Base from './BaseAPI';
import HTTP from '../services/HTTPTransport';
import { showError } from './utils';

const chatAPIInstance = new HTTP();

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
      .post(`/auth/signin`, options)
      .then((response: unknown) => {
        if (response.status === 200) {
          return response.response;
        }
        throw new Error(response.reason);
      })
      .catch((error) => {
        showError(error.message);
      });
  }

  logout() {
    return chatAPIInstance
      .post(`/auth/logout`)
      .then((data: { response: string }) => {
        return data.response;
      });
  }

  request() {
    return chatAPIInstance.get('/full');
  }
}

export default AuthAPI;
