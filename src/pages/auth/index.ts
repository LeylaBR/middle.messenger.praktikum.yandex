import { Button, Input, Layout } from '../../components/index';
import { authInputsData } from './constants';
import Auth from './Auth';
import { formIds, routes } from '../../constants';
import { inputEventListeners, submitForm } from '../../utils/form';
import { isEmpty } from '../../services/utils';
import AuthAPI from '../../api/AuthAPI';

const authInputs = authInputsData.map((inputData) => {
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

const loginButton = new Button('button', {
  attr: {
    class: 'button',
  },
  label: 'Login',
  events: {
    click: (event: MouseEvent) => {
      event.preventDefault();
      const form = document.getElementById(formIds.auth) as HTMLElement;
      const fieldData = submitForm(form);

      if (!isEmpty(fieldData)) {
        const regApi = new AuthAPI();
        regApi.signin(fieldData).then((data) => {
          if (data === 'OK') {
            localStorage.setItem('currentUser', 'true');
            window.location.href = routes.chat;
          }
        });
      }
    },
  },
});

const registrationButton = new Button('button', {
  attr: {
    class: 'button',
  },
  label: 'Registration',
  events: {
    click: (event: MouseEvent) => {
      event.preventDefault();
      window.location.href = routes.registration;
    },
  },
});

const auth = new Auth('div', {
  attr: {
    class: 'page',
  },
  idForm: formIds.auth,
  loginButton,
  registrationButton,
  authInputs,
});

export const authPage = new Layout('div', {
  attr: {
    class: 'wrapper',
  },
  children: auth,
});
