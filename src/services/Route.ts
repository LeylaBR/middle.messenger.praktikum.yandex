import { render } from '../utils/renderDom';
import Block from './Block';

class Route {
  private _pathname: string;
  private _blockClass: typeof Block;
  private _block: any;
  private _props: { rootQuery: string };
  private _params: Record<string, string>;

  constructor(
    pathname: string,
    view: typeof Block,
    props: { rootQuery: string }
  ) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
    this._params = {};
  }

  navigate(pathname) {
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
        const paramName = part.slice(1); // Remove the ":" prefix
        const paramValue = pathParts[index];
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
