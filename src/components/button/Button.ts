import Block from '../../services';
import { template } from './template';

class Button extends Block {
    render() {
        return this.compile(template, this.props);
    }
}

export default Button;
