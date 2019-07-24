import * as React from 'react';
import * as style from './style.css';
import Raven from '../../../assets/images/raven.svg';
import { STORE_ROUTER, STORE_USER } from 'app/constants';
import { RouterStore, UserStore } from 'app/stores';
import { inject, observer } from 'mobx-react';

@inject(STORE_ROUTER, STORE_USER)
@observer
export class Header extends React.Component {
  public render() {
    const routerStore = this.props[STORE_ROUTER] as RouterStore;
    const userStore = this.props[STORE_USER] as UserStore;

    return (
      <div className={style.header}>
        <menu className={style.menuLeft}>
          <hr className={style.line} />
          <ul>
            <li onClick={() => routerStore.push('/')}>Home</li>
            <li onClick={() => routerStore.push('/watch')}>Watch</li>
          </ul>
        </menu>
        <div className={style.brand}>
          <Raven className={style.logo} viewBox="0 0 1000 1000" />
          <h1 className={style.name}>Repertory</h1>
        </div>
        <menu className={style.menuRight}>
          <ul>
            <li onClick={() => userStore.isAuthenticated ? routerStore.push('/profile') : routerStore.push('/signin')}>
              {userStore.isAuthenticated ? 'Profile' : 'Sign In'}
            </li>
            <li onClick={() => {
              if (userStore.isAuthenticated) {
                userStore.signout();
                routerStore.push('/');
              } else {
                routerStore.push('/register');
              }
            }}>
              {userStore.isAuthenticated ? 'Sign Out' : 'Register'}
            </li>
          </ul>
          <hr className={style.line} />
        </menu>
      </div>
    );
  }
}
