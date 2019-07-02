import * as React from 'react';
import Raven from '../../../assets/images/raven.svg';
import * as style from './style.css';

export class Header extends React.Component {
  public render() {
    return (
      <div className={style.header}>
        <hr className={style.line} />
        <menu className={style.menuLeft}>
          <ul>
            <li>Home</li>
            <li>Watch</li>
          </ul>
        </menu>
        <div className={style.brand}>
          <Raven className={style.logo} viewBox="0 0 1000 1000" />
          <h1 className={style.name}>Repertory</h1>
        </div>
        <menu className={style.menuRight}>
          <ul>
            <li>Profile</li>
            <li>Settings</li>
          </ul>
        </menu>
        <hr className={style.line} />
      </div>
    );
  }
}
