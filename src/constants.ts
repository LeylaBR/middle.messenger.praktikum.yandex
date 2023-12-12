export const formIds = {
  auth: 'authForm',
  registration: 'registrationForm',
  settings: 'settingsForm',
  message: 'messageForm',
};

export const emptyFieldText = 'Empty field';
export const incorrectValueText = 'Incorrect value';

export const routes = {
  auth: '/',
  registration: '/registration',
  chat: '/chat',
  settingsChat: `/chat/settings/:id`,
  settings: '/settings',
  serverError: '/500',
};

export const routesList = [
  '/',
  '/registration',
  '/chat',
  '/settings',
  '/500',
  `/chat/settings/:id`,
];
