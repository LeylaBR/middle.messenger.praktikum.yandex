import { Avatar } from '../components';
import SettingsAPI from '../api/SettingsAPI';

export const getAvatar = (id: number | string = 'avatar') =>
  new Avatar('div', {
    attr: {
      class: 'imageUser',
    },
    path: '/noAvatar.jpg',
    id,
  });

export const getAvatarPath = (path: any, id: string | number) =>
  new Avatar('div', {
    attr: {
      class: 'imageUser',
    },
    path,
    id,
  });

export const setNewAvatar = (path: string, element: any) => {
  if (path && element) {
    const regApi = new SettingsAPI();
    try {
      return regApi.getAvatarStatic(path).then((src: string) => {
        if (src) {
          element.src = src;
        }
      });
    } catch (error) {
      console.error('Error fetching avatar:', error);
    }
  }
  return null;
};

export const setAvatar = (path: string) => {
  if (path) {
    const regApi = new SettingsAPI();
    try {
      return regApi.getAvatarStatic(path).then((src: string) => {
        if (src) {
          return src;
        }
        throw new Error('Error fetching avatar');
      });
    } catch (error) {
      console.error('Error fetching avatar:', error);
    }
  }
  throw new Error('Error fetching avatar');
};
