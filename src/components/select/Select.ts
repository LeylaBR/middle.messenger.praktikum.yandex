import Block from '../../services';
import { template } from './template';
import { AttrProps, TagNameComponent } from '../types';

interface Props {
  attr: AttrProps;
  className: string;
  id: string;
  events: {
    click: (event: MouseEvent) => void;
  };
}

interface SelectProps extends TagNameComponent {
  props: Props;
}

class Select extends Block<SelectProps> {
  render() {
    return this.compile(template, this.props);
  }
}

export default Select;
