import Block from '../../services';
import { template } from './template';
import { AttrProps, TagNameComponent } from '../../components/types';
import { connect } from '../../services/Connect';

import UserController from '../../controllers/UserController';
import ChatController from '../../controllers/ChatController';
import { getAvatar } from '../utils';
import WSTransport from '../../services/WebSocket';
import { Message, UserItem } from '../../components';

export const socket = new WSTransport();

interface Props {
  attr: AttrProps;
}

interface ChatWindowsProps extends TagNameComponent {
  props: Props;
  profileButton: any;
  searchInput: any;
  userItems: any;
  messageInput: any;
  sendButton: any;
  idForm: string;
  newChatButton: any;
  chats: { data: any[] };
  user: any;
  chatUsers: any[];
  messages: any[];
}

class ChatWindows extends Block<ChatWindowsProps> {
  constructor(tagName, props) {
    super(tagName, props);
    this.getData();
  }

  initChats(data) {
    const chatsList = data ? data.data : [];

    if (chatsList.length) {
      const chats = chatsList.map((chat) => {
        const { title: name, avatar, last_message: info, id } = chat;
        const regApiChat = new ChatController();

        regApiChat.getToken(id).then((token) => {
          this.props[`token_${id}`] = token;
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
            click: async (event: MouseEvent) => {
              event.preventDefault();

              const regApiChat = new ChatController();

              const nameChat = document.getElementById('chatName');
              const chatSettings = document.getElementById('chatSettings');
              const token = this.props[`token_${id}`];
              const userId = this.props.user.id;
              nameChat.textContent = name;
              chatSettings.classList.remove('hide');
              chatSettings.classList.add('buttonLink');

              chatSettings.addEventListener('click', (e) => {
                event.preventDefault();
                window.location.href = `/chat/settings/${id}`;
              });

              try {
                await socket.connect(userId, id, token);
                socket.send({
                  type: 'get old',
                  content: 0,
                });

                if (event.target.id === 'deleteButton') {
                  regApiChat.deleteChats(id);
                }
              } catch (error) {
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

  renderMessages(user, data) {
    const myId = user?.id;
    const listMessages = data?.data;
    if (myId && listMessages) {
      const messages = listMessages.map((message) => {
        const { user_id, content } = message;
        const myMessage = myId === user_id;

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

function mapChatToProps(state) {
  return {
    chats: state.chats,
    user: state.user,
    chatUsers: state.chatUsers,
    messages: state.messages,
  };
}
