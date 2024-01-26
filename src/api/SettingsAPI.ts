import Base from './BaseAPI';
import HTTP from '../services/HTTPTransport';
import { showError } from './utils';
import { UserInfo } from './types';

const chatAPIInstance = new HTTP();

interface UpdateProfileArgs {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

interface UpdatePasswordArg {
  oldPassword: string;
  newPassword: string;
}

class SettingsAPI extends Base {
  getAvatar(path: string, options: unknown) {
    return chatAPIInstance
      .put(`${path}`, options)
      .then((response: unknown) => {
        if (response.status === 200) {
          return response.response;
        }

        throw new Error(response.status);
      })
      .then((data: string) => {
        const res: unknown = data;
        if (res.avatar) {
          return this.getAvatarStatic(res.avatar);
        }
        throw new Error('Loading error');
      })
      .catch((error) => {
        if (error instanceof Error && error.message) {
          showError(error.message);
        } else {
          showError('Image Too Large');
        }
      });
  }

  uploadAvatar(avatarData: FormData) {
    const options = {
      data: avatarData,
    };
    return this.getAvatar('/user/profile/avatar', options);
  }

  uploadChatAvatar(avatarData: UserInfo[]) {
    const options = {
      data: avatarData,
    };

    return this.getAvatar('/chats/avatar', options);
  }

  getAvatarStatic(path: string) {
    return chatAPIInstance
      .get(`/resources${path}`)
      .then(
        (responseData: { responseURL: string }) => responseData.responseURL
      );
  }

  updateProfile(profileData: UpdateProfileArgs) {
    const options = {
      data: profileData,
    };
    return chatAPIInstance
      .put(`/user/profile`, options)
      .then((responseData: { response: UserInfo }) => responseData.response);
  }

  updatePassword(passwordData: UpdatePasswordArg) {
    const options = {
      data: passwordData,
    };
    return chatAPIInstance
      .put(`/user/password`, options)
      .then((responseData: { response: string }) => responseData.response);
  }

  request() {
    return chatAPIInstance.get('/full');
  }
}

export default SettingsAPI;
