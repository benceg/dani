import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';

import homePage from './containers/HomePage/reducers';
import music from './containers/Music/reducers';
import writing from './containers/Writing/reducers';
import blog from './containers/Blog/reducers';
import post from './containers/Post/reducers';
import contact from './containers/Contact/reducers';

export default combineReducers({
  homePage,
  music,
  writing,
  blog,
  post,
  contact,
  reduxAsyncConnect,
  routing: routerReducer
});
