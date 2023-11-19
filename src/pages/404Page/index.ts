import { Button, Layout } from '../../components/index';
import NotFoundPage from './NotFoundPage';

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

const notFound = new NotFoundPage('main', {
  attr: {
    class: 'page',
  },
  backButton,
});

export const notFoundPage = new Layout('div', {
  attr: {
    class: 'wrapper',
  },
  children: notFound,
});
