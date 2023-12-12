import Base from './BaseAPI';
import HTTP from '../services/HTTPTransport';

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
      .then((data: any) => data.response);
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
