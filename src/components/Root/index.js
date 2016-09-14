import React from 'react';
import Router from 'react-router/lib/Router';
import { Provider } from 'react-redux';
import { ReduxAsyncConnect } from 'redux-connect';

const Root = ({
  store,
  history,
  routes
}) =>

<Provider store={store}>
  <Router
    render={args => <ReduxAsyncConnect {...args} />}
    history={history}
    routes={routes}
  />
</Provider>

export default Root;
