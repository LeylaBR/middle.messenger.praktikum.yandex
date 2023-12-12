import { Button, Input, Layout } from '../../components/index';
import ChatWindows, { socket } from './ChatWindow';
import { formIds, routes } from '../../constants';
import { submitForm } from '../../utils/form';
import store from '../../services/Store';
import ChatAPI from '../../api/ChatAPI';
import ChatController from '../../controllers/ChatController';

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

const newChatButton = new Button('button', {
  attr: {
    class: 'button',
  },
  label: 'Add new chat',
  id: 'createChat',
  events: {
    click: (event: MouseEvent) => {
      event.preventDefault();
      const titleChatInput = document.getElementById(
        'addChat'
      ) as HTMLInputElement;
      const createChatButton = document.getElementById(
        'createChatButton'
      ) as HTMLButtonElement;
      createChatButton.classList.remove('hide');
      createChatButton.classList.add('button');
      titleChatInput.classList.remove('hide');
      titleChatInput.classList.add('input');
      const regApi = new ChatAPI();
      const regApiController = new ChatController();

      createChatButton.addEventListener('click', (e) => {
        if (titleChatInput.value) {
          const data = {
            title: titleChatInput.value,
          };

          regApi
            .createChat(data)
            .then((data) => {
              if (data.id) {
                createChatButton.classList.add('hide');
                createChatButton.classList.remove('button');
                titleChatInput.classList.add('hide');
                titleChatInput.classList.remove('input');
                regApiController.getChats();
              }
            })
            .catch((error) => {
              console.error('Error:', error.message);
            });
        }
      });
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
          socket.send({
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

const chatWindow = new ChatWindows('div', {
  attr: {
    class: 'pageChat',
  },
  profileButton,
  searchInput,
  newChatButton,
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
