import { getAvatar } from '../utils';
import { Button, Input, Layout, Select } from '../../components';
import SettingsChatPage from './SettingsChatPage';
import { regApiChat, regApiNewChat, routes } from '../../constants';
import { avatarId } from './constants';

const searchInput = new Input('div', {
  className: 'inputSearch',
  type: 'text',
  placeholder: 'Введите имя',
  id: 'searchUsers',
  value: '',
  events: {
    input: (event: Event) => {
      event.preventDefault();
      const { value }: any = event.target;
      const select = document.getElementById('searchUser') as HTMLInputElement;
      const button = document.getElementById('addMemeber') as HTMLButtonElement;

      if (!value) {
        select.classList.add('hide');
        select.classList.remove('select');
        button.classList.add('hide');
        button.classList.remove('button');
        select.innerHTML = '';
      }

      if (value) {
        select.classList.remove('hide');
        select.classList.add('select');
        button.classList.remove('hide');
        button.classList.add('button');
      }

      regApiNewChat.searchUsers(value).then((res: any) => {
        const fragment = document.createDocumentFragment();
        if (res.length) {
          res.forEach((el: any) => {
            const option: any = document.createElement('option');
            option.value = el.id;
            option.textContent = el.first_name;

            fragment.appendChild(option);
          });

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

const fileButton = new Button('button', {
  attr: {
    class: 'button',
  },
  label: 'Choose avatar',
  events: {
    click: (event: Event) => {
      event.preventDefault();
      const pathParts = window.location.pathname.split('/');
      const chatId = Number(pathParts[pathParts.length - 1]);
      const input = document.createElement('input');
      const imgElement = document.getElementById(avatarId) as HTMLImageElement;

      input.type = 'file';
      input.onchange = (e: Event) => {
        const { files }: any = e.target;

        if (files.length > 0) {
          const reader: FileReader = new FileReader();
          const formData: FormData = new FormData();
          formData.append('avatar', files[0]);
          formData.append('chatId', String(chatId));

          reader.onload = function handleFileLoad(ev: any) {
            regApiChat.uploadChatAvatar(formData);

            imgElement.src = ev.target.result;
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
  avatar: getAvatar(avatarId),
  searchInput,
  searchSelect,
  fileButton,
  backButton,
});

export const settingsChatPage = new Layout('div', {
  attr: {
    class: 'wrapper',
  },
  children: settingsChat,
});
