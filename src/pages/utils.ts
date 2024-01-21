import { Avatar } from '../components';
import SettingsAPI from '../api/SettingsAPI';

export const getAvatar = (id = 'avatar') => {
  return new Avatar('div', {
    attr: {
      class: 'imageUser',
    },
    path: '/noAvatar.jpg',
    id,
  });
};

export const getAvatarPath = (path: string, id: string | number) => {
  return new Avatar('div', {
    attr: {
      class: 'imageUser',
    },
    path: path,
    id,
  });
};

export const setNewAvatar = (path: string, element: any) => {
  if (path && element) {
    const regApi = new SettingsAPI();
    try {
      regApi.getAvatarStatic(path).then((src) => {
        if (src) {
          element.src = src;
        }
      });
    } catch (error) {
      console.error('Error fetching avatar:', error);
    }
  }
};

export const setAvatar = (path: string) => {
  if (path) {
    const regApi = new SettingsAPI();
    try {
      return regApi.getAvatarStatic(path).then((src) => {
        if (src) {
          return src;
        }
      });
    } catch (error) {
      console.error('Error fetching avatar:', error);
    }
  }
};
