import Block from '../../services';
import { template } from './template';

class NotFoundPage extends Block {
  render() {
    return this.compile(template, {
      backButton: this.props.backButton,
    });
  }
}

export default NotFoundPage;
