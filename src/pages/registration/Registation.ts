import Block from '../../services';
import { template } from './template';

class Registration extends Block {
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
