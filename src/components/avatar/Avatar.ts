import Block from '../../services';
import { template } from './template';

class Avatar extends Block {
  render() {
    return this.compile(template, this.props);
  }
}

export default Avatar;
