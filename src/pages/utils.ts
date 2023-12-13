import { Avatar } from '../components';

export const getAvatar = (path = '/noAvatar.jpg') =>
  new Avatar('div', {
    attr: {
      class: 'imageUser',
    },
    path,
  });
