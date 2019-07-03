import { Chat } from 'app/components/chat';
import { Header } from 'app/components/header';
import * as React from 'react';
import * as style from './style.css';

export class RepertoryApp extends React.Component {
  public render() {
    return (
      <div className={style.rootContainer}>
        <Header />
        <div className={style.container}>
          <div className={style.appArea}>
            <div className={style.main}>
            </div>
            <Chat />
          </div>
        </div>
      </div>
    );
  }
}
