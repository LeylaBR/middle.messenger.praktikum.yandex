import Block from '../../services';
import { template } from './template';
import { AttrProps, TagNameComponent } from '../types';

interface Props {
  attr: AttrProps;
  name: string;
  info: string;
}

interface UserItemProps extends TagNameComponent {
  props: Props;
  avatar: unknown;
}

class UserItem extends Block<UserItemProps> {
  render() {
    return this.compile(template, {
      ...this.props,
      avatar: this.props.avatar,
    });
  }
}

export default UserItem;
