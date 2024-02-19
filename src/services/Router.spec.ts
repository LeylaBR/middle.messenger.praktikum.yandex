import Router from './Router';
import Block from './Block';
import { expect } from 'chai';

interface Props {
  tagName: string;
  props: any;
}

describe('Router', () => {
  let router: Router;
  let PageClass: typeof Block<Props>;

  before(() => {
    class Page extends Block<Props> {
      constructor(tagName: string, props: Props) {
        super(tagName, props);
      }

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
    expect(router.getRoute('/test')).to.exist;
  });
});
