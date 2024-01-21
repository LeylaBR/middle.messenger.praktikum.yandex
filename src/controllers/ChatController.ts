import store from '../services/Store';
import ChatAPI from '../api/ChatAPI';
import SettingsAPI from '../api/SettingsAPI';

const chatApi = new ChatAPI();
const settingsApi = new SettingsAPI();

class ChatController {
  public getChats() {
    return chatApi.getChats().then((data) => {
      data.forEach((el) => {
        chatApi.getChatUsers(el.id).then((data) => {
          data.forEach((user) => {
            this.getUsersAvatar(user.id, user.avatar);
          });
        });
        this.getToken(el.id);
      });
      store.set('chats', { data });
      return data;
    });
  }

  public async getUsersAvatar(chatId: string, path: string) {
    if (path) {
      return settingsApi.getAvatarStatic(path).then((data) => {
        const usersAvatar = store.getState().usersAvatar;
        store.set(`usersAvatar`, { ...usersAvatar, [chatId]: data });
      });
    }
  }

  public async getToken(chatId: string) {
    return chatApi.getToken(chatId).then((data) => {
      const tokens = store.getState().tokens;
      store.set(`tokens`, { ...tokens, [chatId]: data.token });
    });
  }

  public getChatUsers(id: number) {
    chatApi.getChatUsers(id).then((data) => {
      store.set('chatUsers', { data });
    });
  }

  public uploadChatAvatar(avatarData: any) {
    settingsApi.uploadChatAvatar(avatarData).then((data) => {
      store.set('chatAvatar', data);
    });
  }

  public deleteChats(id: number) {
    chatApi.deleteChat(id).then(() => {
      this.getChats();
    });
  }
}

export default ChatController;
