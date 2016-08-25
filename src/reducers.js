import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as reduxAsyncConnect } from 'redux-connect';

import homePage from './containers/HomePage/reducers';
import releases from './containers/Releases/reducers';

export default combineReducers({
  homePage,
  releases,
  reduxAsyncConnect,
  form: formReducer,
  routing: routerReducer
});
