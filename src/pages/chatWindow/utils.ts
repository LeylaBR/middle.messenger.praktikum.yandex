import { setAvatar } from '../utils';

export const settingsChatButtonHandler = (id: number, name: string) => {
  const nameChat = document.getElementById('chatName');
  const chatSettings = document.getElementById('chatSettings');

  if (chatSettings) {
    chatSettings.addEventListener('click', (event) => {
      event.preventDefault();
      window.location.href = `/chat/settings/${id}`;
    });

    chatSettings.classList.remove('hide');
    chatSettings.classList.add('buttonLink');

    if (nameChat) {
      nameChat.textContent = name;
    }
  }
};

export const setUsersAvatar = async (avatar: string, id: string) => {
  if (avatar) {
    try {
      await setAvatar(avatar).then((data) => {
        const avatarElement = document.getElementById(id);
        if (avatarElement) {
          avatarElement.setAttribute('src', data);
        }
      });
    } catch (error) {
      console.error('Error while setting avatar:', error);
    }
  }
};

export const getTime = (time: string) => {
  const timestamp = time;
  const date = new Date(timestamp);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return hours + ':' + (minutes < 10 ? '0' : '') + minutes;
};

export const scrollHandler = () => {
  const messagesContainer = document.querySelector('.messageLine');
  if (messagesContainer) {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
};
