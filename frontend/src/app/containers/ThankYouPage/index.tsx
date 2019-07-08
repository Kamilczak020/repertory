import * as React from 'react';
import * as style from './style.css';
import { Header } from 'app/components/header';
import { ThankYouBox } from 'app/components/thankYouBox';

export class ThankYouPage extends React.Component {
  public render() {
    return (
      <div className={style.rootContainer}>
        <Header />
        <div className={style.container}>
          <ThankYouBox />
        </div>
      </div>
    );
  }
}
