import * as React from 'react';
import * as style from './style.css';
import { STORE_ROUTER } from 'app/constants';
import { RouterStore } from 'app/stores';
import { inject, observer } from 'mobx-react';

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
            <a onClick={() => routerStore.push('/')}>Home</a>
            <a onClick={() => routerStore.push('/')}>Watch</a>
            <a onClick={() => routerStore.push('/')}>Profile</a>
            <a onClick={() => routerStore.push('/')}>Settings</a>
          </div>
          <div className={style.contentGroup}>
            <h4>General</h4>
            <a onClick={() => routerStore.push('/')}>Home</a>
            <a onClick={() => routerStore.push('/')}>Watch</a>
            <a onClick={() => routerStore.push('/')}>Profile</a>
            <a onClick={() => routerStore.push('/')}>Settings</a>
          </div>
          <div className={style.contentGroup}>
            <h4>General</h4>
            <a onClick={() => routerStore.push('/')}>Home</a>
            <a onClick={() => routerStore.push('/')}>Watch</a>
            <a onClick={() => routerStore.push('/')}>Profile</a>
            <a onClick={() => routerStore.push('/')}>Settings</a>
          </div>
        </div>
      </div>
    );
  }
}
