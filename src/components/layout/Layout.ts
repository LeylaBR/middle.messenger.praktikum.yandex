import Block from '../../services';
import { template } from './template';
import { AttrProps, TagNameComponent } from '../types';

interface Props {
  attr: AttrProps;
}

interface LayoutProps extends TagNameComponent {
  props: Props;
  children: unknown[];
}

class Layout extends Block<LayoutProps> {
  render() {
    return this.compile(template, { children: this.props.children });
  }
}

export default Layout;
