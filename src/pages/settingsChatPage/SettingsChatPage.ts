import Block from '../../services';
import { template } from './template';
import { TagNameComponent } from '../../components/types';
import { connect } from '../../services/Connect';
import ChatController from '../../controllers/ChatController';
import UserItem from '../../components/userItem/UserItem';
import { getAvatar, getAvatarPath, setAvatar } from '../utils';
import ChatAPI from '../../api/ChatAPI';
import { avatarId } from './constants';
import { Button } from '../../components';

interface SettingsChatProps extends TagNameComponent {
  props: any;
  avatar: any;
  searchInput: any;
  searchSelect: any;
  fileButton: any;
  newMemberButton: any;
  backButton: any;
  userItems: any;
  chatUsers: any;
  chats: any;
}

function mapUserToProps(state: any) {
  return {
    chatUsers: state.chatUsers,
    chats: state.chats,
  };
}

class SettingsChatPage extends Block<SettingsChatProps> {
  private chatId: null | number;

  constructor(tagName: string, props: any) {
    super(tagName, props);
    this.chatId = null;
    this.getData();
    this.newMemberButton();
  }

  setChatAvatar() {
    const img = document.getElementById(avatarId) as HTMLImageElement;

    if (this.props.chats && img) {
      const currentChat = this.props.chats.data.find(
        (chat: any) => chat.id === this.chatId
      );
      if (currentChat?.avatar) {
        setAvatar(currentChat?.avatar).then((ava: string) => {
          img.src = ava;
        });
      }
    }
  }

  async setUsersAvatar(avatar: string) {
    let ava = '';

    if (avatar) {
      try {
        ava = await setAvatar(avatar);
      } catch (error) {
        console.error('Error while setting avatar:', error);
      }
    }

    return ava;
  }

  getChatId() {
    const pathParts = window.location.pathname.split('/');
    this.chatId = Number(pathParts[pathParts.length - 1]);
  }

  async initUsers(data: any) {
    if (data.length) {
      const users = await Promise.all(
        data.map(async (chat: Record<string, any>) => {
          const { first_name: name, last_message: info, id, avatar } = chat;

          const avatarPath = await this.setUsersAvatar(avatar);
          const avatarElem = `${avatarId}_${id}`;

          const block = new UserItem('div', {
            attr: {
              class: 'usersContainer',
            },
            avatar: avatarPath
              ? getAvatarPath(avatarPath, avatarElem)
              : getAvatar(avatarElem),
            name,
            info,
            id,
            events: {
              click: (event: MouseEvent) => {
                event.preventDefault();
                const regApi = new ChatAPI();

                if ((event.target as any).id === 'deleteButton') {
                  if (id && this.chatId) {
                    regApi
                      .deleteUsers({
                        users: [id],
                        chatId: this.chatId,
                      })
                      .then((res: any) => {
                        if (res === 'OK' && this.chatId) {
                          this.getData();
                        }
                      });
                  }
                }
              },
            },
          });
          return block;
        })
      );
      this.lists.userItems = users;
      this.setProps({
        userItems: users,
      });
    }
  }

  newMemberButton() {
    const addMemberButton = new Button('button', {
      attr: {
        class: 'hide',
        id: 'addMemeber',
      },
      label: 'Add new memeber',
      events: {
        click: (event: MouseEvent) => {
          event.preventDefault();
          const regApi = new ChatAPI();

          const pathParts = window.location.pathname.split('/');
          const chatId = Number(pathParts[pathParts.length - 1]);
          const select = document.getElementById(
            'searchUser'
          ) as HTMLSelectElement;
          const userId = Number(select.value);

          if (userId && chatId) {
            const data = {
              users: [userId],
              chatId,
            };
            regApi.addUser(data).then((res: any) => {
              if (res === 'OK') {
                this.getData();
              }
            });
          }
        },
      },
    });

    this.children.newMemberButton = addMemberButton;
  }

  async getData() {
    const regApiChat = new ChatController();
    this.getChatId();
    if (this.chatId) {
      const users: any = await regApiChat.getChatUsers(this.chatId);
      this.initUsers(users);
    }
  }

  render() {
    this.setChatAvatar();
    return this.compile(template, {
      ...this.props,
      avatar: this.props.avatar,
      searchInput: this.props.searchInput,
      searchSelect: this.props.searchSelect,
      fileButton: this.props.fileButton,
      backButton: this.props.backButton,
    });
  }
}

export default connect(SettingsChatPage, mapUserToProps);
