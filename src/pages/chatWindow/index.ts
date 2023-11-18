import {
  Avatar,
  Button,
  Input,
  Layout,
  Message,
  UserItem,
} from '../../components/index';

import { messageData, userData } from './constants';
import ChatWindows from './ChatWindow';
import { formIds, routes } from '../../constants';
import { submitForm } from '../../utils/form';

const profileButton = new Button('button', {
  attr: {
    class: 'buttonLink',
    type: 'link',
  },
  label: 'Профиль',
  events: {
    click: (event) => {
      event.preventDefault();
      window.location.href = routes.settings;
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
    input: (event) => {
      console.log({
        search: event.target.value,
      });
    },
  },
});

const getAvatar = () =>
  new Avatar('div', {
    attr: {
      class: 'imageUser',
    },
  });

const userItems = userData.map((user) => {
  const { name, info } = user;

  const block = new UserItem('div', {
    attr: {
      class: 'usersContainer',
    },
    avatar: getAvatar(),
    name,
    info,
  });

  return block;
});

const messages = messageData.map((message) => {
  const { className, left, right, name, text, time } = message;
  const messageBlock = new Message('span', {
    avatar: getAvatar(),
    className,
    left,
    right,
    name,
    text,
    time,
  });

  return messageBlock;
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
  events: {
    input: () => {
      console.log('message');
    },
  },
});

const sendButton = new Button('button', {
  attr: {
    class: 'button',
  },
  label: 'Отправить',
  events: {
    click: (event) => {
      event.preventDefault();
      const form = document.getElementById(formIds.message);
      submitForm(form);
    },
  },
});

const chatWindow = new ChatWindows('div', {
  attr: {
    class: 'pageChat',
  },
  profileButton,
  searchInput,
  userItems,
  messages,
  messageInput,
  sendButton,
  idForm: formIds.message,
});

export const chatWindowPage = new Layout('div', {
  attr: {
    class: 'wrapper',
  },
  children: chatWindow,
});
