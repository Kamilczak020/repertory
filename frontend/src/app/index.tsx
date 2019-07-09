import * as React from 'react';
import { LoginPage } from 'app/containers/LoginPage';
import { MainPage } from 'app/containers/MainPage';
import { RegisterPage } from './containers/RegisterPage';
import { ThankYouPage } from './containers/ThankYouPage';
import { HomePage } from './containers/HomePage';
import { Root } from 'app/containers/Root';
import { hot } from 'react-hot-loader/root';
import { Route, Router, Switch } from 'react-router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons';

library.add(faCheckCircle, faTimesCircle);

// render react DOM
export const app = hot(({ history }) => (
  <Root>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/watch" component={MainPage} />
        <Route path="/signin" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/thankyou" component={ThankYouPage} />
      </Switch>
    </Router>
  </Root>
));
