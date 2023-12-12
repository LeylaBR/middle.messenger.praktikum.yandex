import { Button, Input, Layout } from '../../components/index';
import { settingsInputsData } from './constants';
import SettingsPage from './SettingsPage';
import { formIds, routes } from '../../constants';
import { inputEventListeners, submitForm } from '../../utils/form';
import AuthAPI from '../../api/AuthAPI';
import SettingsAPI from '../../api/SettingsAPI';
import { getAvatar } from '../utils';

const settingsInputs = settingsInputsData.map((inputData) => {
  const { className, type, placeholder, name, value, required } = inputData;
  return new Input('div', {
    attr: {
      class: 'inputContainer',
    },
    className,
    type,
    placeholder,
    name,
    id: name,
    value,
    required,
    events: {
      click: (event: MouseEvent) => {
        inputEventListeners(event.target as HTMLInputElement);
      },
    },
  });
});

const fileButton = new Button('button', {
  attr: {
    class: 'button',
  },
  label: 'Choose avatar',
  events: {
    click: (event: MouseEvent) => {
      event.preventDefault();
      const input = document.createElement('input');
      const imgElement = document.getElementById('avatar') as HTMLImageElement;

      input.type = 'file';
      input.onchange = (_) => {
        const files = Array.from(input.files);

        if (files.length > 0) {
          const reader = new FileReader();
          const formData = new FormData();
          formData.append('avatar', files[0]);

          reader.onload = function (e) {
            const regApi = new SettingsAPI();
            regApi.uploadAvatar(formData);

            imgElement.src = e.target.result as string;
          };

          reader.readAsDataURL(files[0]);
        }
      };

      input.click();
    },
  },
});

const saveButton = new Button('button', {
  attr: {
    class: 'button',
  },
  label: 'Save',
  events: {
    click: (event: MouseEvent) => {
      event.preventDefault();
      const form: any = document.getElementById(formIds.settings);

      const formValue = {
        ...submitForm(form),
      };
      const regApi = new SettingsAPI();
      const {
        first_name,
        second_name,
        display_name,
        login,
        email,
        phone,
        oldPassword,
        newPassword,
      } = formValue;
      const dataProfile = {
        first_name,
        second_name,
        display_name,
        login,
        email,
        phone,
      };

      const dataPassword = {
        oldPassword,
        newPassword,
      };
      if (formValue['oldPassword'] === '' && formValue['newPassword'] === '') {
        regApi.updateProfile(dataProfile);
      } else {
        regApi.updateProfile(dataProfile);
        regApi.updatePassword(dataPassword);
      }
    },
  },
});

const cancelButton = new Button('button', {
  attr: {
    class: 'button',
  },
  label: 'Back',
  events: {
    click: (event: MouseEvent) => {
      event.preventDefault();
      window.location.href = routes.chat;
    },
  },
});

const logoutButton = new Button('button', {
  attr: {
    class: 'button',
  },
  label: 'Logout',
  events: {
    click: (event: MouseEvent) => {
      event.preventDefault();
      const regApi = new AuthAPI();
      regApi
        .logout()
        .then((data) => {
          if (data === 'OK') {
            localStorage.removeItem('currentUser');
            window.location.href = routes.auth;
          }
        })
        .catch((error) => {
          console.error('Error:', error.message);
        });
    },
  },
});

const settings = new SettingsPage('div', {
  attr: {
    class: 'page',
  },
  avatar: getAvatar(),
  idForm: formIds.settings,
  fileButton,
  cancelButton,
  saveButton,
  settingsInputs,
  logoutButton,
});

export const settingsPage = new Layout('div', {
  attr: {
    class: 'wrapper',
  },
  children: settings,
});
