import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { STORE_ROUTER, STORE_USER } from 'app/constants';
import { RouterStore, UserStore } from 'app/stores';

export function authenticated(BaseComponent: React.ComponentClass) {
  @inject(STORE_ROUTER, STORE_USER)
  @observer
  class AuthenticatedComponent extends React.Component<RouteComponentProps> {
    public componentWillMount() {
      this.checkAuthentication();
    }

    public async checkAuthentication() {
      const routerStore = this.props[STORE_ROUTER] as RouterStore;
      const userStore = this.props[STORE_USER] as UserStore;

      if (!userStore.isAuthenticated) {
        routerStore.replace('/signin');
      }
    }

    public render() {
      const userStore = this.props[STORE_USER] as UserStore;

      return userStore.isAuthenticated 
      ? <BaseComponent {...this.props} />
      : null;
    }
  }

  return AuthenticatedComponent;
}
