import Block from '../../services';
import { template } from './template';

class UserItem extends Block {
    render() {
        return this.compile(template, {
            ...this.props,
            avatar: this.props.avatar,
        });
    }
}

export default UserItem;
