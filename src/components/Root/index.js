import React from 'react';
import Router from 'react-router/lib/Router';
import applyRouterMiddleware from 'react-router/lib/applyRouterMiddleware';
import { Provider } from 'react-redux';
import { ReduxAsyncConnect } from 'redux-connect';
import useScroll from 'react-router-scroll/lib/useScroll';

const Root = ({
  store,
  history,
  routes
}) =>

<Provider store={store}>
  <Router
    render={args =>
      (process.env.WEBPACK
        ?
          <ReduxAsyncConnect {...args} render={applyRouterMiddleware(useScroll())} />
        :
          <ReduxAsyncConnect {...args} />
      )
    }
    history={history}
    routes={routes}
  />
</Provider>

export default Root;
