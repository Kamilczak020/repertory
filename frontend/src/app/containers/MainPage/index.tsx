import * as React from 'react';
import * as style from './style.css';
import { Chat } from 'app/components/chat';
import { BaseContainer } from 'app/containers/BaseContainer';

export class MainPage extends React.Component {
  public render() {
    return (
      <BaseContainer>
        <div className={style.appArea}>
          <div className={style.main}>
          </div>
          <Chat />
        </div>
      </BaseContainer>
    );
  }
}
