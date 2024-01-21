import { TagNameComponent } from '../../components/types';

export interface ChatWindowsProps extends TagNameComponent {
  props: any;
  profileButton: any;
  searchInput: any;
  userItems: any;
  messageInput: any;
  sendButton: any;
  idForm: any;
  newChatButton: any;
  chats: any;
  user: any;
  messages: any;
  tokens: Record<number, string>;
  usersAvatar: Record<number, string>;
}

export interface UserInfo {
  avatar: null | string;
  display_name: string;
  first_name: string;
  login: string;
  second_name: string;
}

export interface ChatInfo {
  avatar: null | string;
  created_by: number;
  id: number;
  last_message: { user: UserInfo; time: string; content: string; id: number };
  title: string;
  unread_count: number;
}

export interface Message {
  chat_id: number;
  content: string;
  file: null | any;
  id: number;
  is_read: boolean;
  time: string;
  type: 'message';
  user_id: number;
}
