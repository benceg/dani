import { createStore, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import homePageReducers from '../components/HomePage/reducers'

const store = createStore(
  combineReducers({
    homePageReducers,
    routing: routerReducer
  })
)

export default store
