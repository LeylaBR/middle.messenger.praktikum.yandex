import Block from '../../services';
import { template } from './template';
import { AttrProps, TagNameComponent } from '../../components/types';
import AuthAPI from '../../api/AuthAPI';

interface Props {
  attr: AttrProps;
}

interface AuthProps extends TagNameComponent {
  props: Props;
  idForm: string;
  loginButton: any;
  registrationButton: any;
  authInputs: any;
}

class Auth extends Block<AuthProps> {
  constructor(tagName: string, props: any) {
    super(tagName, props);
    this.userVerification();
  }

  userVerification() {
    if (!localStorage.getItem('currentUser')) {
      const regApi = new AuthAPI();
      regApi.logout();
    }
  }

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
