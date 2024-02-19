import { expect } from 'chai';
import Router from './Router';
import Block from './Block';

describe('Router', () => {
  let router: Router;
  let PageClass: any;

  before(() => {
    class Page extends Block<any> {
      render(): string {
        return `<div>
                    <span id="test-text">{{text}}</span>
                    <button>{{text-button}}</button>
                </div>`;
      }
    }

    PageClass = Page;
  });

  beforeEach(() => {
    router = new Router('.app');
  });

  it('Добавление роута', () => {
    router.use('/test', PageClass);
    const newRouter = router.getRoute('/test');

    expect(newRouter).to.exist;
  });
});
