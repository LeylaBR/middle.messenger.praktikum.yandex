import { Button, Input, Layout } from '../../components/index';

import { authInputsData } from './constants';

import Auth from './Auth';
import { formIds, routes } from '../../constants';
import { inputEventListeners, submitForm } from '../../utils/form';

const authInputs = authInputsData.map((inputData) => {
  const { className, type, placeholder, name, value, required } = inputData;
  const input = new Input('div', {
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

  return input;
});

const loginButton = new Button('button', {
  attr: {
    class: 'button',
  },
  label: 'Login',
  events: {
    click: (event: MouseEvent) => {
      event.preventDefault();
      const form: HTMLElement = document.getElementById(
        formIds.auth
      ) as HTMLElement;
      submitForm(form);
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

const auth = new Auth('main', {
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
