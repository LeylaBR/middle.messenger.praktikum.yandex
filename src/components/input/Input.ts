import Block from '../../services';
import { template } from './template';
import { AttrProps, TagNameComponent } from '../types';

interface Props {
  attr: AttrProps;
  className: string;
  type: string;
  placeholder: string;
  name: string;
  id: string;
  value: string;
  required?: string;
  events: {
    click: (event: MouseEvent) => void;
  };
}

interface InputProps extends TagNameComponent {
  props: Props;
}

class Input extends Block<InputProps> {
  render() {
    return this.compile(template, this.props);
  }
}

export default Input;
