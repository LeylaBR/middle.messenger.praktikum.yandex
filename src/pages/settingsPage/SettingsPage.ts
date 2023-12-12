import Block from '../../services';
import { template } from './template';
import { AttrProps, TagNameComponent } from '../../components/types';
import { connect } from '../../services/Connect';

interface Props {
  attr: AttrProps;
}

interface SettingsPageProps extends TagNameComponent {
  props: Props;
  avatar: any;
  idForm: string;
  cancelButton: any;
  saveButton: any;
  settingsInputs: any;
  logoutButton: any;
  fileButton: any;
  user: any;
}

class SettingsPage extends Block<SettingsPageProps> {
  render() {
    this.getNewData();
    return this.compile(template, {
      ...this.props,
      avatar: this.props.avatar,
      fileButton: this.props.fileButton,
      cancelButton: this.props.cancelButton,
      saveButton: this.props.saveButton,
      settingsInputs: this.props.settingsInputs,
      logoutButton: this.props.logoutButton,
    });
  }

  getNewData() {
    const avatar = document.getElementById('avatar');
    const inputs = document.querySelectorAll<HTMLInputElement>('input');

    inputs.forEach((input) => {
      const attr = input.getAttribute('name');
      if (attr && this.props.user[attr]) {
        input.setAttribute('value', this.props.user[attr]);
      }
    });
  }
}

export default connect(SettingsPage, mapUserToProps);

function mapUserToProps(state) {
  return {
    user: state.user,
  };
}
