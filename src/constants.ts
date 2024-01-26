export const formIds = {
  auth: 'authForm',
  registration: 'registrationForm',
  settings: 'settingsForm',
  message: 'messageForm',
};

export const emptyFieldText = 'Field cannot be empty';

export const errorFieldText = {
  first_name: 'First letter should be uppercase. No spaces or digits allowed',
  second_name: 'First letter should be uppercase. No spaces or digits allowed',
  login: 'Login should be 3 to 20 characters long',
  email: 'Invalid email format',
  password:
    'Password should be 8 to 40 characters long, with at least one uppercase letter and one digit',
  phone: 'Phone should be 10 to 15 characters long',
  message: 'Message cannot be empty',
};

export const routes = {
  auth: '/',
  registration: '/sign-up',
  chat: '/messenger',
  settingsChat: `/messenger/settings/:id`,
  settings: '/settings',
  serverError: '/500',
};

export const routesList = [
  '/',
  '/sign-up',
  '/messenger',
  '/settings',
  '/500',
  `/messenger/settings/:id`,
];
