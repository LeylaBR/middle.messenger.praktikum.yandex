import Block from '../../services';
import { template } from './template';
import { TagNameComponent } from '../../components/types';
import { connect } from '../../services/Connect';

import UserController from '../../controllers/UserController';
import ChatController from '../../controllers/ChatController';
import { getAvatar } from '../utils';
import WSTransport from '../../services/WebSocket';
import { Message, UserItem } from '../../components';

export const socket = new WSTransport();

interface ChatWindowsProps extends TagNameComponent {
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
  chatUsers: any;
  messages: any;
}

function mapChatToProps(state: any) {
  return {
    chats: state.chats,
    user: state.user,
    chatUsers: state.chatUsers,
    messages: state.messages,
  };
}

class ChatWindows extends Block<ChatWindowsProps> {
  constructor(tagName: string, props: any) {
    super(tagName, props);
    this.getData();
  }

  initChats(data: any) {
    const chatsList = data ? data.data : [];

    if (chatsList.length) {
      const chats = chatsList.map((chat: Record<string, any>) => {
        const { title: name, avatar, last_message: info, id } = chat;
        const regApiChat = new ChatController();

        regApiChat.getToken(id).then((token: string) => {
          (this.props as any)[`token_${id}`] = token;
        });

        const block = new UserItem('div', {
          attr: {
            class: 'usersContainer',
          },
          avatar: !!avatar ? getAvatar(avatar) : getAvatar(),
          name,
          info: info ? info.content : '',
          id,
          events: {
            click: async (event: any) => {
              event.preventDefault();

              const nameChat = document.getElementById('chatName');
              const chatSettings = document.getElementById('chatSettings');
              const token: string = (this.props as any)[`token_${id}`];
              const userId: string = this.props.user.id;

              if (chatSettings) {
                chatSettings.addEventListener('click', () => {
                  event.preventDefault();
                  window.location.href = `/chat/settings/${id}`;
                });
              }

              try {
                await socket.connect(userId, id, token);
                socket.send({
                  type: 'get old',
                  content: 0,
                });

                if (nameChat) {
                  nameChat.textContent = name;
                }

                if (chatSettings) {
                  chatSettings.classList.remove('hide');
                  chatSettings.classList.add('buttonLink');
                }

                if (event.target && event.target.id === 'deleteButton') {
                  regApiChat.deleteChats(id);
                }
              } catch (error: any) {
                console.error('Error connecting to WebSocket:', error);
              }
            },
          },
        });

        return block;
      });

      this.lists.userItems = chats;
    }
  }

  renderMessages(user: any, data: any) {
    const myId = user?.id;
    const listMessages = data?.data;
    if (myId && listMessages) {
      const messages = listMessages.map((message: Record<string, any>) => {
        const { user_id, content } = message;
        const myMessage: boolean = myId === user_id;

        return new Message('span', {
          avatar: getAvatar(),
          className: myMessage ? 'massageRight' : 'massageLeft',
          left: !myMessage,
          right: myMessage,
          name: '',
          text: content,
          time: '12:15',
        });
      });

      this.lists.messages = messages.reverse();
    }
  }

  getData() {
    const regApi = new UserController();
    regApi.getUser();
    const regApiChat = new ChatController();
    regApiChat.getChats();
  }

  render() {
    this.initChats(this.props.chats);
    this.renderMessages(this.props.user, this.props.messages);

    return this.compile(template, {
      ...this.props,
      profileButton: this.props.profileButton,
      searchInput: this.props.searchInput,
      newChatButton: this.props.newChatButton,
      messageInput: this.props.messageInput,
      sendButton: this.props.sendButton,
    });
  }
}

export default connect(ChatWindows, mapChatToProps);
