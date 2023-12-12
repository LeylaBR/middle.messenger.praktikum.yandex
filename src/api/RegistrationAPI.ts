import Base from './BaseAPI';
import HTTP from '../services/HTTPTransport';

const chatAPIInstance = new HTTP();
const host = 'https://ya-praktikum.tech/api/v2';

interface SignupArgs {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

class RegistrationAPI extends Base {
  signup(authData: SignupArgs) {
    const options = {
      data: authData,
    };

    return chatAPIInstance
      .post(`${host}/auth/signup`, options)
      .then((data: any) => JSON.parse(data.response));
  }

  request() {
    return chatAPIInstance.get('/full');
  }
}

export default RegistrationAPI;
