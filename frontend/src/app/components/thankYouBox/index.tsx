import * as React from 'react';
import * as style from './style.css';
import { STORE_ROUTER } from 'app/constants';
import { RouterStore } from 'app/stores';
import { inject, observer } from 'mobx-react';
import ThankYou from 'assets/images/thank-you.svg';

@inject(STORE_ROUTER)
@observer
export class ThankYouBox extends React.Component {
  public render() {
    const routerStore = this.props[STORE_ROUTER] as RouterStore;

    return (
      <div className={style.thankYouContainer}>
        <div className={style.contentContainer}>
          <ThankYou className={style.icon} viewBox="0 0 512 512" />
          <h3>Thank you for registering with Repertory!</h3>
          <p>To continue, please proceed to sign in using the button below.</p>
        </div>
        <button onClick={(e) => {
            e.preventDefault();
            routerStore.push('/signin');
        }}>
          Sign In
        </button>
      </div>
    );
  }
}
