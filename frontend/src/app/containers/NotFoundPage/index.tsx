import * as React from 'react';
import * as style from './style.css';
import { Header } from 'app/components/header';
import { Footer } from 'app/components/footer';
import { inject, observer } from 'mobx-react';
import { STORE_ROUTER } from 'app/constants';
import { RouterStore } from 'app/stores';
import CrowOnSkull from '../../../assets/images/crow-on-skull.png';

@inject(STORE_ROUTER)
@observer
export class NotFoundPage extends React.Component {
  public render() {
    const routerStore = this.props[STORE_ROUTER] as RouterStore;

    return (
      <div className={style.rootContainer}>
        <Header />
        <div className={style.container}>
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
        </div>
        <Footer />
      </div>
    );
  }
}
