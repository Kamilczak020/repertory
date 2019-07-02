import { RepertoryApp } from 'app/containers/RepertoryApp';
import { Root } from 'app/containers/Root';
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Router, Switch } from 'react-router';

// render react DOM
export const app = hot(({ history }) => (
  <Root>
    <Router history={history}>
      <Switch>
        <Route path="/" component={RepertoryApp} />
      </Switch>
    </Router>
  </Root>
));
