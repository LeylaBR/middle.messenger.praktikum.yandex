import Block from '../../services';
import { template } from './template';

class Input extends Block {
    constructor(tag, props) {
        super(tag, props);
    }

    render() {
        return this.compile(template, this.props);
    }

    componentDidUpdate(oldProps, newProps): boolean {
        return oldProps['value'] !== newProps['value'];
    }
}

export default Input;
