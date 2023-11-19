import Block from '../../services';
import { template } from './template';

class Layout extends Block {
    render() {
        return this.compile(template, { children: this.props.children });
    }
}

export default Layout;
