import Block from '../../services';
import { template } from './template';
import { TagNameComponent } from '../../components/types';
import { connect } from '../../services/Connect';
import ChatController from '../../controllers/ChatController';
import UserItem from '../../components/userItem/UserItem';
import { getAvatar, getAvatarPath, setAvatar } from '../utils';
import ChatAPI from '../../api/ChatAPI';
import { avatarId } from './constants';

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
  }

  setChatAvatar() {
    const img = document.getElementById(avatarId) as HTMLImageElement;

    if (this.props.chats && img) {
      const currentChat = this.props.chats.data.find(
        (chat: any) => chat.id === this.chatId
      );

      setAvatar(currentChat?.avatar).then((ava: string) => {
        img.src = ava;
      });
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
    const usersList = data ? data.data : [];

    if (usersList.length) {
      const users = await Promise.all(
        usersList.map(async (chat: Record<string, any>) => {
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
                const regApiChat = new ChatController();

                if ((event.target as any).id === 'deleteButton') {
                  if (id && this.chatId) {
                    regApi
                      .deleteUsers({
                        users: [id],
                        chatId: this.chatId,
                      })
                      .then((res: any) => {
                        if (res === 'OK' && this.chatId) {
                          regApiChat.getChatUsers(this.chatId);
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
    }
  }

  getData() {
    const regApiChat = new ChatController();
    this.getChatId();
    if (this.chatId) {
      regApiChat.getChatUsers(this.chatId);
    }
  }

  render() {
    this.initUsers(this.props.chatUsers);
    this.setChatAvatar();
    return this.compile(template, {
      ...this.props,
      avatar: this.props.avatar,
      searchInput: this.props.searchInput,
      searchSelect: this.props.searchSelect,
      fileButton: this.props.fileButton,
      newMemberButton: this.props.newMemberButton,
      backButton: this.props.backButton,
    });
  }
}

export default connect(SettingsChatPage, mapUserToProps);
