import { Avatar, Button, Input, Layout } from '../../components/index';
import { settingsInputsData } from './constants';
import SettingsPage from './SettingsPage';
import { formIds, routes } from '../../constants';
import { inputEventListeners, submitForm } from '../../utils/form';

const avatar = new Avatar('div', {
  attr: {
    class: 'imageUser',
  },
});

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
      click: (event) => {
        inputEventListeners(event.target);
      },
    },
  });
});

const saveButton = new Button('button', {
  attr: {
    class: 'button',
  },
  label: 'Save',
  events: {
    click: (event) => {
      event.preventDefault();
      const form = document.getElementById(formIds.settings);
      submitForm(form);
    },
  },
});

const cancelButton = new Button('button', {
  attr: {
    class: 'button',
  },
  label: 'Cancel',
  events: {
    click: (event) => {
      event.preventDefault();
      window.location.href = routes.chat;
    },
  },
});

const settings = new SettingsPage('main', {
  attr: {
    class: 'page',
  },
  avatar,
  idForm: formIds.settings,
  cancelButton,
  saveButton,
  settingsInputs,
});

export const settingsPage = new Layout('div', {
  attr: {
    class: 'wrapper',
  },
  children: settings,
});
