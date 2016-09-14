import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as reduxAsyncConnect } from 'redux-connect';

import menu from './containers/Menu/reducers';
import homePage from './containers/HomePage/reducers';
import music from './containers/Music/reducers';

export default combineReducers({
  menu,
  homePage,
  music,
  reduxAsyncConnect,
  form: formReducer,
  routing: routerReducer
});
