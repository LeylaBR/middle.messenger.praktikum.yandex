import Block from '../../services';
import { template } from './template';
import { TagNameComponent } from '../types';

interface Props {
  className: string;
  left: boolean;
  right: boolean;
  name: string;
  text: string;
  time: string;
}

interface MessageProps extends TagNameComponent {
  props: Props;
  avatar: unknown;
}

class Message extends Block<MessageProps> {
  render() {
    return this.compile(template, {
      ...this.props,
      avatar: this.props.avatar,
    });
  }
}

export default Message;
