import { Button, Layout } from '../../components/index';
import ServerErrorPage from './ServerErrorPage';

const backButton = new Button('button', {
  attr: {
    class: 'button',
  },
  label: 'Back',
  events: {
    click: (event: MouseEvent) => {
      event.preventDefault();
      window.history.back();
    },
  },
});

const serverError = new ServerErrorPage('main', {
  attr: {
    class: 'page',
  },
  backButton,
});

export const serverErrorPage = new Layout('div', {
  attr: {
    class: 'wrapper',
  },
  children: serverError,
});
