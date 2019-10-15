import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import App from 'Views/App';

export const history = createBrowserHistory();

render(
  <Router history={history} >
    <Switch>
      <Route
        path="/"
        render={(props) => {
          return <App {...props} />;
        }}
      />
    </Switch>
  </Router>,
  document.getElementById('app'),
);
