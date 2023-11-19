import Block from '../../services';
import { template } from './template';

class Input extends Block {
  render() {
    return this.compile(template, this.props);
  }

  componentDidUpdate(
    oldProps: Record<string, unknown>,
    newProps: Record<string, unknown>
  ): boolean {
    return oldProps.value !== newProps.value;
  }
}

export default Input;
