import { getAvatar } from '../utils';
import { Button, Input, Layout, Select } from '../../components';
import SettingsChatPage from './SettingsChatPage';
import SettingsAPI from '../../api/SettingsAPI';
import { routes } from '../../constants';
import ChatAPI from '../../api/ChatAPI';
import ChatController from '../../controllers/ChatController';

const searchInput = new Input('div', {
  className: 'inputSearch',
  type: 'text',
  placeholder: 'Введите имя',
  id: 'searchUsers',
  value: '',
  events: {
    input: (event: InputEvent) => {
      event.preventDefault();
      const value = (event.target as HTMLInputElement).value;
      const select = document.getElementById('searchUser') as HTMLInputElement;

      const regApi = new ChatAPI();

      if (!value) {
        select.classList.add('hide');
        select.classList.remove('select');
      }

      regApi.searchUsers(value).then((res) => {
        const fragment = document.createDocumentFragment();
        if (res.length) {
          res.forEach((el) => {
            const option = document.createElement('option');
            option.value = el.id;
            option.textContent = el.first_name;

            fragment.appendChild(option);
          });
          select.classList.remove('hide');
          select.classList.add('select');
          if (fragment.children.length) {
            select.appendChild(fragment);
          } else {
            select.disabled = true;
            select.innerHTML =
              '<option value="" disabled selected>Not Found</option>';
          }
        }
      });
    },
  },
});

const searchSelect = new Select('div', {
  className: 'hide',
  id: 'searchUser',
});

const newMemberButton = new Button('button', {
  attr: {
    class: 'button',
  },
  label: 'Add new memeber',
  id: 'addMemeber',
  events: {
    click: (event: MouseEvent) => {
      event.preventDefault();
      const regApiChat = new ChatController();
      const regApi = new ChatAPI();

      const pathParts = window.location.pathname.split('/');
      const chatId = Number(pathParts[pathParts.length - 1]);
      const select = document.getElementById('searchUser') as HTMLSelectElement;
      const userId = Number(select.value);
      if (userId && chatId) {
        const data = {
          users: [userId],
          chatId,
        };
        regApi.addUser(data).then((res) => {
          if (res === 'OK') {
            regApiChat.getChatUsers(chatId);
          }
        });
      }
    },
  },
});

const fileButton = new Button('button', {
  attr: {
    class: 'button',
  },
  label: 'Choose avatar',
  events: {
    click: (event: Event) => {
      event.preventDefault();
      const input = document.createElement('input');
      const imgElement = document.getElementById('avatar') as HTMLImageElement;

      input.type = 'file';
      input.onchange = (_) => {
        const files = Array.from(input.files);

        if (files.length > 0) {
          const reader = new FileReader();
          const formData = new FormData();
          formData.append('avatar', files[0]);

          reader.onload = function (e) {
            const regApi = new SettingsAPI();
            regApi.uploadAvatar(formData);

            imgElement.src = e.target.result as string;
          };

          reader.readAsDataURL(files[0]);
        }
      };

      input.click();
    },
  },
});

const backButton = new Button('button', {
  attr: {
    class: 'button',
  },
  label: 'Back',
  events: {
    click: (event: MouseEvent) => {
      event.preventDefault();
      window.location.href = routes.chat;
    },
  },
});

const settingsChat = new SettingsChatPage('div', {
  attr: {
    class: 'page',
  },
  avatar: getAvatar(),
  searchInput,
  searchSelect,
  fileButton,
  newMemberButton,
  backButton,
});

export const settingsChatPage = new Layout('div', {
  attr: {
    class: 'wrapper',
  },
  children: settingsChat,
});
