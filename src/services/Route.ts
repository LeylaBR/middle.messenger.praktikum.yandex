import { render } from '../utils/renderDom';
import Block from './Block';

class Route {
  private _pathname: string;

  readonly _blockClass: Block;

  private _block: Block | null;

  private _props: { rootQuery: string };

  readonly _params: Record<string, string>;

  constructor(pathname: string, view: Block, props: { rootQuery: string }) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
    this._params = {};
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.extractParams(pathname);
      this.render();
    }
  }

  extractParams(pathname: string) {
    const routeParts = this._pathname.split('/');
    const pathParts = pathname.split('/');

    routeParts.forEach((part, index) => {
      if (part.startsWith(':')) {
        const paramName: string = part.slice(1);
        const paramValue: string = pathParts[index];
        this._params[paramName] = paramValue;
      }
    });
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    const routeParts = this._pathname.split('/');
    const pathParts = pathname.split('/');

    if (routeParts.length !== pathParts.length) {
      return false;
    }

    return routeParts.every(
      (part, index) => part === pathParts[index] || part.startsWith(':')
    );
  }

  render() {
    if (!this._block) {
      this._block = this._blockClass;
      render(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}

export default Route;
