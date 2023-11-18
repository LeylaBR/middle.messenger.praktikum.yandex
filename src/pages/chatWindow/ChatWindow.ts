import Block from '../../services';
import { template } from './template';

class ChatWindows extends Block {
  render() {
    return this.compile(template, {
      ...this.props,
      profileButton: this.props.profileButton,
      searchInput: this.props.searchInput,
      userItems: this.props.userItems,
      messages: this.props.messages,
      messageInput: this.props.messageInput,
      sendButton: this.props.sendButton,
    });
  }
}

export default ChatWindows;
