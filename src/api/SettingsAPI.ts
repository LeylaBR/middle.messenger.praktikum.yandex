import Base from './BaseAPI';
import HTTP from '../services/HTTPTransport';
import { showError } from './utils';

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
  getAvatar(path: string, options: any) {
    return chatAPIInstance
      .put(`${path}`, options)
      .then((response: any) => {
        if (response) {
          return response;
        }
        throw new Error(response);
      })
      .then((data: string) => {
        const res: any = data;
        return this.getAvatarStatic(res.avatar);
      })
      .catch((error: Error) => {
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

  uploadChatAvatar(avatarData: any) {
    const options = {
      data: avatarData,
    };

    return this.getAvatar('/chats/avatar', options);
  }

  getAvatarStatic(path: string) {
    return chatAPIInstance
      .get(`/resources${path}`)
      .then((responseData: any) => {
        if (responseData.responseURL) {
          return responseData.responseURL;
        }
        throw new Error('not found url');
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  updateProfile(profileData: UpdateProfileArgs) {
    const options = {
      data: profileData,
    };
    return chatAPIInstance
      .put(`/user/profile`, options)
      .then((responseData: any) => responseData.response);
  }

  updatePassword(passwordData: UpdatePasswordArg) {
    const options = {
      data: passwordData,
    };
    return chatAPIInstance
      .put(`/user/password`, options)
      .then((responseData: any) => responseData.response);
  }

  request() {
    return chatAPIInstance.get('/full');
  }
}

export default SettingsAPI;
