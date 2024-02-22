import { Button, Input, Layout } from '../../components/index';
import { registrationInputsData } from './constants';
import Registration from './Registation';
import { inputEventListeners, submitForm } from '../../utils/form';
import { formIds, regApiReg, routes } from '../../constants';
import { isEmpty } from '../../services/utils';

export const registrationInputs = registrationInputsData.map((inputData) => {
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

export const loginButton = new Button('button', {
  attr: {
    class: 'button',
  },
  label: 'Login',
  events: {
    click: (event: MouseEvent) => {
      event.preventDefault();
      window.location.href = routes.auth;
    },
  },
});

export const registrationButton = new Button('button', {
  attr: {
    class: 'button',
  },
  label: 'Registration',
  id: 'regButton',
  events: {
    click: (event: MouseEvent) => {
      event.preventDefault();
      const form: any = document.getElementById(formIds.registration);
      const body = submitForm(form);
      if (!isEmpty(body)) {
        regApiReg
          .signup(body)
          .then((data: any) => {
            if (data.id) {
              window.location.href = routes.chat;
            }
          })
          .catch((error: Error) => {
            console.error('Error:', error.message);
          });
      }
    },
  },
});

const registration = new Registration('div', {
  attr: {
    class: 'page',
  },
  idForm: formIds.registration,
  registrationInputs,
  loginButton,
  registrationButton,
});

export const registrationPage = new Layout('div', {
  attr: {
    class: 'wrapper',
  },
  children: registration,
});
