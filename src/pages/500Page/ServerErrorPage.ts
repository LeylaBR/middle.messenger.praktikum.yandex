import Block from '../../services';
import { template } from './template';

class ServerErrorPage extends Block {
  render() {
    return this.compile(template, {
      backButton: this.props.backButton,
    });
  }
}

export default ServerErrorPage;
