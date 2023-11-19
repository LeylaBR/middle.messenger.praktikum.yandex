import { render } from './src/utils/renderDom';
import { authPage } from './src/pages/auth';
import { registrationPage } from './src/pages/registration';
import { routes } from './src/constants';
import { chatWindowPage } from './src/pages/chatWindow';
import { settingsPage } from './src/pages/settingsPage';
import { notFoundPage } from './src/pages/404Page';
import { serverErrorPage } from './src/pages/500Page';

function handleRouteChange() {
  const path = window.location.pathname;

  switch (path) {
    case routes.auth:
      render('.app', authPage);
      break;
    case routes.registration:
      render('.app', registrationPage);
      break;
    case routes.chat:
      render('.app', chatWindowPage);
      break;
    case routes.settings:
      render('.app', settingsPage);
      break;
    case routes.serverError:
      render('.app', serverErrorPage);
      break;
    default:
      render('.app', notFoundPage);
  }
}

window.onpopstate = handleRouteChange;

handleRouteChange();
