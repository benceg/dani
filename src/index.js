import React from 'react';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import browserHistory from 'react-router/lib/browserHistory';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';

const middleware = [thunkMiddleware, routerMiddleware(browserHistory)];

if (process.env.NODE_ENV !== 'production') middleware.push(createLogger());

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

const store = createStoreWithMiddleware(reducers, window.__INITIAL_STATE__);
const history = syncHistoryWithStore(browserHistory, store);

function renderRootComponent() {
  const Root = require('./components/Root').default;
  const routes = require('./routes').default;

  render(
    <AppContainer>
      <Root {...{store, history, routes}} />
    </AppContainer>,
    document.getElementById('app')
  );
}

if (module.hot) {
  module.hot.accept('./components/Root', renderRootComponent);
  module.hot.accept('./routes', renderRootComponent);
}

renderRootComponent();
