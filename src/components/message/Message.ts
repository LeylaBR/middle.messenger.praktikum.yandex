import Block from '../../services';
import { template } from './template';

class Message extends Block {
    render() {
        return this.compile(template, {
            ...this.props,
            avatar: this.props.avatar,
        });
    }
}

export default Message;
