import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { ReduxAsyncConnect } from 'redux-connect';

export default function Root(props) {
  const {
    store,
    history,
    routes
  } = props;

  return (
    <Provider store={store}>
      <Router
        render={args => <ReduxAsyncConnect {...args} />}
        history={history}
      >
        {routes}
      </Router>
    </Provider>
  )
}
