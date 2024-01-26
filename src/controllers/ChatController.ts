import store from '../services/Store';
import ChatAPI from '../api/ChatAPI';
import SettingsAPI from '../api/SettingsAPI';
import { TokenInfo, UserInfo } from '../api/types';

const chatApi = new ChatAPI();
const settingsApi = new SettingsAPI();

class ChatController {
  public getChats() {
    return chatApi.getChats().then((data: unknown) => {
      data.forEach((el) => {
        chatApi.getChatUsers(el.id).then((chat) => {
          chat.forEach((user: any) => {
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
      return settingsApi.getAvatarStatic(path).then((data: any) => {
        const { usersAvatar } = store.getState();
        store.set(`usersAvatar`, { ...usersAvatar, [chatId]: data });
      });
    }
    return null;
  }

  public async getToken(chatId: number) {
    return chatApi.getToken(chatId).then((data: TokenInfo) => {
      const { tokens } = store.getState();
      store.set(`tokens`, { ...tokens, [chatId]: data.token });
    });
  }

  public getChatUsers(id: number) {
    chatApi.getChatUsers(id).then((data: UserInfo[]) => {
      store.set('chatUsers', { data });
    });
  }

  public uploadChatAvatar(avatarData: UserInfo[]) {
    settingsApi.uploadChatAvatar(avatarData).then((data: string) => {
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
