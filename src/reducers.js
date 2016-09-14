import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as reduxAsyncConnect } from 'redux-connect';

import homePage from './containers/HomePage/reducers';
import music from './containers/Music/reducers';
import writing from './containers/Writing/reducers';

export default combineReducers({
  homePage,
  music,
  writing,
  reduxAsyncConnect,
  form: formReducer,
  routing: routerReducer
});
