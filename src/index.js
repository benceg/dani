import React from 'react';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';
import routes from './routes';

import Root from './containers/Root';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  createLogger()
)(createStore);

const store = createStoreWithMiddleware(reducers, window.__INITIAL_STATE__);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <AppContainer>
    <Root
      store={store}
      history={history}
      routes={routes}
    />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const RootContainer = require('./containers/Root').default;
    render(
      <AppContainer>
        <RootContainer
          store={store}
          history={history}
          routes={routes}
        />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
