import * as React from 'react';
import * as style from './style.css';
import { inject, observer } from 'mobx-react';
import { STORE_ROUTER } from 'app/constants';
import { RouterStore } from 'app/stores';
import CrowOnSkull from 'assets/images/crow-on-skull.png';
import { BaseContainer } from 'app/containers/BaseContainer';

@inject(STORE_ROUTER)
@observer
export class NotFoundPage extends React.Component {
  public render() {
    const routerStore = this.props[STORE_ROUTER] as RouterStore;

    return (
      <BaseContainer>
        <div className={style.notFoundContainer}>
          <div className={style.contentContainer}>
            <img src={CrowOnSkull} className={style.icon} />
            <div className={style.description}>
              <h3>404 Not found</h3>
              <p>Not all those who wander are lost,</p>
              <p>but you definitely are.</p>
              <p>Please, go back <a onClick={() => routerStore.push('/')}>to the main page.</a></p>
            </div>
          </div>
        </div>
      </BaseContainer>
    );
  }
}
