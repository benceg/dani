import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import homePageReducers from './components/HomePage/reducers';

export default combineReducers({
  homePageReducers,
  routing: routerReducer
});
