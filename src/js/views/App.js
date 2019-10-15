import React from 'react';
import cx from 'classnames';
import { Route, Switch, Redirect } from 'react-router-dom';

import MainContainer from 'Components/MainContainer';
import MovieDetail from 'Components/MovieDetail';

const defaultProps = {
  // loading: false,
  // success: false,
  // error: false,
};

class App extends React.Component {
  state = {

  };

  render() {

    const baseClass = 'appLayout';
    const classes = {
      base: cx(baseClass),
    };

    return (
      <div className={classes.base}>
        <div className={classes.main}>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (<Redirect to={{
                pathname: '/popular',
              }}
              />)}
            />
            <Route path="/popular" component={MainContainer} />
            <Route path="/movies/:movie_id" component={MovieDetail} />
            <MainContainer />
          </Switch>
        </div>
      </div>
    );
  }
}

App.defaultProps = defaultProps;

export default App;
