import store from '../services/Store';
import ChatAPI from '../api/ChatAPI';
import SettingsAPI from '../api/SettingsAPI';
import { UserInfo } from '../api/types';

const chatApi = new ChatAPI();
const settingsApi = new SettingsAPI();

class UserController {
  public getUser() {
    chatApi.getUserInfo().then((data: UserInfo) => {
      store.set('user', data);
    });
  }

  public uploadAvatar(avatarData: FormData) {
    settingsApi.uploadAvatar(avatarData).then((data) => {
      store.set('avatar', data);
    });
  }
}

export default UserController;
