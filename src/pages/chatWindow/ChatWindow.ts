import Block from '../../services';
import { template } from './template';
import { AttrProps, TagNameComponent } from '../../components/types';

interface Props {
  attr: AttrProps;
}

interface ChatWindowsProps extends TagNameComponent {
  props: Props;
  profileButton: any;
  searchInput: any;
  userItems: any;
  messages: any;
  messageInput: any;
  sendButton: any;
  idForm: string;
}

class ChatWindows extends Block<ChatWindowsProps> {
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
