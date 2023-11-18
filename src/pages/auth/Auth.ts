import Block from '../../services';
import { template } from './template';

class Auth extends Block {
  render() {
    return this.compile(template, {
      ...this.props,
      loginButton: this.props.loginButton,
      registrationButton: this.props.registrationButton,
      authInputs: this.props.authInputs,
    });
  }
}

export default Auth;
