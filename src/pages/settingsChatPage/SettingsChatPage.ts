import Block from '../../services';
import { template } from './template';
import { AttrProps, TagNameComponent } from '../../components/types';
import { connect } from '../../services/Connect';
import ChatController from '../../controllers/ChatController';
import UserItem from '../../components/userItem/UserItem';
import { getAvatar } from '../utils';
import ChatAPI from '../../api/ChatAPI';

interface Props {
  attr: AttrProps;
}

interface SettingsChatProps extends TagNameComponent {
  props: Props;
  avatar: any;
  searchInput: any;
  searchSelect: any;
  fileButton: any;
  newMemberButton: any;
  backButton: any;
  userItems: any;
  chatUsers: any;
}

class SettingsChatPage extends Block<SettingsChatProps> {
  constructor(tagName, props) {
    super(tagName, props);
    this.getData();
  }

  getChatId() {
    const pathParts = window.location.pathname.split('/');
    return Number(pathParts[pathParts.length - 1]);
  }

  initUsers(data) {
    const usersList = data ? data.data : [];

    if (usersList.length) {
      const users = usersList.map((chat) => {
        const { first_name: name, avatar, last_message: info, id } = chat;

        const block = new UserItem('div', {
          attr: {
            class: 'usersContainer',
          },
          avatar: getAvatar(),
          name,
          info,
          id,
          events: {
            click: (event: MouseEvent) => {
              event.preventDefault();
              const regApi = new ChatAPI();
              const regApiChat = new ChatController();
              const chatId = this.getChatId();
              console.log(event.target);
              if (event.target.id === 'deleteButton') {
                if (id && chatId) {
                  const data = {
                    users: [id],
                    chatId,
                  };
                  regApi.deleteUsers(data).then((res) => {
                    if (res === 'OK') {
                      regApiChat.getChatUsers(chatId);
                    }
                  });
                }
              }
            },
          },
        });

        return block;
      });

      this.lists.userItems = users;
    }
  }

  getData() {
    const regApiChat = new ChatController();
    const idChat = this.getChatId();
    if (idChat) {
      regApiChat.getChatUsers(idChat);
    }
  }

  render() {
    this.initUsers(this.props.chatUsers);
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

function mapUserToProps(state) {
  return {
    chatUsers: state.chatUsers,
  };
}
