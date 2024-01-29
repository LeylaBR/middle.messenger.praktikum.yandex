import { authPage } from './src/pages/auth';
import { registrationPage } from './src/pages/registration';
import { routes, routesList } from './src/constants';
import { chatWindowPage } from './src/pages/chatWindow';
import { settingsPage } from './src/pages/settingsPage';
import { notFoundPage } from './src/pages/404Page';
import { serverErrorPage } from './src/pages/500Page';
import Router from './src/services/Router';
import { settingsChatPage } from './src/pages/settingsChatPage';
import { isRouteExists } from './src/utils';

const router = new Router('.app');

const isValidPath: boolean = isRouteExists(
  window.location.pathname,
  routesList
);

function redirectToLogin() {
  if (
    window.location.pathname !== routes.auth &&
    window.location.pathname !== routes.registration
  ) {
    router.go(routes.auth);
  }
}

function redirectToChat() {
  if (window.location.pathname === routes.auth) {
    router.go(routes.chat);
  }
}

if (isValidPath) {
  router
    .use(routes.auth, authPage)
    .use(routes.registration, registrationPage)
    .use(routes.chat, chatWindowPage)
    .use(routes.settingsChat, settingsChatPage)
    .use(routes.settings, settingsPage)
    .use(routes.serverError, serverErrorPage)
    .start();
} else {
  router.use(window.location.pathname, notFoundPage).start();
}

if (!localStorage.getItem('currentUser')) {
  redirectToLogin();
} else {
  redirectToChat();
}
