import * as React from 'react';
import * as style from './style.css';
import Attachment from '../../../assets/images/attachment.svg';
import Send from '../../../assets/images/send.svg';

export class Chat extends React.Component {
  public render() {
    return (
      <div className={style.chat}>
        <div className={style.chatArea}>
        </div>
        <div className={style.messageArea}>
          <input
            className={style.messageBox}
            type="text"
            spellCheck={false}
            placeholder="Type your message here..."
          />
          <Send className={style.sendButton} viewBox="8 114.9 612 612" />
          <Attachment className={style.attachmentButton} viewBox="-147 270.9 300 300" />
        </div>
      </div>
    );
  }
}
