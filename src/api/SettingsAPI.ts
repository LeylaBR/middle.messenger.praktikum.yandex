import Base from './BaseAPI';
import HTTP from '../services/HTTPTransport';

const chatAPIInstance = new HTTP();
const host = 'https://ya-praktikum.tech/api/v2';

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
  uploadAvatar(avatarData: FormData) {
    const options = {
      data: avatarData,
    };

    return chatAPIInstance
      .put(`${host}/user/profile/avatar`, options)
      .then((responseData: any) => responseData.response);
  }

  updateProfile(profileData: UpdateProfileArgs) {
    const options = {
      data: profileData,
    };
    return chatAPIInstance
      .put(`${host}/user/profile`, options)
      .then((responseData: any) => responseData.response);
  }

  updatePassword(passwordData: UpdatePasswordArg) {
    const options = {
      data: passwordData,
    };
    return chatAPIInstance
      .put(`${host}/user/password`, options)
      .then((responseData: any) => responseData.response);
  }

  request() {
    return chatAPIInstance.get('/full');
  }
}

export default SettingsAPI;
