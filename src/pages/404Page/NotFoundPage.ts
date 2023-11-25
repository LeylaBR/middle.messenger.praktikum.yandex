import Block from '../../services';
import { template } from './template';
import { AttrProps, TagNameComponent } from '../../components/types';

interface Props {
  attr: AttrProps;
}

interface NotFoundPageProps extends TagNameComponent {
  props: Props;
  backButton: any;
}

class NotFoundPage extends Block<NotFoundPageProps> {
  render() {
    return this.compile(template, {
      backButton: this.props.backButton,
    });
  }
}

export default NotFoundPage;
