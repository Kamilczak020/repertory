import * as React from 'react';
import * as style from './style.css';
import Raven from '../../../assets/images/raven.svg';
import { STORE_ROUTER } from 'app/constants';
import { RouterStore } from 'app/stores';
import { inject, observer } from 'mobx-react';

@inject(STORE_ROUTER)
@observer
export class Header extends React.Component {
  public render() {
    const routerStore = this.props[STORE_ROUTER] as RouterStore;

    return (
      <div className={style.header}>
        <menu className={style.menuLeft}>
          <hr className={style.line} />
          <ul>
            <li onClick={() => routerStore.push('/')}>Home</li>
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
          <hr className={style.line} />
        </menu>
      </div>
    );
  }
}
