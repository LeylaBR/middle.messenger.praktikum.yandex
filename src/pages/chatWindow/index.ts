import { Button, Input, Layout } from '../../components/index';
import ChatWindows from './ChatWindow';
import { formIds, routes } from '../../constants';
import store from '../../services/Store';

const profileButton = new Button('button', {
  attr: {
    class: 'buttonLink',
    type: 'link',
  },
  label: 'Профиль',
  events: {
    click: (event: MouseEvent) => {
      event.preventDefault();

      const state = store.getState().user;
      if (state) {
        window.location.href = routes.settings;
      }
    },
  },
});

const searchInput = new Input('div', {
  className: 'inputSearch',
  type: 'text',
  placeholder: 'Поиск',
  id: 'search',
  value: '',
  events: {
    input: (event: InputEvent) => {
      console.log({
        search: (event.target as HTMLInputElement).value,
      });
    },
  },
});

const messageInput = new Input('div', {
  attr: {
    class: 'inputMessage',
  },
  className: 'inputMessage',
  type: 'text',
  placeholder: 'Введите сообщение',
  id: 'message',
  value: '',
  name: 'message',
});

const chatWindow = new ChatWindows('div', {
  attr: {
    class: 'pageChat',
  },
  profileButton,
  searchInput,
  messageInput,
  idForm: formIds.message,
});

export const chatWindowPage = new Layout('div', {
  attr: {
    class: 'wrapper',
  },
  children: chatWindow,
});
