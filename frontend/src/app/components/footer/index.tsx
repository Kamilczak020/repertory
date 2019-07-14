import * as React from 'react';
import * as style from './style.css';
import { STORE_ROUTER } from 'app/constants';
import { RouterStore } from 'app/stores';
import { inject, observer } from 'mobx-react';
import Github from '../../../assets/images/github.svg';

@inject(STORE_ROUTER)
@observer
export class Footer extends React.Component {
  public render() {
    const routerStore = this.props[STORE_ROUTER] as RouterStore;

    return (
      <div className={style.footerContainer}>
        <div className={style.footerContent}>
          <div className={style.contentGroup}>
            <h4>General</h4>
            <div className={style.links}>
              <div className={style.linkGroup}>
                <a onClick={() => routerStore.push('/')}>Home</a>
                <a onClick={() => routerStore.push('/watch')}>Watch</a>
              </div>
              <div className={style.linkGroup}>
                <a onClick={() => routerStore.push('/tos')}>Terms of Service</a>
                <a onClick={() => routerStore.push('/privacy-policy')}>Privacy Policy</a>
              </div>
            </div>
          </div>
          <div className={style.contentGroup}>
            <h4>Account</h4>
            <div className={style.links}>
              <div className={style.linkGroup}>
                <a onClick={() => routerStore.push('/signin')}>Sign In</a>
                <a onClick={() => routerStore.push('/register')}>Register</a>
              </div>
              <div className={style.linkGroup}>
                <a onClick={() => routerStore.push('/profile')}>Profile</a>
                <a onClick={() => routerStore.push('/')}>Settings</a>
              </div>
            </div>
          </div>
          <div className={style.contentGroup}>
            <h4>About</h4>
            <a href="https://github.com/Kamilczak020/repertory" className={style.linkField}>
              <Github className={style.icon} viewBox="0 0 438.549 438.549"/>
              <p>Kamilczak020</p>
            </a>
            <p>Copyright © 2019 Kamil Solecki</p>
          </div>
        </div>
      </div>
    );
  }
}
