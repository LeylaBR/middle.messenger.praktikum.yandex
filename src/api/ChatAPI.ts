import Base from './BaseAPI';
import HTTP from '../services/HTTPTransport';
import { AddDeleteUsersArgs, CreateChatArgs, SearchUsersArgs } from './types';

const chatAPIInstance = new HTTP();

class ChatAPI extends Base {
  getUserInfo() {
    return chatAPIInstance.get(`/auth/user`).then((data: any) => data);
  }

  getChats() {
    return chatAPIInstance.get(`/chats`).then((data: any) => data);
  }

  getToken(chatId: number) {
    return chatAPIInstance
      .post(`/chats/token/${chatId}`)
      .then((data: any) => data);
  }

  getChatUsers(id: number) {
    return chatAPIInstance.get(`/chats/${id}/users`).then((data: any) => data);
  }

  addUser(userData: AddDeleteUsersArgs) {
    const options = {
      data: userData,
    };

    return chatAPIInstance
      .put(`/chats/users`, options)
      .then((data: { response: any }) => data.response);
  }

  deleteUsers(userData: AddDeleteUsersArgs) {
    const options = {
      data: userData,
    };

    return chatAPIInstance
      .delete(`/chats/users`, options)
      .then((data: any) => data.response);
  }

  searchUsers(userData: SearchUsersArgs) {
    const options = {
      data: {
        login: userData,
      },
    };

    return chatAPIInstance
      .post(`/user/search`, options)
      .then((data: string) => data);
  }

  createChat(chatData: CreateChatArgs) {
    const options = {
      data: chatData,
    };

    return chatAPIInstance.post(`/chats`, options).then((data: any) => data);
  }

  deleteChat(id: number) {
    const options = {
      data: {
        chatId: id,
      },
    };

    return chatAPIInstance
      .delete(`/chats`, options)
      .then((data: string) => data);
  }

  request() {
    return chatAPIInstance.get('/full');
  }
}

export default ChatAPI;
