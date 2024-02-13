import Block from '../../services';
import { template } from './template';
import { AttrProps, TagNameComponent } from '../../components/types';
import { connect } from '../../services/Connect';
import { avatarId } from './constants';
import { setNewAvatar } from '../utils';

interface Props {
  attr: AttrProps;
}

interface SettingsPageProps extends TagNameComponent {
  props: Props;
  avatar: any;
  idForm: any;
  cancelButton: any;
  saveButton: any;
  settingsInputs: any;
  logoutButton: any;
  fileButton: any;
  user: any;
  children: any;
}

function mapUserToProps(state: any) {
  return {
    user: state.user,
  };
}

class SettingsPage extends Block<SettingsPageProps> {
  setAvatar() {
    const img = document.getElementById(avatarId);
    setNewAvatar(this.props.user?.avatar, img);
  }

  getNewData() {
    const inputs = document.querySelectorAll<HTMLInputElement>('input');
    this.setAvatar();
    inputs.forEach((input) => {
      const attr = input.getAttribute('name');

      if (attr && this.props.user[attr]) {
        input.setAttribute('value', this.props.user[attr]);
      }
    });
  }

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
}

export default connect(SettingsPage, mapUserToProps);
