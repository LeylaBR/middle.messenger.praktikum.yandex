import Block from '../../services';
import { template } from './template';
import { connect } from '../../services/Connect';
import { getAvatar, getAvatarPath } from '../utils';
import WSTransport from '../../services/WebSocket';
import { Button, Message, UserItem } from '../../components';
import {
  formIds,
  regApiChat,
  regApiNewChat,
  regApiUser,
} from '../../constants';
import { submitForm } from '../../utils/form';
import {
  getTime,
  scrollHandler,
  settingsChatButtonHandler,
  setUsersAvatar,
} from './utils';
import { ChatInfo, ChatWindowsProps, MessageInfo } from './types';

function mapChatToProps(state: any) {
  return {
    chats: state.chats,
    user: state.user,
    tokens: state.tokens,
    usersAvatar: state.usersAvatar,
    messages: state.messages,
  };
}

class ChatWindows extends Block<ChatWindowsProps> {
  private myId: null | number;

  private socket: WSTransport;

  private chatAvatars: Record<string, string>;

  constructor(tagName: string, props: any) {
    super(tagName, props);
    this.getData();
    this.initSendButton();
    this.initNewChatButton();
    this.chatAvatars = {};
    this.myId = null;
    this.socket = new WSTransport();
  }

  closeSocket() {
    if (this.socket) {
      this.socket.close();
      this.socket = new WSTransport();
    }
  }

  getChatsAvatar() {
    Object.entries(this.chatAvatars).forEach(([key, value]) => {
      if (value) {
        setUsersAvatar(value, key);
      }
    });
  }

  initChats(data?: ChatInfo[]) {
    const chatsList = data?.length ? data : [];

    if (chatsList.length) {
      const chats = chatsList.map((chat: Record<string, any>) => {
        const { title: name, avatar, last_message: info, id } = chat;
        const avatarId = `avatar_${id}`;

        const block = new UserItem('div', {
          attr: {
            class: 'usersContainer',
          },
          avatar: getAvatar(avatarId),
          name,
          info: info ? info.content : '',
          id,
          events: {
            click: async (event: MouseEvent) => {
              event.preventDefault();
              this.myId = this.props.user.id;
              const token: any = this.props.tokens[id];

              try {
                if (this.myId) {
                  this.closeSocket();
                  await this.socket.connect(this.myId, id, token);

                  this.socket.send({
                    type: 'get old',
                    content: 0,
                  });

                  this.socket.on(
                    WSTransport.EVENTS.MESSAGE,
                    (mess: MessageInfo | MessageInfo[]) => {
                      this.renderMessages(this.myId, mess);
                      settingsChatButtonHandler(id, name);
                    }
                  );
                }
              } catch (error: any) {
                console.error('Error connecting to WebSocket:', error);
              }

              try {
                if (
                  event.target &&
                  (event.target as HTMLDivElement).id === 'deleteButton'
                ) {
                  regApiChat.deleteChats(id);
                  regApiChat.getChats().then((newChats: ChatInfo[]) => {
                    this.initChats(newChats);
                  });
                }
              } catch (error) {
                console.error('Произошла ошибка:', error);
              }
            },
          },
        });
        this.chatAvatars[avatarId] = avatar;

        return block;
      });

      this.lists.userItems = chats;

      this.getChatsAvatar();
    }
  }

  initSendButton() {
    const sendButton = new Button('button', {
      attr: {
        class: 'button',
      },
      label: 'Отправить',
      events: {
        click: (event: MouseEvent) => {
          event.preventDefault();

          const form: any = document.getElementById(formIds.message);
          const input: any = document.getElementById('message');

          const validMessage = submitForm(form);

          if (validMessage.message) {
            try {
              this.socket.send({
                type: 'message',
                content: validMessage.message,
              });

              input.value = '';
            } catch (error) {
              console.error('Error connecting to WebSocket:', error);
            }
          }
        },
      },
    });

    this.children.sendButton = sendButton;
  }

  getMessage(message: MessageInfo, myId: number | null) {
    const { usersAvatar } = this.props;
    const { user_id, content, time } = message;
    const myMessage: boolean = Number(myId) === Number(user_id);

    return new Message('span', {
      avatar: usersAvatar[user_id]
        ? getAvatarPath(usersAvatar[user_id], user_id)
        : getAvatar(user_id),
      className: myMessage ? 'massageRight' : 'massageLeft',
      left: !myMessage,
      right: myMessage,
      name: '',
      text: content,
      time: getTime(time),
    });
  }

  renderMessages(
    myId: number | null,
    listMessages: MessageInfo | MessageInfo[]
  ) {
    if (Array.isArray(listMessages)) {
      const messages = listMessages
        .map((message: MessageInfo) => this.getMessage(message, myId))
        .reverse();

      this.setProps({ messages });
    } else {
      const message = this.getMessage(listMessages, myId);

      this.setProps({ messages: [...this.lists.messages, message] });
    }
    scrollHandler();
  }

  initNewChatButton() {
    const newChatButton = new Button('button', {
      attr: {
        class: 'button',
      },
      label: 'Add new chat',
      id: 'createChatButton',
      events: {
        click: (event: MouseEvent) => {
          event.preventDefault();
          const titleChatInput = document.getElementById('addChat') as any;
          const createChatButton = document.getElementById(
            'createChatButton'
          ) as HTMLButtonElement;
          createChatButton.classList.remove('hide');
          createChatButton.classList.add('button');
          titleChatInput.classList.remove('hide');
          titleChatInput.classList.add('input');

          createChatButton.addEventListener('click', () => {
            if (titleChatInput.value) {
              const dataToServer = {
                title: titleChatInput.value,
              };

              regApiNewChat
                .createChat(dataToServer)
                .then((data: any) => {
                  if (data.id) {
                    createChatButton.classList.add('hide');
                    createChatButton.classList.remove('button');
                    titleChatInput.classList.add('hide');
                    titleChatInput.classList.remove('input');
                    regApiChat.getChats().then((chats: ChatInfo[]) => {
                      this.initChats(chats);
                    });
                  }
                })
                .catch((error: Error) => {
                  console.error('Error:', error.message);
                });
            }
          });
        },
      },
    });
    this.children.newChatButton = newChatButton;
  }

  async getData() {
    regApiUser.getUser();
    const chatData: any = await regApiChat.getChats();
    this.initChats(chatData);
  }

  render() {
    return this.compile(template, {
      ...this.props,
      profileButton: this.props.profileButton,
      searchInput: this.props.searchInput,
      messageInput: this.props.messageInput,
    });
  }
}

export default connect(ChatWindows, mapChatToProps);
