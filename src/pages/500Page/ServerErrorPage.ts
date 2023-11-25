import Block from '../../services';
import { template } from './template';
import { AttrProps, TagNameComponent } from '../../components/types';

interface Props {
  attr: AttrProps;
}

interface ServerErrorPageProps extends TagNameComponent {
  props: Props;
  backButton: any;
}

class ServerErrorPage extends Block<ServerErrorPageProps> {
  render() {
    return this.compile(template, {
      backButton: this.props.backButton,
    });
  }
}

export default ServerErrorPage;
