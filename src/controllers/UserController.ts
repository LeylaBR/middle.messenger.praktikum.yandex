import store from '../services/Store';
import ChatAPI from '../api/ChatAPI';
import SettingsAPI from '../api/SettingsAPI';

const chatApi = new ChatAPI();
const settingsApi = new SettingsAPI();

class UserController {
  public getUser() {
    chatApi.getUserInfo().then((data) => {
      store.set('user', data);
    });
  }

  public uploadAvatar(avatarData: any) {
    settingsApi.uploadAvatar(avatarData).then((data) => {
      store.set('avatar', data);
    });
  }
}

export default UserController;
