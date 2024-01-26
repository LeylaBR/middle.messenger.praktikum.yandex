import Base from './BaseAPI';
import HTTP from '../services/HTTPTransport';

const chatAPIInstance = new HTTP();

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
      .post(`/auth/signup`, options)
      .then((data: { id: number }) => data);
  }

  request() {
    return chatAPIInstance.get('/full');
  }
}

export default RegistrationAPI;
