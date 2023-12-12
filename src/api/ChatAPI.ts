import BaseAPI from './BaseAPI';
import HTTP from '../services/HTTPTransport';

const chatAPIInstance = new HTTP();
const host = 'https://ya-praktikum.tech/api/v2';

class ChatAPI extends BaseAPI {
  getUserInfo() {
    return chatAPIInstance.get(`${host}/auth/user`).then((data) => {
      return JSON.parse(data.response);
    });
  }

  getChats() {
    return chatAPIInstance.get(`${host}/chats`).then((data) => {
      return JSON.parse(data.response);
    });
  }

  getToken(chatId) {
    return chatAPIInstance
      .post(`${host}/chats/token/${chatId}`)
      .then((data) => {
        return JSON.parse(data.response);
      });
  }

  getChatUsers(id) {
    return chatAPIInstance.get(`${host}/chats/${id}/users`).then((data) => {
      return JSON.parse(data.response);
    });
  }

  addUser(data) {
    const options = {
      data,
    };

    return chatAPIInstance.put(`${host}/chats/users`, options).then((data) => {
      return data.response;
    });
  }

  deleteUsers(data) {
    const options = {
      data,
    };

    return chatAPIInstance
      .delete(`${host}/chats/users`, options)
      .then((data) => {
        return data.response;
      });
  }

  searchUsers(data) {
    const options = {
      data: {
        login: data,
      },
    };

    return chatAPIInstance.post(`${host}/user/search`, options).then((data) => {
      return JSON.parse(data.response);
    });
  }

  createChat(data) {
    const options = {
      data,
    };

    return chatAPIInstance.post(`${host}/chats`, options).then((data) => {
      return JSON.parse(data.response);
    });
  }

  deleteChat(id) {
    const options = {
      data: {
        chatId: id,
      },
    };

    return chatAPIInstance.delete(`${host}/chats`, options).then((data) => {
      return JSON.parse(data.response);
    });
  }

  request() {
    return chatAPIInstance.get('/full');
  }
}

export default ChatAPI;
