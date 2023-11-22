import Block from '../../services';
import { template } from './template';
import { AttrProps, TagNameComponent } from '../types';

interface Props {
  attr: AttrProps;
}

interface AvatarProps extends TagNameComponent {
  props: Props;
}

class Avatar extends Block<AvatarProps> {
  render() {
    return this.compile(template, this.props);
  }
}

export default Avatar;
