import Block from '../../services';
import { template } from './template';

class SettingsPage extends Block {
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
