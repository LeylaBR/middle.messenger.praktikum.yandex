import Block from '../../services';
import { template } from './template';
import { AttrProps, TagNameComponent } from '../../components/types';

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
}

class SettingsPage extends Block<SettingsPageProps> {
  render() {
    return this.compile(template, {
      ...this.props,
      avatar: this.props.avatar,
      cancelButton: this.props.cancelButton,
      saveButton: this.props.saveButton,
      settingsInputs: this.props.settingsInputs,
    });
  }
}

export default SettingsPage;
