import Base from './BaseAPI';
import HTTP from '../services/HTTPTransport';

const chatAPIInstance = new HTTP();
const host = 'https://ya-praktikum.tech/api/v2';

interface AddDeleteUsersArgs {
  users: number[];
  chatId: number;
}

interface SearchUsersArgs {
  login: string;
}

interface CreateChatArgs {
  title: string;
}

class ChatAPI extends Base {
  getUserInfo() {
    return chatAPIInstance.get(`${host}/auth/user`).then((data: any) => {
      return JSON.parse(data.response);
    });
  }

  getChats() {
    return chatAPIInstance
      .get(`${host}/chats`)
      .then((data: any) => JSON.parse(data.response));
  }

  getToken(chatId: string) {
    return chatAPIInstance
      .post(`${host}/chats/token/${chatId}`)
      .then((data: any) => JSON.parse(data.response));
  }

  getChatUsers(id: number) {
    return chatAPIInstance
      .get(`${host}/chats/${id}/users`)
      .then((data: any) => JSON.parse(data.response));
  }

  addUser(userData: AddDeleteUsersArgs) {
    const options = {
      data: userData,
    };

    return chatAPIInstance
      .put(`${host}/chats/users`, options)
      .then((data: any) => data.response);
  }

  deleteUsers(userData: AddDeleteUsersArgs) {
    const options = {
      data: userData,
    };

    return chatAPIInstance
      .delete(`${host}/chats/users`, options)
      .then((data: any) => data.response);
  }

  searchUsers(userData: SearchUsersArgs) {
    const options = {
      data: {
        login: userData,
      },
    };

    return chatAPIInstance
      .post(`${host}/user/search`, options)
      .then((data: any) => JSON.parse(data.response));
  }

  createChat(chatData: CreateChatArgs) {
    const options = {
      data: chatData,
    };

    return chatAPIInstance
      .post(`${host}/chats`, options)
      .then((data: any) => JSON.parse(data.response));
  }

  deleteChat(id: number) {
    const options = {
      data: {
        chatId: id,
      },
    };

    return chatAPIInstance
      .delete(`${host}/chats`, options)
      .then((data: any) => JSON.parse(data.response));
  }

  request() {
    return chatAPIInstance.get('/full');
  }
}

export default ChatAPI;
