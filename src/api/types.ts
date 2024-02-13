export interface AddDeleteUsersArgs {
  users: number[];
  chatId: number;
}

export interface SearchUsersArgs {
  login: string;
}

export interface CreateChatArgs {
  title: string;
}

export interface UserInfo {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
}

export interface TokenInfo {
  token: 'string';
}

export interface ChatsInfo {
  id: number;
  title: 'string';
  avatar: 'string';
  unread_count: number;
  created_by: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
}
