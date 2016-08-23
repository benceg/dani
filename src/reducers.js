import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';

import homePage from './containers/HomePage/reducers';

export default combineReducers({
  homePage,
  reduxAsyncConnect,
  routing: routerReducer
});