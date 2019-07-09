import * as React from 'react';
import * as style from './style.css';
import { Header } from 'app/components/header';

export class HomePage extends React.Component {
  public render() {
    return (
      <div className={style.rootContainer}>
        <Header />
        <div className={style.container}>
        </div>
      </div>
    );
  }
}
