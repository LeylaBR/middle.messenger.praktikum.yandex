import store from '../services/Store';
import ChatAPI from '../api/ChatAPI';

class ChatController {
  public getChats() {
    const regApi = new ChatAPI();
    regApi.getChats().then((data) => {
      store.set('chats', { data });
    });
  }

  public async getToken(chatId) {
    const regApi = new ChatAPI();

    return regApi.getToken(chatId).then((data) => {
      if (data) {
        return data.token;
      }
    });
  }

  public getChatUsers(id) {
    const regApi = new ChatAPI();
    regApi.getChatUsers(id).then((data) => {
      store.set('chatUsers', { data });
    });
  }

  public deleteChats(id) {
    const regApi = new ChatAPI();
    regApi.deleteChat(id).then(() => {
      this.getChats();
    });
  }
}

export default ChatController;
