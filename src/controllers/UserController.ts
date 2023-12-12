import store from '../services/Store';
import ChatAPI from '../api/ChatAPI';

class UserController {
  public getUser() {
    const regApi = new ChatAPI();
    regApi.getUserInfo().then((data) => {
      store.set('user', data);
    });
  }
}

export default UserController;
