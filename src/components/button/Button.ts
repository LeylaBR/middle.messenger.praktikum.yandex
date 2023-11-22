import Block from '../../services';
import { template } from './template';
import { AttrProps, TagNameComponent } from '../types';

interface Props {
  attr: AttrProps;
  label: string;
  events: {
    click: (event: MouseEvent) => void;
  };
}

interface ButtonProps extends TagNameComponent {
  props: Props;
}

class Button extends Block<ButtonProps> {
  render() {
    return this.compile(template, this.props);
  }
}

export default Button;
