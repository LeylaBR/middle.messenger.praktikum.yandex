import Block from '../../services';
import { template } from './template';
import { AttrProps, TagNameComponent } from '../../components/types';

interface Props {
  attr: AttrProps;
}

interface RegistrationProps extends TagNameComponent {
  props: Props;
  idForm: string;
  registrationInputs: any;
  loginButton: any;
  registrationButton: any;
}

class Registration extends Block<RegistrationProps> {
  render() {
    return this.compile(template, {
      ...this.props,
      registrationInputs: this.props.registrationInputs,
      loginButton: this.props.loginButton,
      registrationButton: this.props.registrationButton,
    });
  }
}

export default Registration;
